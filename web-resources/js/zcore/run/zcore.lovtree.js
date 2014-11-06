/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'lovtree',
		
		inherit : 'tree',
		
		friend : 'lov',
		
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
				
				value : {
					set : function() {
						var T = this.__;
						T.o.ZcoreTreeInvoker('option', 'set', T);
					}
				},
				
				valWidth : 0
				
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
								
				render : {
					advice : 'after',
					method : function() {
						var T = this.__,
							P = T.params;		
						T.widget.btn 							
							.click(function() {
								//--> list of value
								var dialog = $.ZAP.dialog; 
								dialog.show({
									id : T.id(),
									title : T.title(),
									style : 'height: 100%; width: 100%;',
									show : function(w) {
										w
											.height(P.lovHeight)
											.width(P.lovWidth)
											.ZcoreTreeInvoker('show', 'checkbox', T)
											.ZcoreTreeInvoker('option', 'set', T);
									},
									ok : function(w) {
										var 
											res = w.ZcoreTreeInvoker('option', 'get'),
											val = $.ZAP.toString(res.val),
											dsc = $.ZAP.toString(res.dsc);
										T.validateClear();
										T.widget.val.val(val).attr('title', val);
										T.widget.dsc.val(dsc).attr('title', dsc);	
										dialog.close();
									},
									clear : function() {
										dialog.close();
										T.clear();
									},
									cancel : function() {
										dialog.close();
									}									
								});
							});
					}
				}	
			
			});
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);