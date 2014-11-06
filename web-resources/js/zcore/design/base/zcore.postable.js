/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'postable',
		
		inherit : 'component',
		
		body : function(o) {
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.properties({
				
				/*
				 * new
				 */
				
				readonly : _.defaultProperty('boolean'),
				
				post : _.defaultProperty('boolean', true),
				
				sequence : _.defaultProperty('int', 0),
				
				validators : _.defaultProperty('item', 'validatorItem'),
									
			});
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({		
				
				/*
				 * override
				 */			
			
				finalize : {
					advice : 'before',
					method : function() {
						var T = this.__;						
						if ($.isFunction(T.validators)) {
							T.addPopup({
								label : 'validators',
								icon : 'css/images/validation.png',
								action : function() {
									$.ZIT.show(T, 'validatorItem', this.label);
								} 
							});
						}
					}			
				}
					
			});				
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);