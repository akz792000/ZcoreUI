/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'lov',
		
		body : function(o) {		
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */		
			
			this.properties({
					
				/*
				 * override
				 */
							
				align : null,
				
				height : {
					defVal : 250,
					after : function(v) {
						var W = this.__.widget;
						W.val.outerHeight(v);
						W.dsc.outerHeight(v);
					}				
				},			
				
				width : {
					refresh : 'finalize',
					defVal : 180,
					after : function() {
						this.__.refresh();
					}				
				},		
				
				disabled : {
					after : function(v) {
						var W = this.__.widget;
						if (v)
							for (var i in W)
								W[i].attr(this.name, this.name).addClass('ui-state-' + this.name);
						else 
							for (var i in W)
								W[i].removeAttr(this.name).removeClass('ui-state-' + this.name);
						this.__.widget.btn.button("option", "disabled", v);						
					}
				},
				
				tabindex : {
					refresh : 'finalize',
					get : function() {
						var W = this.__.widget;
						if (this.__.valWidth())
							return W.val.attr(this.name);
						else
							return W.dsc.attr(this.name);
					},
					set : function(v) {
						var W = this.__.widget;
						if (this.__.valWidth())
							W.val.attr(this.name, v);
						else
							W.dsc.attr(this.name, v);
					}
				},			
				
				value : {
					type : 'array',
					get : function() {
						if (this.__.widget.val.val().length === 0) {
							return [];
						}
						return [this.__.widget.val.val().split(','), this.__.widget.dsc.val().split(',')]; 
					},
					set : function(v) {
						//-->set
					}					
				},			
				
				/*
				 * new
				 */
				
				lovHeight : _.defaultProperty('int', 200),
				
				lovWidth : _.defaultProperty('int', 300),
				
				valWidth : _.defaultProperty('int', 36)
				
			});	
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				/*
				 * override
				 */			
				
				initialize : { 
					advice : 'after',
					method : function() {
						var 
							T = this.__,
							P = T.params,
							V = P.value || {};
						T.widget = {
							val : $('<input>', {
								type : 'text',
								val : V[0],
								'class' : "ui-widget-content zui-text-content"
							}).appendTo(T.o),							
							dsc : $('<input>', {
								type : 'text',
								val : V[1],
								'class' : "ui-widget-content ui-state-default zui-text-content",	
								readonly : 'readonly'
							}).appendTo(T.o),
							btn : $('<button>', {
								tabindex : -1,
							}).appendTo(T.o)							
						};
					}					
				},
				
				render : {
					method : function() {
						var T = this.__;
						T.widget.btn 
								.button({
									icons: {
										primary: "ui-icon-circle-zoomin",
										text : undefined
									}
								})
								.find('.ui-button-text')
									.remove();
					}
				},					
							
				refresh : { 				
					method : function() {
						var 
							T = this.__,
							W = T.widget,
							margin = 2,
							getWidth = function(w) {
								return w === 0 ? 0 : w + margin;
							},
							btnWidth = W.btn.outerWidth(),
							valWidth = T.valWidth(),
							dscWidth = T.width() - getWidth(valWidth) - getWidth(btnWidth);
						//--> dsc
						W.dsc.outerWidth(dscWidth);
						W.val.outerWidth(valWidth);
						if (valWidth === 0) 
							W.val.hide();
						else 
							W.val.show();
						//--> direction
						var direction = 'left';
						if (T.orientation()[0] === 'ltr' )
							direction = 'right';
						W.btn.css(direction, 0);
						W.dsc.css(direction, getWidth(btnWidth));	
						W.val.css(direction, getWidth(btnWidth) + getWidth(dscWidth));
					}
				},
				
				finalize : {
					method : function() {
						var 
							W = this.__.widget,
							o = W.val.is(':visible') ? W.val : W.dsc; 
						o
							.blur(function() {
								$(this).removeClass('zui-state-hover');
							})
							.focus(function() {
								$(this).addClass('zui-state-hover');
							});	
					}
				},
								
				validateObject : {
					method : function() {
						var T = this.__,
							W = T.widget;
						return T.valWidth() !== 0 ? W.val : W.dsc;                  	
					}
				},
				
				clear : { 			
					advice : 'after',
					method : function() {
						var W = this.__.widget;
						W.val.val('').attr('title', '');
						W.dsc.val('').attr('title', '');					
					}
				}				
			
			});	
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);