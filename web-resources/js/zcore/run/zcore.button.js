/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'button',
		
		inherit : 'component',
		
		body : function(o) {		
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */
			
			this.tag = '<button>';
						
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
								
				disabled : {
					after : function(v) {
						this.__.o.button("option", "disabled", v);
					}
				},
				
				height : {
					after : function(v) {
						this.__.refresh();
					}
				},		
						
				value : {
					get : function() {
						return this.__.widget.text(); 
					},
					set : function(v) {
						this.__.widget.text(v);
					},
					after : function(v) {
						this.__.refresh();
					}					
				},
				
				width : {
					after : function(v) {
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
				
				refresh : {
					method : function() {
						var T = this.__;
						T.widget
							.position({
								"my" : "center center",
								"at" : "center center",
								"of" : T.o
							});	
					}
				},				
				
				render : { 				
					method : function() {
						var T = this.__;
						T.widget = T.o.button().children('span');
					}			
				},
				
				/*
				 * new
				 */
				
				click : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.o.bind('click.zcore', function(e) {
								if (!$(this).is(':disabled')) 
									v(e);
							});											
					},
					method : function(v) {
						this.__.o.trigger('click.zcore');
					}
				}
						
			});		
			
		}
									
	});
	
})(jQuery, jQuery.ZOF);