/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'lovgrid',
		
		inherit : 'grid',
		
		friend : 'lov',
		
		body : function(o) {		
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				render : {
					advice : 'after',
					method : function() {
						var T = this.__,
							P = T.params,
							L = P.data[0];
						T.widget.btn
							.click(function() {
								//--> list of value
								var dialog = $.ZAP.dialog; 
								dialog.show({
									id : T.id(),
									title : L[0],
									show : function(w) {
										w.ZcoreGridInvoker('lovgrid', T);									
									}, 
									ok : function(w) {
										var rows = w.ZcoreGrid('getSelectedRows');
										if (rows.length == 0)
											rows = w.ZcoreGrid('getHoverRows');										
										var 
											val = [],
											dsc = [];
										for (var i = 0; i < rows.length; i++) {
											val.push((rows[i]) ? ((rows[i][0]) ? rows[i][0] : '') : '');
											dsc.push((rows[i]) ? ((rows[i][1]) ? rows[i][1] : '') : '');							
										}	
										val = $.ZAP.toString(val);
										dsc = $.ZAP.toString(dsc);
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