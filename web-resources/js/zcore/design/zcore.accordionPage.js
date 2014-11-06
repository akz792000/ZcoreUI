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
				
				id : {
					after : function(v) {
						var T = this.__;
						T.widget.html(v);
						T.parent.refresh();
					}
				},			
				
				value : {
					get : function() {
						return this.__.widget.text();
					},
					set : function(v) {
						this.__.widget.text(v);
					}	
				},				
				
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
						var T = this.__;	
						T.container.accordion("option", 'active', parseInt(T.widget.attr('number')));	
					}
				},					
								
				initialize : {
					advice : 'after',
					method : function() {
						var T = this.__;
						T.container = T.parent.canister;						
					}		
				},									
				
				remove : {
					advice : 'after',
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
						//--> droppable
						T.o.droppable({
							accept : '.zui-palette-icon',
							greedy : true,
							drop : function(event, ui) {
								$.ZDS.generateComponent(T, ui, true);									
							}
						});
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