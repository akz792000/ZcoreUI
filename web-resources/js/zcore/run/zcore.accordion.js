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
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */
			
			this.properties({
				
				/*
				 * override
				 */
				
				__null__ : ['tabindex', 'value'],
						
				height : 200,
				
				width : 400,
				
				disabled : {
					refresh : 'finalize',
					after : function(v) {
						_.disabledChild(this.__, v);	
						this.__.canister.accordion({ disabled: v });		
					}
				},				
				
				direction : {		
					after : function(v) {
						var 
							T = this.__,
							orientation = T.orientation(v);
						T.canister
							.accordion('option', "icons", {
								header : "ui-icon-circle-arrow-" + orientation[2].substr(0, 1),
								activeHeader : "ui-icon-circle-arrow-s"
							});
						_.addClass(T, T.orientation(v)[0]);
					}
				}							
				
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
						this.__.canister = $('<div>').appendTo(this.__.o);
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
				}			
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);