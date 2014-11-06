/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'validatorItem',
		
		inherit : 'item',
		
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
				
				__null__ : ['width', 'id'],
 
				value : $.extend(_.defaultProperty('enum', 0, $.ZVD.validators), {
					before : function(v) {
						if ($.ZIT.selected)
							$.ZIT.selected.text(v);
					}
				}),
				
				/*
				 * new
				 */
					
				args : $.extend(_.defaultProperty('string'), {
					expression : null
				})				

			});		
			
			/*
			 * ----------------------------------------------------------------------
			 * 								methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				/*
				 * override
				 */
				
				prepareModel : {
					method : function(m) {
						return {
							type : m.type,
						};								
					}
				},				
				
			});
			
		}
	
	});
	
})(jQuery, jQuery.ZOF);