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
				
				focused : undefined,
								
				widget : undefined,
				
				parent : undefined,
				
				name : undefined,
				
				owner : undefined,
				
				params : {},
				
				append : true,
				
				tag : '<div>',			
				
				elements : undefined,
				
				resources : undefined,
				
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
				
				refreshProperty : function(mode, v) {
					var params = v || this.params;
					for (var p in params) {
						var property = this[this._prefixClass('property') + p];
						if (property !== undefined && property.refresh !== null && property.refresh === mode) {
							this.invoke('property', p, 'execute', [params[p]]);
						}
					}
					return this;
				},
						
				initializing : function() {					
					//--> load resources
					$.ZAP.loadResource(this.resource);
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
					get : function() {	
						return this.__.o.attr(this.name); 
					},
					set : function() {
						//--> nop
					}
				},
				
				id : {
					refresh : null,
					get : function() {			
						return this.__.o.attr(this.name); 
					},
					set : function() {
						//--> nop
					}				
				},
				
				value : {
					get : function() {
						return this.__.o.text(); 
					},
					set : function(v) {
						this.__.o.text(v);
					}					
				},
				
				direction : {
					type : 'enum',
					values : ['inherit', 'ltr', 'rtl'],
					get : function() {
						/*
						 * if we use this.__.o.css(this.name) for return value
						 * when the property is inherit, the return value doesn't "inherit" 
						 * it does the value of parent's direction
						 */
						return this.__.o.get(0).style.direction; 
					},				
					set : function(v) {
						this.__.o.css(this.name, v);
					}									
				},					
				
				disabled : {
					type : 'boolean',
					values : [false, true],
					get : function() {	
						return this.__.o.hasClass('zui-state-' + this.name);  
					},
					before : function(v) {
						var T = this.__;
						if (v) 
							T.o.attr(this.name, this.name).addClass('ui-state-' + this.name);
						else
							T.o.removeAttr(this.name).removeClass('ui-state-' + this.name);					
					},					
					set : function(v) {	
						var T = this.__;
						if (v) 
							T.o.addClass('zui-state-' + this.name);
						else
							T.o.removeClass('zui-state-' + this.name);
					}
				},
				
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
						return this.__.o.position()[this.__.parent.orientation()[1]];
					},
					set : function(v) {	
						this.__.o.css(this.__.parent.orientation()[1], v + 'px');
					}				
				},
				
				visible : {		
					type : 'boolean',
					values : [false, true],
					defVal : true,
					get : function() {	
						return !this.__.o.hasClass('zui-state-hidden');  
					},
					before : function(v) {
						var T = this.__;
						if (!v) 						
							T.o.css('display', 'none');
						else	
							T.o.css('display', 'block');
					},					
					set : function(v) {	
						var T = this.__;
						if (!v) 
							T.o.addClass('zui-state-hidden');
						else
							T.o.removeClass('zui-state-hidden');
					}					
				},
				
				tabindex : {
					type : 'int',
					defVal : 0,
					get : function() {	
						return this.__.focused.attr(this.name);
					},
					set : function(v) {	
						this.__.focused.attr(this.name, v); 
					}
				},
				
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
						var T = this.__, 
							sides = v.split(" "),
							orientation = T.orientation();
						if (v !== 'default') {	
							//--> if direction is rtl the position method right bottom not work properly
							var direction = T.parent.o.css('direction');
							T.parent.o.css('direction', 'ltr');
							T.o.position({
								my : v,
								at : v,
								of : T.o.parent(),
								collision : 'fit fit',
								using : function(pos, obj) {
									var side = [
									            (sides[0] !== 'center') ? sides[0] : 'left',
									            (sides[1] !== 'center') ? sides[1] : 'top'
									            
									];
									$(this).css({
										right : 'auto',
										left : 'auto',
										top : pos.top < 0 ? 0 : pos.top - parseInt(obj.target.element.css('border-' + side[1] + '-width')),
									});
									$(this).css(orientation[1], pos.left < 0 ? 0 : pos.left - parseInt(obj.target.element.css('border-' + side[0] + '-width')));
								}
							});		
							T.parent.o.css('direction', direction);
						}
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
					}
				})			
				
			});
			
			/*
			 * ----------------------------------------------------------------------
			 * 								methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				blur : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.o.bind('blur.zcore', function(e) {
								if (!$(this).is(':disabled')) 
									v(e);
							});											
					},
					method : function(v) {
						this.__.o.trigger('blur.zcore');
					}
				},			
						
				finalize : {
					method : function() {
						this.__.focused
							.bind('focus', function() {
								if (!$(this).is(':disabled'))
									$(this).addClass('zui-state-hover');
							})
							.bind('blur', function() {
								$(this).removeClass('zui-state-hover');
							});	
					}
				},		
				
				focus : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.focused.bind('focus.zcore', function(e) {
								if (!$(this).is(':disabled')) 
									v(e);
							});											
					},
					method : function(v) {
						this.__.focused.trigger('focus.zcore');
					}
				},	
				
				keypress : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.focused.bind('keypress.zcore', function(e) {
								if (!$(this).is(':disabled')) 
									v(e);
							});											
					}
				},					
			
				initialize : {
					eventBase : false, 
					method : function() {
						var T = this.__;
						T.canister = T.o = $(T.tag, {
							type : T.params.type,
							id : T.params.id,
							name : T.params.id,
							'class' : 'zui-component zui-' + T.params.type
						});
						T.focused = T.o;
					}					
				},
				
				refresh : null,
				
				render : {},
				
				orientation : {
					method : function() {
						/*
						 * when you call this method the answer always 
						 * be rtl or ltr not inherit, doesn't need to go 
						 * to parnet and get it's direction
						 */ 				
						return $.ZAP.orientation(this.__.o.css('direction'));
					}
				}				
					
			});		
			
		}
										
	});
		
})(jQuery, jQuery.ZOF);