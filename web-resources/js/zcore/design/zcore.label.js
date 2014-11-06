/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'label',
		
		inherit : 'component',
		
		body : function(o) {
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.palette = 'Standard';
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */		
			
			this.properties({
					
				/*
				 * override
				 */
				
				__null__ : ['align', 'tabindex'],
				
				height : {
					state : 'disabled',
					defVal : 14,
				},				
				
				width : 42
				
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
					
				initialize : {
					advice : 'after',
					method : function() {
						var T = this.__;
						T.widget.data = $('<p>').appendTo(T.o);
					}			
				}
			
			});		
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);