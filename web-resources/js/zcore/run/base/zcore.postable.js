/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'postable',
		
		inherit : 'component',
		
		body : function(o) {	
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.properties({
				
				/*
				 * new
				 */
				
				readonly : _.defaultProperty('boolean'),
				
				post : _.defaultProperty('boolean', true),
				
				sequence : _.defaultProperty('int', 0),
				
				validators : {
					refresh : null,
					type : 'array',
					get : function() {
						//--> NOP
					},
					set : function(v) {
						//--> NOP
					}				
				}				
				
			});
			
			/*
			 * ----------------------------------------------------------------------
			 * 								methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({
				
				/*
				 * new
				 */		
				
				clear : { 				
					method : function() {
						var T = this.__;
						T.invoke('method', 'validateClear', 'execute');
						T.invoke('property', 'value', 'execute', ['']);
					}
				},
				
				validate : {
					method : function(errors) {
						var 
							T = this.__, 
							vlds = T.params["validators"];				
						for (var item = 0; item < vlds.length; item++) {
							var vld = vlds[item],								
								M = {
									name : $.ZVD.validators[vld[0]],
									value : T.value(),
									args : vld[1].split(",")
								};
							if (!$.ZVD.invoke(M)) {
								errors[T.id()] = [M.name, M.args];
								return false;
							}
						}
						return true;
					}
				},		
				
				validateClear : {
					method : function() {
						$.ZAP.hint.hide(this.__.validateObject().removeClass('ui-state-error zcore-state-error'));
					}
				},				
				
				validateObject : {
					method : function() {
						return this.__.o;
					}
				},
				
				validateSet : {
					method : function(v) {
						var T = this.__,
							code = T.owner.id() + '.' + T.id() + '.' + v[0],
							exist = $.ZAP.message.exist(code),
							code = exist ? code : v[0];
						$.ZAP.hint.show(T.validateObject().addClass('ui-state-error zcore-state-error'),  $.ZAP.message.msg(code, v[1]));
					}
				}
								
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);