/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'accordion',
		
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
						T.canister = $('<div>').appendTo(T.o);
					}		
				},
				
				refresh : { 				
					method : function() {
						this.__.canister.accordion('refresh');
					}			
				},				
			
				render : {
					advice : 'before',
					method : function() {
						this.__.canister.accordion({							
							heightStyle : "fill",
							collapsible : true,
							/*
							 * if you want to draw it's children component the 
							 * speed if animate must be zero 
							 */
							animate: 0 
						});
					}			
				},
				
				finalize : {
					advice : 'before',
					method : function() {
						var T = this.__;
						T.addPopup({
							label : 'accordion',
							icon : 'css/images/accordion.png',
							action : function() {
								$.ZDS.generateComponent(T, {type : 'accordionPage'}, true);
							} 
						});
					}			
				}				
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);