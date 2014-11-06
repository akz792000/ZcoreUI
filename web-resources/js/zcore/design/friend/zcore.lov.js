/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'lov',
		
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
				
				height : 250,	
				
				width : 160,
				
				value : {
					type : 'array'
				},
				
				/*
				 * new
				 */
				
				lovHeight : _.defaultProperty('int', 200),
				
				lovWidth : _.defaultProperty('int', 300),	
	
				valWidth : _.defaultProperty('int', 36)
				
			});	
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);