/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'textarea',
		
		inherit : 'text',
		
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
				
				height : {
					state : 'enabled',
					defVal : 110,
				},
				
				width : 240
				
			});
		
		}
	
	});	
	
})(jQuery, jQuery.ZOF);