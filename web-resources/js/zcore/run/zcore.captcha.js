/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'captcha',
		
		inherit : 'ajax',
		
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
					defVal : 80,
					after : function(v) {
						this.__.refresh();
					}				
				},			
				
				width : {
					refresh : 'finalize',
					defVal : 160,
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
						return this.__.widget.val.attr(this.name);

					},
					set : function(v) {
						this.__.widget.val.attr(this.name, v);
					}
				},			
				
				value : {
					get : function() {
						return this.__.widget.val.val(); 
					},
					set : function(v) {
						this.__.widget.val.val(v); 
					}					
				},
				
				data : {
					refresh : 'finalize',
					type : 'object',
					get : function() {
						return this.__.widget.img.attr("src");
					},
					set : function(v) {
						this.__.widget.img.attr("src", "data:image/jpeg;base64," + v);
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
				 * override
				 */			
				
				initialize : { 
					advice : 'after',
					method : function() {
						var T = this.__;
						T.widget = {
							img : $('<img>', {
								tabindex : -1,
							}).appendTo(T.o),							
							val : $('<input>', {
								type : 'text',
								'class' : "ui-widget-content zui-text-content zui-text-sizing"
							}).appendTo(T.o),							
							btn : $('<button>', {
								tabindex : -1,
							}).appendTo(T.o)							
						};
					}					
				},
				
				render : {
					method : function() {
						var 
							T = this.__,
							W = T.widget;
						W.btn 
								.button({
									icons: {
										primary: "ui-icon-refresh",
										text : undefined
									}
								})
								.click(function() {
									T.fetch();
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
							margin = 4,
							imgHeight = T.height() - W.val.outerHeight();
						//--> image
						W.img
							.width(T.width())
							.height(imgHeight - margin);
						//--> val
						W.val.css({
							'top' : imgHeight,
							width : T.width() - W.btn.outerWidth() - margin
						});
						W.btn.css('top', imgHeight + margin);
						//--> direction
						var direction = 'left';
						if (T.orientation()[0] === 'ltr')
							direction = 'right';
						W.btn.css(direction, 0);	
						W.val.css(direction, W.btn.outerWidth() + margin);						
					}
				},
				
				finalize : {
					method : function() { 
						this.__.widget.val
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
						return this.__.widget.val;                  	
					}
				},
				
				clear : { 			
					advice : 'after',
					method : function() {
						this.__.widget.val.val('');					
					}
				},
				
				/*
				 * new
				 */
				
				fetch : {
					method : function() {
						var T = this.__;
						if (!T.disabled()) { 
							$.ZAP.ajax({
						        type : 'GET',
						        compress : true,
						        url : T.service(),   
						        dataType : "html",
						        success: function(data) {				
						        	T.data(data);
						        }	
							}); 
						}
					}
				}				
			
			});	
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);