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
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/jquery/ui/minified/',
					files : ['jquery.ui.tabs.min.js']
			};				
			
						
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
					}
				},
				
				direction : {		
					after : function() {
						_.addClass(this.__, this.__.orientation()[0]);
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
						this.__.widget = $('<ul>').appendTo(this.__.o);
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
				}				
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);