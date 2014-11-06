/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'hidden',
		
		inherit : 'postable',
		
		body : function(o) {
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.palette = 'Additional';
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */
			
			this.properties({
				
				/*
				 * override
				 */
				
				__null__ : ['align', 'direction', 'tabindex', 'title', 'disabled', 'height', 'width', 'visible', 'cssClass', 'cssStyle', 'position', 'readonly'],
				
				top : {
					expression : null
				},
				
				left : {
					expression : null
				}			
				
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
				
				initialize : {
					advice : 'after',
					method : function() {
						var T = this.__;
						T.o.addClass('ui-state-active');
						T.widget.data = $('<data>', { 
									'style' : 'display:none'
							}).appendTo(T.o);
					}					
				}		
										
			});			
			
		}
	
	});
	
})(jQuery, jQuery.ZOF);