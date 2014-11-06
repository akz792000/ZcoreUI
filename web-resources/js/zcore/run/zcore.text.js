/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'text',
		
		inherit : 'postable',
		
		body : function(o) {
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */
			
			this.tag = '<input>';
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */		
							
			this.properties({
				
				/*
				 * override
				 */ 
				
				align : null,
				
				height : 24,
				
				width : 140,			
	
				value : {
					get : function() {
						return this.__.o.val(); 
					},
					set : function(v) {
						this.__.o.val(v);
					}					
				},
				
				/*
				 * new
				 */		
			
				maxlength : {
					type : 'int',
					defVal : -1,
					get : function() {	
						var T = this.__;
						return T.o.attr(this.name) !== undefined ? T.o.attr(this.name) : this.defVal; 
					},
					set : function(v) {	
						var T = this.__;
						if (v === this.defVal)
							T.o.removeAttr(this.name);
						else {
							v = (v < T.value().length) ? T.value().length : v;
							T.o.attr(this.name, v); 
						}
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
						this.__.o.addClass('ui-widget-content zui-text-content');
					}			
				},
								
				finalize : {
					advice : 'after',
					method : function() {
						//--> for proper width & height it should be set in finalize method
						this.__.o.addClass('zui-text-sizing');
					}					
				}
			
			});		
			
		}
	
	});
	
})(jQuery, jQuery.ZOF);