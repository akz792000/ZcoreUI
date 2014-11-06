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
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.palette = 'Ajax';
			
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
				
				height : 80,
				
				width : 160,						
								
			});	
			
		}
			
	});
	
})(jQuery, jQuery.ZOF);