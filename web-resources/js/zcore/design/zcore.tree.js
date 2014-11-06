/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'tree',
		
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
												
				readonly : null,
				
				height : 250,	
				
				width : 200,
				
				/*
				 * new
				 */
				
				master : _.defaultProperty('int', 0)
				
			});
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);