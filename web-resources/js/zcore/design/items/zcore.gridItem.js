/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'gridItem',
		
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
				
				value : {
					modelizedOutput : 'D',
					state : 'disabled',				
				},				
				
				width : $.extend(_.defaultProperty('int', 80), {
					expression : null
				}),
				
				/*
				 * new
				 */
				
				title : _.defaultProperty(),
					
				length : $.extend(_.defaultProperty('int', 30), {
					expression : null
				}),
				
				filter : $.extend(_.defaultProperty('boolean'), {
					expression : null
				}),			
				
				sort : $.extend(_.defaultProperty('boolean'), {
					expression : null
				}),
				
				order : $.extend(_.defaultProperty('boolean'), {
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
							value : $.ZIT.o.find('item').length
						};			
					}
				},				
							
				remove : {
					advice : 'after',
					method : function() {
						var cnt = 0;
						$.ZIT.o.find('item').each(function() {
							$(this).text(cnt).trigger('change', [cnt]);
							cnt++;
						});
					}		
				}
			
			});
							
		}
	
	});
	
})(jQuery, jQuery.ZOF);