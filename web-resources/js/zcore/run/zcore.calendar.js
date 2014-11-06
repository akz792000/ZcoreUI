/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
		
	_.clazz({
		
		name : 'calendar',
		
		inherit : 'ajax',
		
		body : function(o) {
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/js/zcore/util/calendar/',
					files : ['jquery.calendars.picker.css', 'jquery.calendars.min.js', 'jquery.calendars.plus.min.js', 'jquery.calendars.picker.js',
					      'jquery.calendars.persian.min.js', 'jquery.calendars.picker-fa.js', 'jquery.calendars.persian-fa.js']
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
							
				align : null,
				
				disabled : {
					after : function(v) {
						var 
							T = this.__,
							input = T.widget.input,
							img = T.widget.img;
						if (v)
							input.attr(this.name, this.name).addClass('ui-state-' + this.name);
						else 
							input.removeAttr(this.name).removeClass('ui-state-' + this.name);
						img.button("option", "disabled", v);						
					}
				},
				
				tabindex : {
					get : function() {
						this.__.widget.input.attr(this.name);
					},
					set : function(v) {
						this.__.widget.input.attr(this.name, v);
					}
				},			
				
				readonly : {
					before : function(v) {
						var input = this.__.widget.input;
						if (v)
							input.attr(this.name, this.name);
						else 
							input.removeAttr(this.name);					
					}
				},			
				
				direction : {
					after : function() {
						this.__.refresh(true);
					}				
				},
				
				height : 24,
				
				width : {
					defVal : 100,
					after : function() {
						this.__.refresh();
					}
				},			
								
				value : {
					get : function() {
						return this.__.widget.input.val(); 
					},
					set : function(v) {
						this.__.widget.input.val(v);
					}					
				}
						
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
						var T = this.__;	
						T.widget = {											
								input : $('<input>', {
									type : "text",
									'class' : "ui-widget-content zui-text-content",
									tabindex : T.params.tabindex	
								}).appendTo(T.o)				
							};
					}			
				},
				
				render : { 		
					method : function() {
						var 
							T = this.__,
							P = T.params,
							defaults = $.ZAP.locale === 'en' ? {} : $.calendars.picker.regional[$.ZAP.locale];
						$.extend(defaults, {	
							isRTL : T.orientation()[0] === 'rtl',
							dateFormat : P.data[0],
							calendar : $.calendars.instance(
									P.data[1], //--> for calendar type 
									$.ZAP.locale //--> for show date in input (when use MM)
							),
							showOnFocus : false,
							showAnim : 'slideDown',
							showTrigger : '<img id="' + P.id + '_Img" src="' + '/css/images/calendar-blue.gif" alt="Popup" class="trigger ui-state-default">'					
						});	
						T.widget.input
							.val(P.data[2])
							.calendarsPicker(defaults);
						T.widget.img = T.o.find('img').button().removeClass('ui-corner-all');					
						T.refresh();
					}
				},	
				
				finalize : {
					method : function() {
						this.__.widget.input
							.bind('focus', function() {
								if (!$(this).is('disabled'))
									$(this).addClass('zui-state-hover');
							})
							.bind('blur', function() {
								$(this).removeClass('zui-state-hover');
							});						
					}
				},			
				
				refresh : { 				
					method : function(v) {					
						//--> set <p> position
						var 
							T = this.__,
							input = T.widget.input, 
							img = T.widget.img;
						if (v) {					
							input.css('right' ,'').css('left' ,'');
							img.css('right' ,'').css('left' ,'');					
							if (T.orientation()[0] === 'rtl') {
								input.css('right' ,'0');
								img.css('left' ,'0');
							} else {
								input.css('left' ,'0');
								img.css('right' ,'0');
							}
						} else
							input.width(T.width() - 32);
					}		
				},
				
				validateObject : {
					method : function() {
						return this.__.widget.input;                  	
					}
				}				
							
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);