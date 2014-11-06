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
				 * I. enabled
				 * II. disabled
				 * III. hidden
				 * IV. readonly
				 */
				state : 'enabled',
				
				/*
				 * I. initialize
				 * II. render
				 * III. finalize
				 */
				refresh : 'render',
				
				expression : function(v) {		
					var attr = $.ZEX.prefix + this.name;
					if (v !== undefined) {
						if (v != '')							
							this.__.o.attr(attr , v);
						else
							this.__.o.removeAttr(attr);
					}
					return this.__.o.attr(attr); 
				},
							
				partial : function(v) {
					if (v !== undefined) {
						//--> prepare attribute value
						if (v.toString() === 'true') {
							if (this.modelizedOutput.indexOf('P') === -1)
								this.modelizedOutput += 'P'; 
						} else
							this.modelizedOutput = this.modelizedOutput.replace(/P/g, '');							
					}					
					return this.modelizedOutput.indexOf('P') !== -1 ? true : false; 
				},
				
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
				},
				
				/*
				 * use in modelize method
				 * I. R = RunTime
				 * II. D = DesignTime
				 * III. P = PartialTime
				 */
				modelizedOutput : 'RD',   
				
				//--> use in zcore.json.js for modelize (PartialTime, RunTime)
				toJSON : function() {
					this.__.beforeModelize();
					var expression = undefined;
					if (this.state === 'enabled' && $.isFunction(this.expression)) 
						expression = this.expression();
					if (expression !== undefined)
						return expression; 
					else {
						if (this.values === undefined)
							return this.execute();
						else {
							if (this.type === 'array') {
								var items = this.execute(), res = [];
								for (var item in items) {
									var index = this.values.indexOf(items[item]);
									if (index !== -1)
										res.push(index);
								}	
								return "[" + res.join(',') + "]";
							} else
								return this.values.indexOf(this.execute());
						}
					}
				}
				
			}, params));
			
		}
		
	});	
	
})(jQuery, jQuery.ZOF);