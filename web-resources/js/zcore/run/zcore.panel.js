/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'panel',
		
		inherit : 'component',
		
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
				
				__null__ : ['tabindex', 'value'],
						
				height : 80,
				
				width : 180,	
				
				disabled : {
					refresh : 'finalize',
					after : function(v) {
						_.disabledChild(this.__, v);						
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
						this.__.o.addClass('zui-panel-widget');
					}			
				}
			
			});						
			
		}
	
	});
	
})(jQuery, jQuery.ZOF);