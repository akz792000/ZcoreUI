/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'buttonset',
		
		inherit : 'ajax',
		
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
				
				__null__ : ['align', 'readonly'],
				
				disabled : {
					after : function(v) {
						this.__.o.find('input').button("option", "disabled", v);
					}
				},
				
				height : {
					defVal : 24,
					after : function(v) {
						var 
							T = this.__,
							label = T.o.find('label:first'),
							border = {
								top : parseInt(label.css('border-top-width')),
								bottom : parseInt(label.css('border-bottom-width'))
						};					
						T.o.find('label').each(function() {
							$(this)
								.height(v - border.top - border.bottom)
								.find('span').position({
									"my" : "center center",
									"at" : "center center",
									"of" : $(this)
								});	
						});
					}
				},	
				
				tabindex : {
					get : function() {
						this.__.o.children('input:first').attr(this.name);
					},
					set : function(v) {
						this.__.o.children('input').attr(this.name, v);
					}
				},				
				
				value : {					
					type : 'array',
					get : function() {
						var 
							T = this.__,
							res = [];
						T.o.find("input:checked").each(function() {
							res.push($(this).val());
						});
						return res;
					},
					set : function(v) {
						this.__.o.find('input').each(function() {
							for (var i = 0; i < v.length; i++) {
								if ($(this).val() == v[i]) 
									$(this).prop('checked', true);
								else
									$(this).prop('checked', false);
							}
						});
					},
					after : function() {
						this.__.o.buttonset('refresh');					
					}
				},
				
				width : {
					defVal : 100,
					after : function(v) {
						var 
							labels = this.__.o.find('label'),
							border = {
								left : parseInt($(labels[0]).css('border-left-width')),
								right : parseInt($(labels[0]).css('border-right-width'))
							},
							width = v / labels.length - border.left - border.right;
						labels.each(function(index) {
							$(this).width(width);
						});
					}
				},				
									
				/*
				 * new
				 */
				
				kind : _.defaultProperty('enum', 0, ['radio', 'checkbox'])
				
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
						this.__.o.removeAttr('name');
					}					
				},			
				
				render : {
					method : function() {
						var T = this.__,
							P = T.params,
							query = '';
						for (var i in P.data)
							query += "<input type='" + P.kind + 
									"' name='" + P.id + 
									"' id='" + P.id + i + 
									"' value='" + P.data[i] + "' " +
									"' tabindex='" + P.tabindex + "' " +
									"/>" +
									"<label for='" + P.id + i + "'>" + $.ZAP.message.translate('${' + i + '}') + "</label>";	
						T.o.append(query).buttonset();
						if (P.direction === 'rtl') {
							T.o.children('label[class*=" ui-corner-"]').each(function() {
								var 
									rem = 'left', 
									add = 'right';
								if ($(this).hasClass('ui-corner-right')) {
									rem = 'right';
									add = 'left';
								}
								$(this).removeClass('ui-corner-' + rem).addClass('ui-corner-' + add);	
							});	
						}
					
					}
				},	
				
				finalize : {
					method : function() {
						var T = this.__;
						//--> set event
						T.o.find('input').each(function() {
							$(this)
								.bind('click.zcore', function(e) {
									if (!$(this).is(':disabled')) {
										T.validateClear();
										T.signal('click', e); 
									}
								})
								.bind('focus', function() {
									$(this).next().addClass('zui-state-hover');
								})
								.bind('blur', function() {
									$(this).next().removeClass('zui-state-hover');
								});		
						});	
					}
				},
				
				validateObject : {
					method : function() {
						return this.__.o.find('label');                  	
					}
				},
							
				/*
				 * new
				 */
				
				click : {}		
			
			});	
			
		}
						
	});	
	
})(jQuery, jQuery.ZOF);