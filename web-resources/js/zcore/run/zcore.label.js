/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'label',
		
		inherit : 'component',
		
		body : function(o) {	
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */
			
			this.tag = '<label>';			
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */		
			
			this.properties({
					
				/*
				 * override
				 */
				
				__null__ : ['align', 'tabindex'],
				
				height : {
					defVal : 14,
				},					
				
				width : 42
				
			});
			
		}
						
	});	
	
})(jQuery, jQuery.ZOF);