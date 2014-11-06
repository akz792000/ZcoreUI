/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

//--> document ready
$(function() {
	
	function ZcorePalettePlugin() {}
	
	//--> register as global
	$.ZPT = new ZcorePalettePlugin();
	
	(function(_) {
	
		$.extend(ZcorePalettePlugin.prototype, {
						
			_init : function() {
				this._addEventListener();
				this._create(this._createBody());
			},
			
			o : undefined,
			
			_title : "It has not been saved yet ...",
			
			_savePath : undefined,
			
			_setTitle : function() {
				var title = (this._savePath !== undefined) ? _._savePath : this._title;
				this.o.dialog('option', 'title', (title.length >= 70) ? title.substr(0, 70) + ' ...' : title);
				this.o.dialog('widget').find('.ui-dialog-titlebar').attr('title', title);
			},
			
			_getExtension : function(mode) {
				switch (mode) {
				case 'R': 
					return 'zrf';
				default:
					return 'zdf';
				}
			},
			
			_buildModel : function(mode) {
				var model = [],
					ROOT = $.ZAP.xmlKey.root,
					EDITOR = $.ZAP.xmlKey.editor,
					MODEL = $.ZAP.xmlKey.model;	
				//--> set implementation mode
				$.ZDS.implementationMode = mode;
				//--> start root
				model.push('<' + ROOT + '>');
				var value = $.ZED.getValue();
				//--> editor value
				model.push('<' + EDITOR + '>');
				model.push('<![CDATA[' + value + ']]>');
				model.push('</' + EDITOR + '>');				
				//--> form model value
				value = JSON.stringify($.ZDS.getElement($.ZDS.o).modelize());
				model.push('<' + MODEL + '>');
				model.push('<![CDATA[' + value + ']]>');
				model.push('</' + MODEL + '>');
				//--> end root
				model.push('</' + ROOT + '>');				
				//--> return implementation mode to design mode
				$.ZDS.implementationMode = 'D';
				return model;
			},
			
			_addEventListener : function(event) {
				window.addEventListener("zcore-event-ret", function(event) {
					(function (path, content) {
						switch (event.detail.name) {
						case 'activate':
							_.o.children('.zui-palette-btn').find(".zui-palette-icon").filter('.ui-state-disabled')
								.removeClass('ui-state-disabled').button().click(function() {
									_._buttons[$(this).attr('id')]();
								});
							break;
						case 'load':						
								var xml = $.parseXML(content);	
								//--> set editor value
								$.ZED.setValue($(xml).find($.ZAP.xmlKey.editor).text());
								//--> render designer form
								$.ZDS.reCreate($.parseJSON($(xml).find($.ZAP.xmlKey.model).text()));
								//--> prepare designer
								_._savePath = 'file:///' + path.replace(/\\/g, '/');
								_._setTitle();
								$.ZIT.close();
								$.ZAP.bar.show('success', 'Operation successfully done');								
							break;
						case 'save':
							if (event.detail.flag == 'RT') {
								$.ZAP.bar.show('success', 'Operation successfully done');
							} else {
								//--> prepare designer
								_._savePath = 'file:///' + path.replace(/\\/g, '/');
								_._setTitle();
								//---------------------
								//- save runtime time -
								//--------------------- 
								_._dispatchEvent({
									name : 'save',
									flag : 'RT',
									params : {
										path : path.replace('.' + _._getExtension('D'), '.' + _._getExtension('R')),
										content : _._buildModel('R').join('')								  
									}
								});									
							}
							break;
						default:
							break;
						};
					})(event.detail.path, event.detail.content);
				}, false);								
			},
				
			_dispatchEvent : function(params) {
				var event = document.createEvent('CustomEvent');
				event.initCustomEvent("zcore-event", true, true, params);
				document.documentElement.dispatchEvent(event);					
			},
			
			_defaultSave : function(path) {
				return {
					  filterLabel : 'Zcore Design file',
					  filter : "*." + _._getExtension('D'),
					  defaultString : $.ZDS.getElement($.ZDS.o).id() +'.' + _._getExtension('D'),
					  path : path,
					  content : _._buildModel('D').join('')	
				};
			},
			
			_load : function() {
				_._dispatchEvent({
					name : 'load',
					params : {
						filterLabel : 'Zcore Design file',
						filter : "*." + _._getExtension('D'),
					}
				});
			},
			
			_save : function(path) {
				_._dispatchEvent({
					name : 'save',
					flag : 'DT',
					params : _._defaultSave(path)
				});
			},
				
			_buttons : {
				
				//--> form
				form : function() {	
					$.ZAP.box.show('alert', 'Do you really want to create a new form?', 'MB_OKCANCEL', {
						'OK' : function() {
							//--> set editor value
							$.ZED.setValue("");
							//--> render designer form
							$.ZDS.reCreate();
							_._savePath = undefined;
							_._setTitle();
							$.ZIT.close();
							$.ZAP.bar.show('success', 'Operation successfully done');	
						}
					});				
				},
				
				//--> remove
				remove : function() {
					if ($.ZDS.selected.attr('type') != 'form') {
						$.ZDS.removeElement();
						var c = $.ZOF.getInstance($.ZDS.selected.attr('type')), 
							o = c instanceof $.ZOF.item ? $.ZIT.getSelectable() : $.ZDS.getSelectable();   
						o.triggerHandler("focus", [true]);
					} else 
						$.ZAP.box.show('alert', 'There is no component exists to remove !!!');
				},
				
				//--> run
				run : function() {
					var model = _._buildModel('R');
					//--> save in local storage for share data access in multi tab
					localStorage.zcore = model.join('');
					window.open('', 'run').close();				
					//--> instead of replace('index.html', 'run.html') we use this code to handle if deploy on tomcat or http server and local file
					window.open(document.location.href.replace('index.html', '').replace('#', '') + 'run.html', 'run', '');
				},	
				
				//--> load
				load : function() {
					_._load();
				},				
							
				//--> save
				save : function() {	
					_._save(_._savePath);
				},
				
				//--> saveAs
				saveAs : function() {	
					_._save();				
				}						
								
			},
			
			_createBody : function() {
				var 
					id = 'DesignerPalette',
					queryStr = 
						'<div id="' + id + '" class="zui-component">' +
						'<div id="' + id + 'Button" class="zui-component zui-palette-btn ui-state-default ui-corner-all">:btn</div>' +
						'<div id="' + id + 'Tab" class="zui-component zui-palette-tab ui-state-default ui-corner-all"><ul>:head</ul>:body</div>' +
						'</div>',
					tabHeaders = new Object();
				//--> tabs
				$.each($.ZOF, function(index, type) {	
					try {
						var c = new type();
						if (c instanceof $.ZOF.component && c.palette != undefined) {
							if (tabHeaders[c.palette] === undefined)
								tabHeaders[c.palette] = new Array();
							tabHeaders[c.palette].push(index); 
						} 
						c.destroy();
					} catch (e) {}				
				});		
				//--> render
				var header = '', body = '', btn = '', cnt = 0;
				for (var tabHeader in tabHeaders) {
					cnt++;
					header += '<li><a href="#' + id + 'Tab-:cnt">:name</a></li>'.replace(':cnt', cnt).replace(':name', tabHeader); 
					body += '<div id="' + id + 'Tab-:cnt">'.replace(':cnt', cnt);
					for (var tabItem in tabHeaders[tabHeader])
						body += '<div id=":id" class=" zui-palette-icon zui-palette-tab-:id ui-widget-content" type=":id" title=":id"></div>'.replace(/:id/g, tabHeaders[tabHeader][tabItem]);
					body += '</div>';				
				}			
				//--> buttons
				btn = '';
				for (var button in this._buttons) 
						btn += '<div id=":id" class="zui-component zui-palette-icon zui-palette-btn-:id ui-widget-content" title=":id"></div>'.replace(/:id/g, button);
				return $(queryStr.replace(':btn', btn).replace(':head', header).replace(':body', body)).appendTo('body');
			},
			
			moveToTop : function(o) {
				setTimeout(function() {
					o.dialog('moveToTop');
				});	
			},
			
			_create : function(o) {
				this.o = o;
				//--> dialog
				o
					.dialog({
							title : this._title,
							height : 100,						
							width : 528,
							closeOnEscape : false,
							scroll : false,
							draggable : false,
							resizable : false,					
				  			position : {
								"my": "center top",
								"at": "center top",
								"of": $(document)
							}
					})
					.on('mousedown', function(event) {
						event.stopPropagation();	 
						_.moveToTop($(this));
					});	
				//--> widget
				o.dialog('widget').find('.ui-dialog-titlebar')
					.on('mousedown', function(event) {
						_.moveToTop($(this).next());
					})
					.find('.ui-dialog-titlebar-close').remove();	
				//--> tab
				o.children('.zui-palette-tab')
					.tabs()			
		  			.find(".zui-palette-icon")
		  				.draggable({
		  					helper: "clone", 
		  					cursor: "move",
		  					appendTo: "body",
		  					scroll: false,
		  					zIndex: 10000
		  				})
		  				.hover(
							function() {
								$(this).addClass('zui-hover');
							},
							function() {
								$(this).removeClass('zui-hover');
							}
		  				); 
				//--> button
				o.children('.zui-palette-btn').find(".zui-palette-icon").each(function() {
					switch ($(this).attr('id')) {
					case 'load':
					case 'save':
					case 'saveAs':
					case 'build':
						$(this).addClass('ui-state-disabled');	
						break;
					default:
						$(this).button().click(function() {
							_._buttons[$(this).attr('id')]();
						});
					}
				});
				//--> handle (CTRL + S)  
				$(window).keypress(function(event) {
				    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
				    //--> first save the current value
				    $(event.target).triggerHandler('change');
				    $('#DesignerPalette').find('#save').triggerHandler('click');
				    event.preventDefault();
				    return false;
				});
				//--> active other component
				setTimeout(function() {
					_._dispatchEvent({ name : 'activate' });
				}, 100);
			}		
			
		});
		
		_._init();
	
	})($.ZPT);
	
});		