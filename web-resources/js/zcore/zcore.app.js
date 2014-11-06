/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

//--> document ready
$(function() {
	
	function ZcoreAppPlugin() {}
	
	//--> register as global
	$.ZAP = new ZcoreAppPlugin();
	
	(function(_) {
	
		$.extend(ZcoreAppPlugin.prototype, {
			
			version : '',
			
			xmlKey : {
				root : 'Z',
				model : 'M',
				editor : 'E'
			},
						
			locale : 'en',
			
			direction : 'ltr',
			
			_orientationGroup : {
				ltr : ['ltr', 'left', 'east'],
				rtl : ['rtl', 'right', 'west'],
			},
			
			orientation : function(v) {
				return this._orientationGroup[v || this.direction];
			},
			
			_resources : {},
			
			_global : {},
			
			forms : {},
			
			formModels : {},
			
			upperFirstLetter : function(s) {
			    return s.charAt(0).toUpperCase() + s.slice(1);
			},
			
			num : function(v) {
				return parseInt(v, 10) || 0;
			},
	
			isNumber : function(v) {
				return !isNaN(parseInt(v, 10));
			},
			
			toString : function(v) {
				var res = "";
				for (var i in v) 
					res += (res == "") ? v[i].trim() : "," + v[i].trim();
				return res;
			},
			
			_setPrototype : function () {
				//--> lpad
				String.prototype.lpad = function(padString, length) {
					var str = this;
				    while (str.length < length)
				        str = padString + str;
				    return str;
				};		
				//--> trim
				String.prototype.trim = function() {
					return this.replace(/^\s+|\s+$/g,"");
				};
				//--> ltrim
				String.prototype.ltrim = function() {
					return this.replace(/^\s+/,"");
				};			
				//--> rtrim
				String.prototype.rtrim = function() {
					return this.replace(/\s+$/,"");
				};		
				//--> reverse
				String.prototype.reverse = function() {
					for (var i = this.length - 1, o = ''; i >= 0; o += this[i--]) { }
					return o;
				};

			},				
						
			translateDate : function(y, m, d) {
				var
					dateType = function(locale) {
						switch (locale) {
						case 'fa': return 'persian';
						default: return '';
						}
					},				
					jd = $.calendars.instance('').newDate(y, m, d).toJD(),					
				  	date = $.calendars.instance(dateType(this.locale), this.locale).fromJD(jd);
					res =
					    date._calendar.local.dayNames[date.dayOfWeek()] + ', ' +
						date.day() + ' ' + date._calendar.local.monthNames[date.month() - 1] + ' ' +
					    this.message.msg('month') + ' ' + date.formatYear();
				return res;
			},
			
			_init : function() {
				//--> ajax Setup
				$.ajaxSetup({	
					global : true,
					cache : true,
					error : function(jqXHR, textStatus, errorThrown) {
						_._errorHandler(null, jqXHR, textStatus, errorThrown);
					}
				});		
				
				//--> jQuery configuration
				$.ajaxPrefilter("script", function(options, originalOptions, jqXHR) {
					options.cache = true; //--> prevent a query string parameter, "_=[TIMESTAMP]", to the URL
					//--> prepare pure url
					if (_._resources[options.url])
						jqXHR.abort();
					else
						_._resources[options.url] = true; 
				});
				
				//--> see configuration file 
				$.ui.dialog.prototype._focusTabbable = function() {
					return;
				};
				
				//--> set prototype
				this._setPrototype();
					
			},			
			
			initial : function(params) {
				//--> load
				for (var param in params)
					this[param] = params[param];
				
				//--> loading
				this.loading = $.ZOF.getInstance('loading');
				
				//--> message && load localization
				this.message = {
						
						set : function(locale, k, v) {
							this[locale][k] = v;
						},	
						
						get : function(locale, v) {
							return (this[locale][v] != undefined) ? this[_.locale][v] : v;
						},
						
						msg : function(v, args, locale) {
							var msg = this.get(locale !== undefined ? locale : _.locale, v);
							if ((args) && (args.length != 0)) {
								for (var item in args) {
									msg = msg.replace(new RegExp('({)' + item + '(})', 'g'), args[item]);
								}
							}; 
							return msg;
						},
						
						exist : function (v, locale) {
							return this[locale !== undefined ? locale : _.locale][v] !== undefined;
						},
						
						translate : function(v) {
							return v.replace(/\$\{[\s\S]*?\}/g, function(matched) {
								return _.message.msg(matched.substr(2, matched.length - 3));
							});
						}
						
				};
				
				this.loadResource({					
					root : '/form/locale/',
					files : [this.locale + '.js']
				});
				
				//--> hint
				this.hint = $.ZOF.getInstance('hint');
				
				//--> bar
				this.bar = $.ZOF.getInstance('bar');
				
				//--> box
				this.box = $.ZOF.getInstance('box');
				
				//--> dialog
				this.dialog = $.ZOF.getInstance('dialog');
				
				//--> set direction
				$('body').attr('dir', this.direction);

				return this;
			},
			
			_errorHandler : function(params, jqXHR, textStatus, errorThrown) {
				switch (jqXHR.status) {	
					//--> 0
					case 0:
						this.box.show(this.message.msg('error'), this.message.msg('timeout'), 'MB_OK', function() {
							window.location.replace('');							
						});
						break;
					//--> Unauthorized	
					case 401: 
						this.bar.show('error', this.message.msg(jqXHR.responseText));
						break;
					//--> Forbidden
					case 403: 
						this.bar.show('error', this.message.msg('forbidden'));
						break;
					//--> Internal Server Error
					case 500: 
						this.box.show(this.message.msg('error'), jqXHR.responseText);
						break;
					//--> Validate
					case 590: 
			  			this.bar.show('error', this.message.msg('validate'));
			  			if (params.validate)
			  				params.validate($.parseJSON(jqXHR.responseText), textStatus, jqXHR);                
			  			break;	
			  		//--> Exception	
					case 591: 
						var value = $.parseJSON(jqXHR.responseText);
			  			this.bar.show('error', this.message.msg(value));
			  			if (params.exception)
			  				params.exception(value, textStatus, jqXHR);                
			  			break;	                			  			
					//--> Error not handle
					case 598: 
						this.bar.show('error', this.message.msg('notHandle'));
						break;
					//--> Session timeout	
					case 599: 
						this.box.show(this.message.msg('error'), this.message.msg('timeout'), 'MB_OK', function() {
							window.location.replace('');							
						});
						break;	
					//--> Others	
					default:
						this.box.show(this.message.msg('error'), "Unhandled response status - " + jqXHR.status + ' - ' + jqXHR.responseText);
						break;
				}	
			},	
									
			ajax : function(params) {			
				$.ajax({
					  async : params.async || true,
					  type : params.type,
					  url : params.url,
					  dataType : params.dataType, 
					  data : params.data,
					  contentType : params.contentType,	
					  beforeSend : function(xhr) {
						  _.loading.show(params.loading);					  
						  _.bar.hide();
						  if ((typeof params.compress === 'boolean') && params.compress)
							  xhr.setRequestHeader("Compress", params.compress);						  					  
						  if (params.beforeSend)
							  params.beforeSend(xhr);						
					  },				  
					  error : function(jqXHR, textStatus, errorThrown) {
						  _._errorHandler(params, jqXHR, textStatus, errorThrown);
					  },
					  success : function(data, textStatus, jqXHR) {					  
							switch (jqXHR.status) {
						  	//--> OK
							/*
							 * OK
							 * jqXHR.status = 200 
							 *    must have response body to prevent from jQuery handle in success routine
					  		 */
						  	case 200:
						  	case 204: //--> NO CONTENT						  								  		
						  		switch (params.dataType) {
							  		case 'json':
							  		case 'xml':
							  		case 'html':	
							  			if (params.success) 
							  				params.success(data, textStatus, jqXHR);  
							  			break;
							  		default:
							  			_.box.show(_.message.msg('error'), "Unhandled response status - " + jqXHR.status + ' - ' + jqXHR.responseText);  
							  			return;							  			
						  		}
						  		break;						  	
							default:
								_.box.show(_.message.msg('error'), "Unhandled response status - " + jqXHR.status + ' - ' + jqXHR.responseText);
								return;
							};	
					  }				  
				})
				/*
				 * Deprecation Notice: The jqXHR.success(), jqXHR.error(), and jqXHR.complete() callbacks are 
				 * deprecated as of jQuery 1.8. To prepare your code for their eventual removal, 
				 * use jqXHR.done(), jqXHR.fail(), and jqXHR.always() instead.
				 */	
					  .always(function(jqXHR, textStatus) {
						  if (params.complete)
							  params.complete(jqXHR, textStatus);
						  _.loading.hide(params.loading);
					  });			
			},	
			
			closeForm : function(items) {
				var close = function(id) {
					if (_.forms[id] !== undefined)
						_.forms[id].close();				
				};
				if (items === undefined)
					$.each(_.forms, function(k) {
						close(k);
					});
				else 	
					$.each(items, function(k, v) {
						close(v);
					});					
			},	
			
			loadResource : function(resource) {	
				if (resource) {
					for (var i = 0; i < resource.files.length; i++) {
						var file = resource.files[i],
							url = resource.root + file;
						if (!this._resources[url]) {
							var arr = file.split("."),
								date = this.version;
							switch (arr[arr.length - 1]) {
							case 'js':
								$('<script>', {type : 'text/javascript', src : url + '?' + date}).appendTo('head');
								break;
							case 'css':
								$('<link/>', {rel : 'stylesheet', type : 'text/css', href : url + '?' + date}).appendTo('head');
								break;
							}	
							this._resources[url] = true;
						}
					}			
				}
			},	
			
			getFormModel : function(data, params) {
				var 
					xml = $(data), 
					key = this.xmlKey,
					//--> change new line to parse correctly with parse JSON
					modelStr = xml.find(key.model).text().replace(/\n/g, '\\n');
				//--> translate modelStr
				modelStr = _.message.translate(modelStr); 
				//--> return result
				return {
					model : modelStr != '' ? $.parseJSON(modelStr) : undefined, //--> form model
					editor : xml.find(key.editor).text(), //--> javascipt code
					ui : params.ui, //--> path of ui
					name : params.name, //--> name of form
					service : params.service //--> path of service
				};
			},
			
			_showForm : function(formModel, params, data, textStatus, jqXHR) {
				var form = _.forms[params.name];
				if (form == undefined || !form.isRender()) {
					form = _.renderForm(formModel, data);
				} else {
					for (var name in data) {
						var c = (params.name == name) ? form : form.components[name];
						$.each(['initialize', 'render', 'finalize'], function(k, v) {
							c.refreshProperty(v, data[name]);
						});
					}
					
				}
				form.signal('loadParams', data);
				form.focus();
				if (params.success)
					params.success(data, textStatus, jqXHR);
			},
					
			_loadFormParams : function(formModel, params) {
				if (params.service) {
					this.ajax({
						type : "POST",
						compress : params.compress,
						url : params.service,
						dataType : 'json', 
						data : params.data, 	
						success : function(data, textStatus, jqXHR) {
							_._showForm(formModel, params, data, textStatus, jqXHR);							
						}							
					});
				} else {
					_._showForm(formModel, params, undefined, undefined, undefined);
				}
			},
			
			loadForm : function(params) {
				params.name = params.ui.split('/')[2];
				if (!this._resources[params.ui]) {
					this.ajax({
						url : params.ui + '.zrf' + '?'+ _.version,
						dataType : 'xml',
						success : function(data, textStatus, jqXHR) {
							_._resources[params.ui] = true;	
							_.formModels[params.name] = _.getFormModel(data, params);							
							_._loadFormParams(_.formModels[params.name], params);													
						}
					});					
				} else {
					this._loadFormParams(_.formModels[params.name], params);
				}
			},		
								
			renderForm : function(formModel, model) {
				var	form = $.ZOF.createComponent(formModel.model, undefined, undefined, model !== undefined ? model : undefined);
				this.forms[form.name] = form;
				//--> run it
				(new Function(
						//--> declare app and form variants
						"var app = $.ZAP, :id = app.forms.:id;".replace(/:id/g, form.name) +
						//--> declare the component of form variants
						function() {
							var s = '';
							for (var name in form.components) 
								s += 'var ' + name + ' = app.forms.' + form.name + '.components.' + name  + ';';
							return s;
						}() +
						//--> editor
						formModel.editor 
				))();
				//--> render component
				return $.ZOF.renderComponent(form);
			},
			
			global : function(k, v) {
				if (v === undefined) {
					return this._global[k];
				} else {
					this._global[k] = v;
				}
			},
			
			reverse : function(v) {
				var res = {};
				for (var i in v) {
					res[v[i]] = i;
				}
				return res;
			}			
			
		});
		
		_._init();
	
	
	})($.ZAP);
	
});		