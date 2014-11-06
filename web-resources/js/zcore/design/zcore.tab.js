/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'tab',
		
		inherit : 'component',
		
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
				
				__null__ : ['tabindex', 'value'],
						
				height : 200,
				
				width : 400							
				
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
						T.widget = $('<ul>').appendTo(T.o);
					}		
				},	
				
				refresh : { 				
					method : function() {
						this.__.o.children('[type="tabPage"]').each(function() {
							$.ZDS.getElement($(this)).refresh();
						});
					}			
				},				
			
				render : {
					advice : 'before',
					method : function() {
						this.__.o.tabs();
					}			
				},
				
				finalize : {
					advice : 'before',
					method : function() {
						var T = this.__;
						T.addPopup({
							label : 'tabs',
							icon : 'css/images/tab.png',
							action : function() {
								$.ZDS.generateComponent(T, {type : 'tabPage'}, true);
							} 
						});
					}			
				}				
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);