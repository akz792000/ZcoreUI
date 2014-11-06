/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'clock',
		
		inherit : 'label',
		
		body : function(o) {
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/js/zcore/util/',
					files : ['zcore.clock.js']
			};				
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				/*
				 * override
				 */
				
				render : { 				
					method : function() {
						this.__.o.ZcoreClock();
					}			
				}
			
			});			
		
		}
	
	});
	
})(jQuery, jQuery.ZOF);