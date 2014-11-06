/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'menu',
		
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
					
				__null__ : ['value', 'post', 'sequence', 'validators', 'readonly'],
				
				height : 24,
				
				width : 100,			
				
				/*
				 * new
				 */		
				
				inside : _.defaultProperty('string', 'body'),
				
				menuWidth : _.defaultProperty('int', 180),	
				
				showSpeed : _.defaultProperty('int', 200)				
				
			});	
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);