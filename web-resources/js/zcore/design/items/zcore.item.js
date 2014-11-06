/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'item',
		
		inherit : 'component',
		
		body : function(o) {	
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.tag = '<item>';
			
			this._modelizeRunTime = function() {
				var res = [];
				for (var p in this) {
					if (this[p] instanceof _.property && this[p].modelizedOutput.indexOf('R') !== -1) 
						res.push(this[p]);
				}
				return res;
			};		
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */
			
			this.properties({
				
				/*
				 * override
				 */
				
				__null__ : ['tabindex', 'readonly', 'title', 'direction', 'post', 'sequence', 'align', 'disabled', 'top', 'left',
				            'height', 'visible', 'cssClass', 'cssStyle', 'position', 'id'],
				
				type : {
					modelizedOutput : 'D'
				},
				
				value : {
					expression : null,
					get : function() {
						return this.__.o.attr(this.name);
					},					
					set : function(v) {
						this.__.o.attr(this.name, v);
					}									
				}
			
			});
					
			/*
			 * ----------------------------------------------------------------------
			 * 								methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				/*
				 * override
				 */			
				
				initialize : {
					advice : 'after',
					method : function() {
						this.__.o.addClass('zui-item ui-state-default');
					}		
				},
				
				render : {					
					method : function() {
						this.__.o
							.focus(function(event, parameter) {
								if (parameter && !$(this).hasClass('ui-selected'))
									$.ZDS._focus($(this));
							})
							.mousedown(function(event) {
								event.stopPropagation();
								$(this).triggerHandler("focus", [true]);
							});									
					}
				},
				
				remove : {
					advice : 'before',
					method : function() {
						$.ZIT.selected.remove();						
					}		
				}				
						
			});				
			
		}
	
	});
	
})(jQuery, jQuery.ZOF);