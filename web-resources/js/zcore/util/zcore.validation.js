/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($) {
	
	function ZcoreValidationPlugin() {
		this.handlers = {};
		this.validators = [];
	}
	
	//--> register as global
	$.ZVD = new ZcoreValidationPlugin();
	
	(function(_) {
		
		/*
		 * ----------------------------------------------------------------------
		 * 								 methods
		 * ---------------------------------------------------------------------- 
		 */		
		
		$.extend(ZcoreValidationPlugin.prototype, {
			
			_init : function() {
				for (var name in _.handlers) 
					_.validators.push(name);
			},				
			
			_isNumber : function(v) {
			  return !isNaN(parseFloat(v)) && isFinite(v);
			},
			
			_value : function(type, v) {
				switch (type) {
				case 'string' : return v;
				case 'number' : return Number(v);
				case 'array' : return Number(v);				
				case 'object' : return v;
				default: return v;
				}
			},			
			
			_args : function(type, a) {
				var res = [];
				for (var i = 0; i < a.length; i++)
					res.push(_._value(type, a[i]));
				return res;
			},
			
			_call : function(name, v, a) {
				return _.handlers[name].method(v, a);	
			},
			
			invoke : function(params) {
				var handler = _.handlers[params.name],
					value = _._value(handler.value, params.value),
					args = _._args(handler.args, params.args);
				return handler.method(value, args);
			}
			
		});
		
		/*
		 * ----------------------------------------------------------------------
		 * 								 handlers
		 * ---------------------------------------------------------------------- 
		 */
		
		$.extend(_.handlers, {
			
			/*
			 * ----------------------------------------------------------------------
			 *                       order by alphabetical
			 * ---------------------------------------------------------------------- 
			 */			
	
			"expression" : {
				value : 'string',
				args : 'string',
				method : function(v, a) {
					return v.toString().match(a);
				}
			},
			
			"email" : {
				value : 'string',
				args : 'string',
				method : function(v, a) {
					return _._call("regexp", v, "^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\\-+)|([A-Za-z0-9]+\\.+)|([A-Za-z0-9]+\\++))*[A-Za-z0-9]+@((\\w+\\-+)|(\\w+\\.))*\\w{1,63}\\.[a-zA-Z]{2,6}$");
				}
			},			
			
			"length" : {
				value : 'string',
				args : 'number',
				method : function(v, a) {
					return _._call("min.length", v, a[0]) && _._call("max.length", v, a[1]);
				}
			},
			
			"max" : {
				value : 'number',
				args : 'number',
				method : function(v, a) {
					return v <= a;
				}
			},
			
			"max.length" : {
				value : 'string',
				args : 'number',
				method : function(v, a) {
					return v.length <= a;
				}
			},
			
			"max.size" : {
				value : 'array',
				args : 'number',
				method : function(v, a) {
					v = $.isArray(v) ? v : v.split(",");
					return v.length <= a;
				}
			},
			
			"min" : {
				value : 'number',
				args : 'number',
				method : function(v, a) {
					a = Number(a);
					return _._isNumber(v) && v >= a;
				}
			},
			
			"min.length" : {
				value : 'string',
				args : 'number',
				method : function(v, a) {
					return v.length >= a;
				}
			},
			
			"min.size" : {
				value : 'array',
				args : 'number',
				method : function(v, a) {
					v = $.isArray(v) ? v : v.split(",");					
					return v.length >= a; 
				}
			},
			
			"not.blank" : {
				value : 'string',
				args : 'string',
				method : function(v, a) {
					return v!= '';
				}
			},
			
			"not.empty" : {
				value : 'array',
				args : 'number',				
				method : function(v, a) {
					v = $.isArray(v) ? v : v.split(",");
					return v.length != 0;
				}
			},
			
			"not.null" : {
				value : 'object',
				args : 'object',
				method : function(v, a) {
					return v != null;
				}
			},
			
			"range" : {
				value : 'number',
				args : 'number',
				method : function(v, a) {
					a = a.split(",");
					return _.handlers["min"](v, a[0]) && _.handlers["max"](v, a[1]);
				}
			},
			
			"regexp" : {
				value : 'string',
				args : 'string',
				method : function(v, a) {
					return v.match(a);
				}
			},
			
			"size" : {
				value : 'array',
				args : 'number',
				method : function(v, a) {
					a = a.split(",");
					return _.handlers["min.size"](v, a[0]) && _.handlers["max.size"](v, a[1]);
				}
			}
   
		});
		
		_._init();
		
	})($.ZVD);

})(jQuery);