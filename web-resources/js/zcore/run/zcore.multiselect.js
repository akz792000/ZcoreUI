/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {

	_.clazz({
		
		name : 'multiselect',
		
		inherit : 'ajax',
		
		body : function(o) {
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/js/zcore/util/multiselect/',
					files : ['multiselect.css', 'jquery.multiselect.js']
			};				
				
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */		
			
			this.properties({
				
				/*
				 * override
				 */
				
				__null__ : ['align', 'readonly'],
				
				disabled : {
					after : function(v) {
						this.__.widget.multiselect(v ? 'disable' : 'enable');
					}
				},
				
				direction : {
					refresh : 'initialize',
				},
				
				height : 30,
				
				width : 200,
				
				value : {					
					type : 'array',
					get : function() {
						var res = [];
						this.__.widget.find("option:selected").each(function() {
							res.push($(this).val());
						});
						return res;
					},
					set : function(v) {
						if (v.length === 0)
							this.__.widget.val(null);
						else
							for (var item in v)
								this.__.widget.val(v[item]);	
					},
					after : function() {
						this.__.widget.multiselect('refresh');					
					}
				},			
				
				data : {
					refresh : 'render',
					type : 'object',
					get : function() {
						var res = [];
						this.__.widget.find("option").each(function() {
							res.push([$(this).val(), $(this).html()]);
						});
						return res;
					},
					set : function(v) {
						this.__.widget.html('');
						for (var i in v) {
							this.__.widget.append(
									"<option value='" + v[i] + "'>" +
									i +
									"</option>");
						}
					}					
				},
							
				/*
				 * new
				 */
				
				header : _.defaultProperty('string', 'default'),
				
				multiple : _.defaultProperty('boolean'),
				
				listHeight : _.defaultProperty('int', 100),
				
				selectedList : _.defaultProperty('int', 0)
					
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
					method :  function() {
						var 
							T = this.__,
							P = T.params;
						T.widget = $('<select>', {
								id : P.id + "Select",
								multiple : P.multiple ? "multiple" : undefined
							})
								.appendTo(T.o)
								.multiselect({
									direction : T.orientation()[0],
									multiple : P.multiple,
									header : P.header !== 'default' ? P.header : undefined,
									title : P.title,
									minWidth : P.width,
									height : P.listHeight,					
									selectedList : P.selectedList,
									checkAllText : $.ZAP.message.get($.ZAP.locale, 'checkAll'),
									uncheckAllText : $.ZAP.message.get($.ZAP.locale, 'uncheckAll'),
									noneSelectedText : $.ZAP.message.get($.ZAP.locale, 'noneSelectedItem'),
									selectedText : $.ZAP.message.get($.ZAP.locale, 'selectedItem')
								});
						//--> set focused
						T.focused = T.o.children('button');
					}
				},			
				
				validateObject : {
					method : function() {
						return this.__.o.find('button');                  	
					}
				},
						
				/*
				 * new
				 */
				
				click : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.o.bind('multiselectclick', function(e, ui) {
								/*
								 * ui = { value, text, checked}
								 */
								v(ui);
							});											
					}
				},
				
				close : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.o.bind('multiselectclose', function(e) { 
								v();
							});											
					},
					method : function() {
						this.__.widget.multiselect('close');
					}
				},
				
				open : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.o.bind('multiselectopen', function(e) { 
								v();
							});											
					},
					method : function() {
						this.__.widget.multiselect('open');
					}
				},
				
				checkAll : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.o.bind('multiselectcheckall', function(e) { 
								v();
							});											
					},
					method : function() {
						this.__.widget.multiselect('checkAll');
					}				
				},			
				
				uncheckAll : {
					event : function(v) {
						if ($.isFunction(v)) 	
							this.__.o.bind('multiselectuncheckall', function(e) { 
								v();
							});											
					},
					method : function() {
						this.__.widget.multiselect('uncheckAll');
					}	
				}			
			
			});	
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);