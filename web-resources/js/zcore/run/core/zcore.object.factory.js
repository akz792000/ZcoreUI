/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($) {	
	
	function ZcoreObjectFactoryPlugin() {}
	
	$.extend(ZcoreObjectFactoryPlugin.prototype, {
							
		getInstance : function(o) {
			if (o === undefined)
				return new this.component();
			else if (typeof o === "string") 
				return new this[o]();
			else	
				return new this[o.attr('type')](o);
		},	
		
		clazz : function(params) {
			if (params.inherit) {
				var applies = [params.inherit];
				if (params.friend !== undefined)
					applies = applies.concat(params.friend.split(','));
				$.ZOF.constructor.prototype[params.name] = function() {
					//--> set applies
					for (var i = 0; i < applies.length; i++) 				
						$.ZOF[applies[i]].apply(this, arguments);
					params.body.apply(this, arguments);
				};
				$.ZOF[params.name].prototype = Object.create($.ZOF[params.inherit].prototype);
			} else 
				$.ZOF.constructor.prototype[params.name] = params.body;
		},		
				
		createComponent : function(model, parent, owner, params) {
			//--> create component and model
			var 
				clazz = model.a[0],
				c = this.getInstance(clazz),
			    m = {},
			    i = 0;
			//--> initialization model			
			for (var p in c) {
				if (c[p] instanceof this.property) {
					if (c[p].values === undefined)
						m[c[p].name] = model.a[i]; 
					else {
						if (c[p].type === 'array') {
							m[c[p].name] = [];
							for (var item in model.a[i])
								m[c[p].name].push(c[p].values[model.a[i][item]]);
						} else {	
							//--> expression mode return pure value
							if (!isNaN(parseInt(model.a[i], 10)))
								m[c[p].name] = c[p].values[model.a[i]];
							else
								m[c[p].name] = model.a[i];
						}
					}
					i++;
				}
			}
			//--> extera data that comes from request			
			var param = params !== undefined ? params[m.id] : undefined;
			if (param !== undefined) {
				for (var p in param) {
					m[p] = param[p];
				}				
			}
			//--> render component
			c.clazz = clazz;
			c.parent = parent;
			c.owner = owner;
			c.params = m;
			c.name = m.id;
			c.container = (parent === undefined || parent === 'body') ? 'body' : parent.o;
			c.initializing(); 
			if (c instanceof this.form)
				owner = c; 
			//--> render sub components
			for (var j in model.c) {
				var name = model.c[j].a[1];
				if (c.elements === undefined)
					c.elements = {};
				owner.components[name] = c.elements[name] = this.createComponent(model.c[j], c, owner, params);				
			}		
			return c;
		},	
		
		renderComponent : function(c) {
			c.rendering();
			for (var name in c.elements) 
				this.renderComponent(c.elements[name]);
			c.finalizing();	
			return c;
		},
			
		defaultProperty : function(type, defVal, values) {
			var
				res = { 
				type : type,
				defVal : defVal,
				values : values,
				get : function() {	
					return this.__.o.attr(this.name);
				},
				set : function(v) {	
					this.__.o.attr(this.name, v); 
				}
			};
			switch (type) {
			case 'boolean':				 
				$.extend(res, { 
					values : [false, true],
					get : function() {	
						return this.__.o.attr(this.name) === this.name;  
					},
					set : function(v) {
						if (v)
							this.__.o.attr(this.name, this.name);
						else
							this.__.o.removeAttr(this.name);					
					}
				});
				break;
			case 'array':
				$.extend(res, {					
					defVal : values[defVal], 
				});		
				break;
			case 'enum':
				$.extend(res, {
					defVal : values[defVal], 
				});		
				break;
			}
			return res;
		},
		
		disabledChild : function(c, v) {
			if (c.elements !== undefined)
				$.each(c.elements, function(n, e) {
					if ($.isFunction(e.disabled) && !e.disabled()) {
						var methods = ['before', 'after'];
						for (var i = 0; i < methods.length; i++) 										
							e.invoke('property', 'disabled', methods[i], v);
					}
				});	
		},
		
		addClass : function(c, v) {			
			var pattern = 'zui-' + c.type() + '-';
			c.o
				.removeClass(function(index, css) {
					return (css.match(new RegExp('\\b' + pattern + '\\S+', 'g')) || []).join('');
				})
				.addClass(pattern + v);
		}
				
	});	
	
	//--> register as global
	$.ZOF = new ZcoreObjectFactoryPlugin();

})(jQuery);