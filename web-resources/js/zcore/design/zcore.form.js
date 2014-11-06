/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'form',
		
		inherit : 'postable',
		
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
				
				__null__ : ['post', 'sequence', 'validators', 'readonly', 'tabindex', 'value', 'visible'],
								
				top : {
					get : function() {
						return this.__.o.parent().offset().top; 
					},
					set : function(v) {
						v = v < 0 ? 0 : v;
						this.__.o.parent().offset({top : v, left : this.__.o.parent().offset().left});
					}					
				},
					
				left : {
					get : function() {
						return this.__.o.parent().offset().left;
					},
					set : function(v) {
						v = v < 0 ? 0 : v;
						this.__.o.parent().offset({top : this.__.o.parent().offset().top, left : v});
					}					
				},
					
				height : {
					get : function() {
						return this.__.o.dialog('option', this.name);
					},
					set : function(v) {
						v = (v < parseInt(this.__.o.dialog('option', 'minHeight'))) ? parseInt(this.__.o.dialog('option', 'minHeight')) : v;
						this.__.o.dialog('option', this.name, v);
					}
				},
					
				width : {
					get : function() {
						return this.__.o.dialog('option', this.name);
					},
					set : function(v) {						
						v = (v < parseInt(this.__.o.dialog('option', 'minWidth'))) ? parseInt(this.__.o.dialog('option', 'minWidth')) : v;
						this.__.o.dialog('option', this.name, v);
					}
				},				
				
				title : { 
					get : function() {
						return this.__.o.dialog('option', this.name);
					},
					set : function(v) {
						this.__.o.dialog('option', this.name, v);
					}					
				},		
				
				/*
				 * new
				 */			
				
				options : _.defaultProperty('array', 0, ['titlebar', 'modal', 'resizable', 'draggable']),
				
				icons : _.defaultProperty('array', 0, ['close', 'refresh', 'help']),
						
				position : {
					before : null,
					after : null
				},
				
				align : {
					before : null,
					after : null
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
				
				beforeModelize : {
					method : function() {
						//--> we must first scroll to 0 position to render correctly
						this.__.o.scrollTop(0).scrollLeft(0);	
					}
				},				
				
				refresh : null,
			
				render : { 				
					method : function() {
						var T = this.__;
						T.o
							.dialog({
								dialogClass : 'zui-form-designer',
								closeOnEscape : false,
								scroll : false,
								dragStart : function(event, ui) { 
									$(this).triggerHandler("focus", [true]);
								},
								drag : function(event, ui) { 
									$.ZIN.setValues({
										top : parseInt(ui.offset.top),
										left : parseInt(ui.offset.left)										
									});
								},
								resizeStart : function(event, ui) {
									$(this).triggerHandler("focus", [true]);
								},
								resize : function(event, ui) {
									$.ZIN.setValues({
										left : parseInt(ui.position.left),
										top : parseInt(ui.position.top),
										height : parseInt(ui.size.height),
										width : parseInt(ui.size.width)
									});
								}							
							})
							.focus(function(event, parameter) {
								if (parameter && $.ZDS.selected === undefined || $.ZDS.selected.get(0) != $(this).get(0))
									$.ZDS._focus($(this));
							})
							.mousedown(function(event) {
								event.stopPropagation();													
								$(this).triggerHandler("focus", [true]);
								/*
								 * moveToTop caused not firing change value for input text of inspector
								 * because of insertBefore( this.uiDialog ) in jquery.ui.dialog.js in _moveToTop function
								 * and for this I set in proxy function
								 */							
								setTimeout(function(that) {
									that.dialog('moveToTop');
								}, 0, $(this));
							})
							.droppable({	
								accept : '.zui-palette-icon',
								drop : function(event, ui) {
									$.ZDS.generateComponent(T, ui, true);
								}
							})
							.selectable({
								filter : '.zui-component',
								autoRefresh : true,
								stop: function(ui, event) {						
									var s = $(this).find('.ui-selected');
									//--> not select component in panel
									if (s.length != 0)
										$.ZDS._focus(s.filter(function() {
											return $(this).parent().attr('type') == 'form';
										}));
								}	
							});
						//--> widget
						var w = T.o.dialog('widget');
						w.find('.ui-dialog-titlebar')
							.on('mousedown', function(event) {
								setTimeout(function(that) {
									that.next()
										.dialog('moveToTop')
										.triggerHandler("focus", [true]);
								}, 0, $(this));
							})				
							.find('.ui-dialog-titlebar-close').remove();
						w.find('.ui-resizable-handle').css('background-image', 'url("")');
					}
				}
				
			});
			
		}
			
	});
	
})(jQuery, jQuery.ZOF);