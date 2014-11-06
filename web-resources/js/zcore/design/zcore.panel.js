/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'panel',
		
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
				
				__null__ : ['tabindex', 'value'],
						
				height : 30,
				
				width : 80,			
				
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
						this.__.o.addClass('zui-panel-widget');
					}		
				},
			
				render : {
					advice : 'before',
					method : function() {
						var T = this.__;
						T.o
							.droppable({
								accept : '.zui-palette-icon',
								greedy : true,
								drop : function(event, ui) {
									$.ZDS.generateComponent(T, ui, true);
								}
							});
					}			
				}			
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);