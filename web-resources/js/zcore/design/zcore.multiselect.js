/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'multiselect',
		
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
				
				height : 30,	
				
				width : 200,	
				
				value : {
					type : 'array'
				},				
							
				/*
				 * new
				 */
				
				header : _.defaultProperty('string', 'default'),
				
				multiple : _.defaultProperty('boolean'),
				
				listHeight : _.defaultProperty('int', 100),
				
				selectedList : _.defaultProperty('int', 0)
					
			});
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);