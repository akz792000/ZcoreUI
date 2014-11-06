/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {	
								
	_.clazz({
		
		name : 'component',
		
		body : function(o) {
				
			$.extend(this, {
				
				o : o, 
				
				widget : {},
				
				parent : undefined, 
				
				name : undefined,
				
				owner : undefined,
					
				params : {},
				
				append : true,
				
				tag : '<div>',
				
				elements : undefined,
				
				_popup : undefined,
				
				addPopup : function(v) {
					this._popup = this._popup || {items : []};
					this._popup.items.push(v);
				},
				
				_prefixClass : function(type) {
					switch (type) {
					case 'property': return '_p_';
					case 'method': return '_m_';
					default: return undefined;
					}					
				},
				
				_getMethod : function(type, name) { 
					return this._prefixClass(type) + name;
				},

				_getEvent : function(name) {
					return 'on' + name.substr(0, 1).toUpperCase() + name.substr(1);
				},
				
				_createObject : function(type, p) {
					var that = this;
					$.each(p, function(k, v) {
						if (k === '__null__') {
							for (var i = 0; i < v.length; i++) {
								delete that[v[i]];
							    delete that[that._getMethod(type, v[i])];
							    delete that[that._getEvent(v[i])];								
							}
						} else {
							var 
								method = that._getMethod(type, k),
								event = that._getEvent(k); 
							//--> remove
							if (v == undefined) { 
								delete that[k];
							    delete that[method];
							    delete that[event];
							} else {
								//--> new
								if (that[method] === undefined) {
									that[method] = new _[type](that, k, v);
									that[k] = function() {
										return this[method].execute(arguments);
									};
									if (that[method].eventBase) 
										that[event] = function(func) {
											this[method].event(func);
											return this;
										};							
								//--> override	
								} else {
									if (typeof v === 'object')
										that[method].extend(v);									
									else //--> means it's default value of property
										that[method].defVal = v;							
								}
							}
						}
					}); 																
				},		
				
				properties : function(p) {
					this._createObject('property', p);												
				},	
				
				methods : function(p) {
					this._createObject('method', p);									
				},
							
				invoke : function(type, k, m, v) {
					var key = this._prefixClass(type) + k;
					if (this[key] !== undefined) {
						if (typeof this[key] === 'object')
							if ($.isFunction(this[key][m]))
								return this[key][m](v);
							else 
								return this[key][m];											
					}				
				},
				
				signal : function(e, p) {
					this.invoke('method', e, 'signal', [p]);
					return this;
				},			
				
				refreshProperty : function(mode) {
					for (var p in this.params) {
						var property = this[this._prefixClass('property') + p];
						if (property !== undefined && property.refresh !== null && property.refresh === mode) {
							if (typeof this.params[p] === 'object' && !$.isArray(this.params[p])) {
								for (var item in this.params[p])
									this.invoke('property', p, item, [this.params[p][item]]);
							} else {
								this.invoke('property', p, 'execute', [this.params[p]]);
							}
						}
					}
					return this;
				},	
				
				initializing : function() {
					//--> initialization
					this.invoke('method', 'initialize', 'execute');
					return this;
				},
				
				container : undefined,	
				
				canister : o,
				
				rendering : function() {
					//--> render
					if (this.append)
						this.o.appendTo(this.container);
					else
						this.o.prependTo(this.container);
					//--> refresh property of component that must be set after initialize
					this.refreshProperty('initialize');						
					//--> renderer
					this.invoke('method', 'render', 'execute');
					//--> refresh property of component that must be set before it's child
					this.refreshProperty('render');					
					return this;
				},					
				
				finalizing : function() {
					//--> refresh property of component that must be set after it's child
					this.refreshProperty('finalize');
					//--> initialization
					this.invoke('method', 'finalize', 'execute');
					return this;
				},	
				
				getChildren : function() {
					return this.canister.children('[type]').not("item").sort(function(fst, snd) {
						return $.ZAP.num($(fst).attr('tabindex')) > $.ZAP.num($(snd).attr('tabindex'));
					});
				},
				
				_modelizePartialTime : function() {
					var res = {},
						id = this.id();
					for (var p in this) {
						if (this[p] instanceof _.property && this[p].modelizedOutput.indexOf('P') !== -1) {		
								if (res[id] === undefined)
									res[id] = {}; //--> array of object	
								res[id][this[p].name] = this[p];
						}
					}
					this.getChildren().each(function() {			
						$.extend(res, $.ZDS.getElement($(this))._modelizePartialTime());
					});
					return res;
				},			
				
				_modelizeRunTime : function() {
					var res = {};
					for (var p in this) {
						if (this[p] instanceof _.property && this[p].modelizedOutput.indexOf('R') !== -1) {
							if (res.a === undefined)
								res.a = []; //--> array of attribute
							res.a.push(this[p]);
						}
					}
					this.getChildren().each(function() {
						if (res.c === undefined)
							res.c = []; //--> array of components
						res.c.push($.ZDS.getElement($(this))._modelizeRunTime());
					});
					return res;
				},
				
				_modelizeDesignTime : function() {					
					this.beforeModelize(); //--> for PartialTime & RunTime this method used in toJSON method
					var res = {};					
					for (var p in this) {
						if (this[p] instanceof _.property && this[p].modelizedOutput.indexOf('D') !== -1) {
							if (res.attributes === undefined)
								res.attributes = {}; //--> array of object			
							var expression = undefined;
							if (this[p].state === 'enabled' && $.isFunction(this[p].expression))
								expression = this[p].expression();
							res.attributes[this[p].name] = (expression === undefined) 
								? this[p].execute()
								: {
									expression : expression,
									execute : this[p].execute(),
									partial : this[p].partial()
								};
						}
					}
					this.getChildren().each(function() {
						if (res.components === undefined)
							res.components = []; //--> array of components				
						res.components.push($.ZDS.getElement($(this))._modelizeDesignTime());
					});
					return res;
				},
				
				modelize : function() {
					switch ($.ZDS.implementationMode) {
					case 'R':
						return this._modelizeRunTime();
					case 'P':	
						return this._modelizePartialTime();
					default:
						return this._modelizeDesignTime();
					}
				}				
								
			});		
			
			/*
			 * ----------------------------------------------------------------------
			 * 								properties
			 * ---------------------------------------------------------------------- 
			 */				
							
			this.properties({												
								
				type : {
					refresh : null,
					state : 'disabled',
					get : function() {	
						return this.__.o.attr(this.name); 
					},
					set : function(v) {
						//--> null
					}
				},
				
				id : {
					refresh : null,
					expression : null,
					get : function() {			
						return this.__.o.attr(this.name); 
					},
					set : function(v) {
						var T = this.__;
						//--> not empty
						if (v == '') {
							$.ZAP.box.show('error', 'a component name can not be empty');
							return;
						}				
						//--> not valid 
						if ($.inArray(v, ["action", "serviceParams", "actionParams"]) !== -1) {
							$.ZAP.box.show('error', v + ' can not be set for component name');
							return;							
						}
						//--> not having same name
						if ($.ZDS.o.find('#' + v).length > 0) {
							$.ZAP.box.show('error', 'a component name ' + v + ' already exist');
							return;
						}
						if ($.isFunction(T.value) && (T.id() == T.value())) {
							T.value(v);
							$.ZIN.setValues({
								value : v
							});
						}
						var old = T.o.attr(this.name);
						T.o.attr(this.name, v);
						$.ZDS.elements[v] = $.ZDS.elements[old];
						delete $.ZDS.elements[old];					
					}
				},
				
				value : {
					get : function() {
						return this.__.widget.data.text();
					},
					set : function(v) {
						this.__.widget.data.text(v).attr('title', v);
					}	
				},
							
				direction : _.defaultProperty('enum', 0, ['inherit', 'ltr', 'rtl']),
				
				disabled : _.defaultProperty('boolean'),
				
				height : {
					type : 'int',
					get : function() {
						return this.__.o.height();
					},
					set : function(v) {
						var T = this.__;
						v = (v < parseInt(T.o.css('min-height'))) ? parseInt(T.o.css('min-height')) : v;
						v = (v > parseInt(T.o.css('max-height'))) ? parseInt(T.o.css('max-height')) : v;
						T.o.height(v);
					},
					after : function() {
						this.__.invoke('method', 'refresh', 'execute');
					}
				},
				
				width : {
					type : 'int',
					get : function() {					
						return this.__.o.width(); 
					},
					set : function(v) {	
						var T = this.__;
						v = (v < parseInt(T.o.css('min-width'))) ? parseInt(T.o.css('min-width')) : v;
						v = (v > parseInt(T.o.css('max-width'))) ? parseInt(T.o.css('max-width')) : v;
						T.o.width(v);
					},
					after : function() {
						this.__.invoke('method', 'refresh', 'execute');
					}					
				},
				
				top : {
					type : 'int',
					get : function() {	
						return this.__.o.position().top; 
					},
					set : function(v) {	
						this.__.o.css(this.name, v + 'px');	
					}					
				},	
				
				left : {
					type : 'int',
					get : function() {	
						return this.__.o.position().left;
					},
					set : function(v) {	
						this.__.o.css(this.name, v + 'px');
					}				
				},
							
				visible : {	
					type : 'boolean',
					values : [false, true],
					defVal : true,
					get : function() {	
						return !this.__.o.hasClass('zui-state-hidden');  
					},				
					set : function(v) {
						var T = this.__;
						if (!v) 
							T.o.addClass('zui-state-hidden');
						else
							T.o.removeClass('zui-state-hidden');
					}					
				},
				
				tabindex : _.defaultProperty('int'),
				
				cssClass : $.extend(_.defaultProperty(), {
					before : function(v) {
						this.__.o.addClass(v);
					}				
				}),
				
				cssStyle : $.extend(_.defaultProperty(), {
					before : function(v) {
						var css = v.split(';');
						for (var i in css) {
							var cssItem = css[i].split(':');
							this.__.o.css(cssItem[0], cssItem[1]);
						}
					}				
				}),			
				
				title : _.defaultProperty(),
				
				position : $.extend(_.defaultProperty('enum', 0, ['default',
				                           				          'left top',  'left center', 'left bottom',
				                           				          'center top', 'center center', 'center bottom',
				                           				          'right top', 'right center', 'right bottom']), {
					refresh : 'finalize',
					before : function(v) {
						var T = this.__;
						if (v !== 'default')
							T.o.position({
								my : v,
								at : v,
								of : T.o.parent(),
								collision : 'fit fit',
								using : function(pos, obj) {
									var temp = v.split(" ")[1];
									temp = (temp != 'center') ? temp : 'top';
									$(this).css({
										top : pos.top < 0 ? 0 : pos.top - parseInt(obj.target.element.css('border-' + temp + '-width')),
										left : pos.left < 0 ? 0 : pos.left - parseInt(obj.target.element.css('border-left-width'))
									});
								}
							});
					},
					after : function(v) {
						$.ZIN.setValues($.ZIN.prepareValues(this.__, ['left', 'top']));
					}				
				}),
				
				align : $.extend(_.defaultProperty('enum', 0, ['default', 'left', 'top', 'right', 'bottom', 'client']), {
					refresh : 'finalize',
					before : function(v) {
						var T = this.__;
						switch (v) {
						case 'left':		
							T.position("left top");
							T.o.outerHeight(T.o.parent().innerHeight());
							break;					
						case 'top':
							T.position("left top");
							T.o.outerWidth(T.o.parent().innerWidth());
							break;												
						case 'right':
							T.position("right top");
							T.o.outerHeight(T.o.parent().innerHeight());
							break;					
						case 'bottom':	
							T.position("left bottom");
							T.o.outerWidth(T.o.parent().innerWidth());
							break;	
						case 'client':		
							T.position("left top");
							T.o.outerHeight(T.o.parent().innerHeight());
							T.o.outerWidth(T.o.parent().innerWidth());
							break;						
						default:
							break;						
						}
					},				
					after : function(v) {
						$.ZIN.setValues($.ZIN.prepareValues(this.__, ['left', 'top', 'height', 'width']));
					}
				})				
				
			});
			
			/*
			 * ----------------------------------------------------------------------
			 * 								methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				 
				initialize : {
					method : function() {
						var T = this.__;
						T.canister = T.o = $(T.tag, {
							type : T.params.type,
							id : T.params.id,
							'class' : 'zui-component zui-' + T.params.type
						});
					}					
				},
				
				beforeModelize : {
					method : function() {				
						//--> NOP		
					}
				},							
				
				prepareModel : {
					method : function(m) {				
						return m;				
					}
				},	
				
				render : {					
					method : function() {
						var T = this.__;
						T.o						
							.focus(function(event, parameter) {
								if (parameter && !$(this).hasClass('ui-selected'))
									$.ZDS._focus($(this));
							})
							.mousedown(function(event) {
								event.stopPropagation();
								/*
								 * browser automatically fire focus event when mouse down 
								 * on the divation that has tabindex attribute
								 */
								$(this).triggerHandler("focus", [true]);
							})
							.draggable({
								refreshPositions: false,
								containment: undefined,
								scroll: false,
								start: function(event, ui) {	
									$.ZDS.getDragSelected(ui);
								},
								drag: function(event, ui) {
									$.ZDS.setDragSelectedPos(ui);
									if ($.ZDS.selected.length == 1) {
										$.ZIN.setValues({
											top : parseInt(ui.position.top),
											left : parseInt(ui.position.left)										
										});
									}
									//--> if is draggable 
									return $.isFunction(T.top) && $.isFunction(T.left); 
								}
							})		
							.hover(
								function() {
									$(this).addClass('zui-hover-cursor');	
								},
								function() {
									$(this).removeClass('zui-hover-cursor');
								}
				  			) 
							.resizable({
								containment: undefined,
								handles : (function(t) {
									var r = [];
									if ($.isFunction(t.height) && t.invoke('property', 'height', 'state') === 'enabled') {
										r.push("n");
										r.push("s");
									}
									if ($.isFunction(t.width) && t.invoke('property', 'width', 'state') === 'enabled') {
										if (r.length !== 0) {
											r = ["all"];							
										} else { 
											r.push("e");
											r.push("w");
										}
									}
									return (r.length !== 0) ? r.toString() : 'none';
								})(T),
								resize : function(event, ui) {
									var 
										c = $.ZDS.getElement(ui.helper),
										m = {};
									c.invoke('method', 'refresh', 'execute');
									if ($.isFunction(c.left))
										m.left = parseInt(ui.position.left);
									if ($.isFunction(c.top))
										m.top = parseInt(ui.position.top);
									if ($.isFunction(c.height))
										m.height = parseInt(c.height());
									if ($.isFunction(c.width))
										m.width = parseInt(c.width());
									$.ZIN.setValues(m);
								}				
							})
							.find('.ui-resizable-handle').css('background-image', 'url("")');
					}
				},	
				
				remove : {					
					method : function() {
						var T = this.__;
						//--> child elements remove in designer
						T.getChildren().each(function() {
							var 
								id = $(this).attr('id'),
								element = $.ZDS.elements[id];
							element.invoke('method', 'remove', 'execute');
							//--> delete
							delete $.ZDS.elements[id];
						});						
						//--> remove main
						T.o.remove();
						delete $.ZDS.elements[T.id()];
						T.o = undefined;						
					}
				},				
							
				finalize : {					
					method : function() {
						var T = this.__;																	
						if (T._popup !== undefined) 
							T.o.contextPopup(T._popup);
					}
				},
				
				refresh : null				
				
			});
			
		}
										
	});
		
})(jQuery, jQuery.ZOF);