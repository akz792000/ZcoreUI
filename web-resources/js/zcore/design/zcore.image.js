/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'image',
		
		inherit : 'component',
		
		body : function(o) {	
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.palette = 'Additional';
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */
			
			this.properties({
				
				/*
				 * override
				 */
				
				__null__ : ['align', 'direction', 'tabindex', 'title', 'value'],
							
				height : 40,
				
				width : 40,			
				
				/*
				 * new
				 */
				
				src : _.defaultProperty()			
				
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
						this.__.o.addClass('zui-image-widget');
					}			
				}			
			
			});
			
		}
					
	});
	
})(jQuery, jQuery.ZOF);