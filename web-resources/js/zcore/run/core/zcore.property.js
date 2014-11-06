/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'property',
		
		inherit : 'action',
				
		body : function(parent, name, params) {			
		
			/*
			 * ----------------------------------------------------------------------
			 * 								extends parameters
			 * ---------------------------------------------------------------------- 
			 */	
					
			$.extend(this, $.extend({
				
				/*
				 * I. initialize
				 * II. render
				 * III. finalize
				 */			
				refresh : 'render',
				
				type : 'string',
				
				values : undefined,
				
				defVal : $.proxy(function() {
					switch (this.type) {
					case 'string': return '';
					case 'int': return 0;
					case 'float': return 0;
					case 'boolean' : return false;
					case 'enum' : return this.values[0];
					case 'array' : return [];
					case 'object' : '';
					default : return '';
					}
				}, params)(),
							
				get : undefined,
							
				before : undefined,
				
				set : undefined,
				
				after : undefined,
				
				extend : function(params) {
					$.extend(this, params);								
				},			
				
				typeCast : function(v) {
					switch (this.type) {
					case 'string': return v;
					case 'int': return parseInt(v, 10);
					case 'float': return parseFloat(v);
					case 'boolean' : return v !== undefined && v.toString() === 'true' ? true : false;
					case 'enum' : return v;
					case 'array' : return $.isArray(v) ? v : (v == undefined ? [] : v.toString().split(','));
					case 'object' : return v;
					default: return v;
					}
				},	
				
				abstractMethod : function(args) {
					args = args || [];
					this.eventBase = args.length;
					if (this.eventBase) {
						var v = this.typeCast(args[0]);
						if ($.isFunction(this.before))
							this.before(v);
						this.set(v);
						if ($.isFunction(this.after))
							this.after(v);
					} else
						return this.typeCast(this.get());
				}
				
			}, params));
		
		}
	
	});	
	
})(jQuery, jQuery.ZOF);