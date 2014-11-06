/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'form',
		
		inherit : 'postable',
		
		body : function(o) {			
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */
			
			this.components = {};
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.properties({
				
				/*
				 * override
				 */
				
				__null__ : ['post', 'sequence', 'validators', 'readonly', 'tabindex', 'value', 'visible'],
				
				disabled : {
					refresh : 'finalize',					
					after : function(v) {
						_.disabledChild(this.__, v);						
					}
				},			
					
				top : {
					get : function() {
						return this.__.o.parent().offset().top; 
					},
					set : function(v) {
						v = v < 0 ? 0 : v;
						this.__.o.parent().offset({top : v, left : this.__.o.parent().offset().left});		
					}					
				},
					
				left : {
					get : function() {
						return this.__.o.parent().offset().left;
					},
					set : function(v) {
						v = v < 0 ? 0 : v;
						this.__.o.parent().offset({top : this.__.o.parent().offset().top, left : v});
					}					
				},
					
				height : {
					get : function() {
						return this.__.o.dialog('option', this.name);
					},
					set : function(v) {
						v = (v < parseInt(this.__.o.dialog('option', 'minHeight'))) ? parseInt(this.__.o.dialog('option', 'minHeight')) : v;
						this.__.o.dialog('option', this.name, v);
					}					
				},
					
				width : {
					get : function() {
						return this.__.o.dialog('option', this.name);
					},
					set : function(v) {						
						v = (v < parseInt(this.__.o.dialog('option', 'minWidth'))) ? parseInt(this.__.o.dialog('option', 'minWidth')) : v;
						this.__.o.dialog('option', this.name, v);
					}					
				},				
				
				title : { 
					get : function() {
						return this.__.o.dialog('option', this.name);
					},
					set : function(v) {
						this.__.o.dialog('option', this.name, v);
					}					
				},		
				
				/*
				 * new
				 */	
				
				options : {
					type : 'array',
					values : ['titlebar', 'modal', 'resizable', 'draggable'],
					get : function() {	
						return this.__.o.attr(this.name) !== undefined ? this.__.o.attr(this.name) : [this.values[0]];  
					},
					before : function(v) {
						//--> titlebar
						var t = this.__.o.dialog('widget').find('.ui-dialog-titlebar');
						if ($.inArray('titlebar', v) !== -1)
							t.show();
						else
							t.hide();
						//--> modal can not change after render
						//--> resizable
						this.__.o.dialog('option', 'resizable', $.inArray('resizable', v) !== -1);	
						//--> draggable
						this.__.o.dialog('option', 'draggable', $.inArray('draggable', v) !== -1);					
					},
					set : function(v) {	
						this.__.o.attr(this.name, v);
					}				
				},			
				
				icons : {
					type : 'array',
					values : ['close', 'refresh', 'help'],
					get : function() {	
						return this.__.o.attr(this.name) !== undefined ? this.__.o.attr(this.name) : this.values;  
					},
					before : function(v) {
						var T = this.__,
							titlebar = T.o.dialog('widget').find('.ui-dialog-titlebar'),
							margin = 0.3,
							orientation = T.orientation()[1];
						//--> remove	
						titlebar.find('.ui-dialog-titlebar-button').remove();
						//--> add
						for (var i in v) {
							$('<button>', {
								'class' : "ui-dialog-titlebar-button",
								title : $.ZAP.message.msg(v[i]),
								tabindex : -1
							})
								.appendTo(titlebar)
								.css(orientation === 'left' ? 'right' : 'left', margin + 'em')
								.button({
									icons: {
										primary: "ui-icon-" + v[i] 
									},
									text: false				
								})
								.mousedown(function(e) {
									e.stopPropagation();
								})
								.click({
									ref : T,
									method : v[i]
								}, function(e) {							
									e.data.ref.invoke('method', e.data.method, 'execute');
								});
							margin += 2;
						}	
					},
					set : function(v) {	
						this.__.o.attr(this.name, v);
					}					
				},
				
				position : {
					before : function(v) {
						if (v !== 'default')
							this.__.o.dialog('option', this.name, v);						
					}				
				},
				
				align : {
					before : function(v) {
						var border = {
								left : parseInt(this.__.o.parent().css('border-left-width')),
								right : parseInt(this.__.o.parent().css('border-right-width')),
								top : parseInt(this.__.o.parent().css('border-top-width')),
								bottom : parseInt(this.__.o.parent().css('border-bottom-width'))
							};
						switch (v) {
						case 'left':		
							this.__.position("left top");
							this.__.height($(window).height() - border.top - border.bottom);
							break;					
						case 'top':
							this.__.position("left top");
							this.__.width($(window).width() - border.left - border.right);
							break;												
						case 'right':
							this.__.position("right top");
							this.__.height($(window).height() - border.top - border.bottom);
							break;						
						case 'bottom':	
							this.__.position("left bottom");
							this.__.width($(window).width() - border.left - border.right);
							break;	
						case 'client':		
							this.__.position("left top");
							this.__.height($(window).height() - border.top - border.bottom);
							this.__.width($(window).width() - border.left - border.right);
							break;						
						default:
							break;
						}				
					}				
				}
				
			});
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				/*
				 * override postable 
				 */
				
				clear : {
					method : function() {
						for (var id in this.__.components)
							if ($.isFunction(this.__.components[id].clear))
								this.__.components[id].clear();					
					}
				},		
				
				validate : {
					method : function(errors) {						
						var T = this.__,
							res = true;			
						for (var id in T.components) 
							if ($.isFunction(T.components[id].validate)) 
								res = T.components[id].validate(errors) && res;
						return res;						
					}
				},	
				
				validateClear : {
					method : function() {
						for (var id in this.__.components)
							if ($.isFunction(this.__.components[id].validateClear))
								this.__.components[id].validateClear();					
					}
				},				
				
				validateObject : null,
				
				validateSet : { 
					method : function(v) {
						for (var id in v) 
							this.__.components[id].validateSet(v[id]);
					}
				},
				
				/*
				 * override component 
				 */
				
				blur : null,	
				
				focus : {
					method : function() {
						this.__.moveToTop();
					}
				},
				
				render : { 				
					method : function() {
						var T = this.__,
							P = T.params;
						T.o 
							.dialog({
								dialogClass : 'zui-form',
								modal : ($.inArray('modal', P.options) !== -1),
								autoOpen : true,
								closeOnEscape : false,
								scroll : false,
								position : [P.left, P.top] //--> it must be set first
							})	
							.on('mousedown', function(event) {
								T.moveToTop();
							});
					}
				},
				
				finalize : {
					method : function() {
						//--> delete default close button
						var 
							T = this.__,
							orientation = T.orientation()[1],
							titlebar = T.o.dialog('widget').find('.ui-dialog-titlebar');
						titlebar.on('mousedown', function(event) {
							T.moveToTop();
						});
						titlebar.find('.ui-dialog-titlebar-close').remove();
						titlebar.find('.ui-dialog-title')
							.css('text-align', orientation)
							.css(orientation, '4px');
					}
				},
											
				/*
				 * new
				 */
				
				call : {
					method : function(v) {
						var T = this.__;
						$.ZAP.ajax({
							compress : v.compress || false,
							async : v.async,
							loading : v.loading || T,
							type : "POST",
							url : v.action,
							dataType : (v.dataType !== undefined) ? v.dataType : 'json', 
							data : T.stringify(T.serialize(v)),
							contentType : v.contentType,
							beforeSend : function(xhr) {
								//--> validate clear
								T.validateClear();
								//--> validate before send
								var errors = {};
								if (!T.validate(errors)) {
									T.validateSet(errors);
									xhr.abort();
								}									
								if (v.beforeSend)
									v.beforeSend(xhr);						
							},			
							exception : function(data, textStatus, jqXHR) {
								if (v.exception)
									v.exception(data, textStatus, jqXHR);					
							},
							validate : function(data, textStatus, jqXHR) {
								T.validateSet(data);
								if (v.validate)
									v.validate(data, textStatus, jqXHR);					
							},										
							success : function(data, textStatus, jqXHR) {
								if (v.success)
									v.success(data, textStatus, jqXHR);
							},
							complete : function(jqXHR, textStatus) {
								if (v.complete)
									v.complete(jqXHR, textStatus);				  
							}						
						});
					}
				},
				
				stringify : {
					method : function(v) {
						var res = '';
						for (var k in v) {
							var val = v[k];
							if (val instanceof Object) {
								val = JSON.stringify(val);
							}
							res += (res == '' ? '' : '&') +	k + '=' + val;
						}
						return res;	
					}					
				},
				
				serialize : {
					method : function(v) {
						var T = this.__,
							res = ($.isEmptyObject(v.serviceParams) ? T.sequential() : v.serviceParams) || {};
						//--> action 
						if (v.actionParams) {
							$.extend(res, {
								actionParams : JSON.stringify(v.actionParams)
							});				
						}
						return $.isEmptyObject(res) ? undefined : res;
					}
				},
				
				isRender : {
					method : function() {
						return this.__.o !== undefined;
					}
				},
				
				close : {
					method : function() {
						var T = this.__;
						if (T.isRender()) {
							T.o
								.dialog('close')
								.dialog('destroy')
								.remove();
							//--> release it
							T.o = undefined;
						}
					}
				},		
				
				help : {},
				
				moveToTop : {
					method : function(v) {
						setTimeout(function(o) {
							o.dialog('moveToTop');
						}, 0, this.__.o);
					}				
				},			
				
				refresh : {
					method : function(params) {
						var model = $.ZAP.formModels[this.__.id()];
						//--> clear data
						$.ZAP.loadForm($.extend(params, {
							ui : model.ui,
							service : model.service
						}));
					} 				
				},		
				
				loadParams : {
					//--> event
				},				
				
				sequential : {
					method : function() {
						var 
							T = this.__,
							res = {},
							c = [];
						if (T.components !== undefined) {	
							$.each(T.components, function(key, val) {
								if ($.isFunction(val.post) && val.post()) {					
									var v = val.value();
									if (v !== undefined && v.length !== 0) {
										c.push({
											key : key,
											val : v,
											seq : val.sequence()
										});
									}
								}
							});
							//--> sort
							c.sort(function(a, b) {
								return a.seq - b.seq;
							});
							//--> prepare
							for (var i in c)
								res[c[i].key] = c[i].val;
						}
						return $.isEmptyObject(res) ? undefined : res;
					}
				}
								
			});
			
		}
												
	});
	
})(jQuery, jQuery.ZOF);