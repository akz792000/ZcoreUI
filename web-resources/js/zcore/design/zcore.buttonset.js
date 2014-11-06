/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'buttonset',
		
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
				
				__null__ : ['align', 'readonly'],
				
				height : 24,
				
				width : 100,	
				
				value : {
					type : 'array'
				},
							
				/*
				 * new
				 */
				
				kind : _.defaultProperty('enum', 0, ['radio', 'checkbox'])
					
			});	
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);