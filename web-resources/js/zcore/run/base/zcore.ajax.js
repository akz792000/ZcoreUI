/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'ajax',
		
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
						
				value : {
					refresh : 'finalize',
					get : function() {
						return ""; 
					},
					set : function() {
						//--> nop
					}
				},			
							
				/*
				 * new
				 */
				
				data : {
					refresh : null,
					type : 'array',
					get : function() {
						//--> nop
					},
					set : function(v) {
						//--> nop
					}				
				},
				
				service : $.extend(_.defaultProperty(), { refresh : 'initialize' })
					
			});	
		
		}
						
	});

})(jQuery, jQuery.ZOF);