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
		
		createComponent : function(model, parent, owner) {
			//--> create component and model
			var 
				clazz = model.attributes.type,
				c = this.getInstance(clazz);	
			//--> set default value
			for (var p in c) 
				if (c[p] instanceof this.property) 
					c.params[c[p].name] = c[p].defVal;
			$.extend(c.params, model.attributes);			
			//--> render component
			c.clazz = clazz;
			c.parent = parent;
			c.owner = owner;						
			c.name = c.params.id;
			c.container = (parent === undefined || parent === 'body') ? 'body' : parent.o;
			c.initializing();			
			if (c instanceof this.form)
				owner = c; 			
			//--> render sub components
			for (var j in model.components) {
				if (c.elements === undefined)
					c.elements = {};
				c.elements[model.components[j].attributes.id] = this.createComponent(model.components[j], c, owner);
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
			case 'item':
				res = {
					type : 'array',
					state : 'readonly',
					get : function() {
						var res = [];
						this.__.o.find('item[type="' + defVal + '"]').each(function() {
							res.push($.ZDS.getElement($(this)).modelize());
						});
						return JSON.stringify(res); 
					},
					set : function(v) {
						if (v.length) {
							v = $.parseJSON(v);
							for (var item in v) 
								$.ZOF.renderComponent($.ZOF.createComponent(v[item], this.__));
						}
					}					
				};
				break;
			}
			return res;
		}			
				
	});	
	
	//--> register as global
	$.ZOF = new ZcoreObjectFactoryPlugin();
	
})(jQuery);