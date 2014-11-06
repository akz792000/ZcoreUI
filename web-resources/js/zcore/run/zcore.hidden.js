/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'hidden',
		
		inherit : 'postable',
		
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
				
				__null__ : ['align', 'direction', 'tabindex', 'title', 'disabled', 'height', 'width', 'visible', 'cssClass', 'cssStyle', 'position', 'readonly'],
								
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
				
				__null__ : ['validate', 'validateClear', 'validateObject', 'validateSet']
			
			});	
			
		}
					
	});
	
})(jQuery, jQuery.ZOF);