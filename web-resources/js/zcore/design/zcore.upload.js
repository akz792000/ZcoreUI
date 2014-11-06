/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
		
	_.clazz({
		
		name : 'upload',
		
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
				
				__null__ : ['align', 'direction'],
							
				height : {
					defVal : 24,
					after : function() {
						this.__.refresh();
					}
				},		
				
				value : {
					after : function(v) {
						this.__.refresh();
					}					
				},
				
				width : {
					defVal : 100,
					after : function() {
						this.__.refresh();
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
						var T = this.__;
						T.widget.data = $('<p>')
							.appendTo(
								T.o.addClass('ui-button ui-widget ui-state-default ui-corner-all')
							);
					}					
				},
				
				refresh : { 				
					method : function() {
						var T = this.__;
						T.widget.data
							.position({						
								"my" : "center center",
								"at" : "center center",
								"of" : T.o
							});	
					}			
				},				
				
				render : { 		
					advice : 'after',
					method : function(v) {
						this.__.refresh();
					}
				}										
			
			});	
			
		}
			
	});
	
})(jQuery, jQuery.ZOF);