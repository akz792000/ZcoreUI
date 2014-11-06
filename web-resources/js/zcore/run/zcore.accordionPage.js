/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'accordionPage',
		
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
				
				__null__ : ['tabindex', 'height', 'width', 'top', 'left', 'position', 'align', 'cssClass', 'cssStyle'],		
				
				value : {
					get : function() {
						return this.__.widget.text();
					},
					set : function(v) {
						this.__.widget.text(v);
					}	
				},		
				
				disabled : {
					refresh : 'finalize',
					after : function(v) {
						_.disabledChild(this.__, v);
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
				
				beforeModelize : {
					method : function() {						
						this.__.container.accordion("option", 'active', parseInt(this.__.widget.attr('number')));
					}
				},					
								
				initialize : {
					advice : 'after',
					method : function() {
						this.__.container = this.__.parent.canister;						
					}		
				},									
				
				remove : {
					advice : 'before',
					method : function() {
						var T = this.__;
						T.widget.remove();
						T.parent.refresh();
					}
				},
				
				render : {
					advice : 'after',
					method : function() {
						var T = this.__;	
						T.widget = $('<h3>', {
							number : T.container.find('h3').length
						}).insertBefore(T.o);
					}			
				},
				
				finalize : {	
					advice : 'before',
					method : function() {																
						this.__.parent.refresh();			
					}
				},
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);