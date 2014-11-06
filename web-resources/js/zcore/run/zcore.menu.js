/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'menu',
		
		inherit : 'ajax',
		
		body : function(o) {	
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/js/zcore/util/menu/',
					files : ['zcore.menu.css', 'zcore.menu.js']
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
				
				__null__ : ['value', 'post', 'sequence', 'validators', 'readonly'],
				
				height : 24,
				
				width : 100,
					
				/*
				 * new
				 */		
				
				inside : _.defaultProperty('string', 'body'),
				
				menuWidth : _.defaultProperty('int', 180),	
				
				showSpeed : _.defaultProperty('int', 200)		
				
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
				
				__null__ : ['validateObject', 'validateSet', 'validateClear', 'validate', 'clear'],
				
				finalize : {
					method : function() {
						var 
							T = this.__, 
							P = T.params,
							items = P.data,
							orientation = T.orientation(),
							distance = 0;
						for (var item in items) {	
							var opts = {};
							opts.content = T.renderHTML(items[item].l);
							opts.inside = $(P.inside); 
							opts.showSpeed = P.showSpeed; 
							opts.direction = orientation[0];
							opts.width = P.menuWidth;
							opts.click = $.proxy(function(e) { this.signal('click', e); }, T);						
							distance += (T.o.children('div:last').outerWidth() || 0); 
							$( 
								 "<div id='" + P.id + item + 
								 "' style='position: absolute;" + orientation[1] + ":" + distance + "px;height:" + P.height + "px;'" +
								 " class='fg-button ui-state-default ui-widget ui-widget-content ui-corner-all'>" + 
								 "<span class='ui-icon ui-icon-triangle-1-s'></span>" +
								 "<label style='height: " + P.height + "px;'>" + 
								 $.ZAP.message.translate(items[item].c) +
								 "</label>" +
								 '</div>'
							)
								.appendTo(T.o)
								.hover(
						    		function(){ $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
						    		function(){ $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
						    	)					
								.addClass('fg-button-icon-' + orientation[1])
								.ZcoreMenu('create', opts);
						}
					}
				},
				
				/*
				 * new
				 */
				
				click : {},
				
				getItem : {
					method : function(title) {
						var T = this.__;
						return T.trace(T.params.data, parseInt(title));
					}
				},
				
				trace : {
					method : function(v, title) {
						for (var i in v) {	
							var item = v[i];
							if (item.t == title) {
								return {
									caption : item.c,
									command : item.o
								};
							}
							if (item.l !== undefined) {
								var res = this.__.trace(item.l, title);
								if (res != null)
									return res;
							}
						}
						return null;
					}
				},
				
				renderHTML : {
					method : function(v) {
						var 
							queryStr = '<ul>',
							tempStr = '';
						for (var item in v) {
							if ((v[item].o) && (v[item].o.trim != '')) {
								tempStr = ' title="' + v[item].t + '" command="' + v[item].o + '"';
							} else
								tempStr = '';
							queryStr += "<li>" + '<a href="#"' + tempStr + ">" + $.ZAP.message.translate(v[item].c) + "</a>";
							if (v[item].l)
								queryStr += this.__.renderHTML(v[item].l);
							queryStr += "</li>";	
						}
						queryStr += '</ul>';
						return queryStr;					
					}
				}			
			
			});
		
		}
						
	});	
	
})(jQuery, jQuery.ZOF);