/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

//--> document ready
$(function() {
	
	function ZcoreItemsPlugin() {}
	
	//--> register as global
	$.ZIT = new ZcoreItemsPlugin();
	
	(function(_) {	
	
		$.extend(ZcoreItemsPlugin.prototype, {
			
			_type : '',
			
			_init : function() {
				this._createBody();
				this._create();
			},
			
			o : $('<div id="DesignerItems" class="zui-component" title="Items"></div>'),	
			
			_items : $('<items>'),
			
			T : undefined,
				
			selected : undefined,
			
			getSelectable : function() {
				var o = _.o.find('item').first();
				return o.length ? o : _.T.o;
			},			
							
			_createBody : function() {
				return this.o.appendTo('body'); 			
			},
			
			_appendItem : function(o) {
				var res = $('<item>', {
    		  			text : o.attr('value'),
						class : 'zui-' + _._type + ' ui-state-default'
					})
				 	.focus(function(event, parameter) {
						_.deselectAll();
						$(this).addClass('ui-state-active');					 		
						$.ZDS._focus(o);
						_.selected = $(this);
					})					
					.mousedown(function(event) {
						event.stopPropagation();
						$(this).triggerHandler("focus");
					})
					.change(function(event, v) {
						o.attr('value', v);
					});
				_._items.append(res);
				return res;
			},
					
			show : function(T, type, label) {
				_._type = type;
				_.T = T;
				_._items.html('');
				_.T.o.find('item[type="' + _._type + '"]').each(function() {
					_._appendItem($(this));
				});
				_.o.dialog('option', 'title', T.id() + ' (' + label + ')');
				_.o.dialog('open');
			},
			
			close : function() {
				_.o.dialog('close');
			},
			
			moveToTop : function(o) {
				setTimeout(function() {
					o.dialog('moveToTop');
				});	
			},
			
			deselectAll : function() {
				_._items.find('item').removeClass('ui-state-active').addClass('ui-state-default');
			},
			
			_create : function() {
				//--> items
				_._items.appendTo(_.o);
				//--> dialog
				_.o
					.dialog({
						autoOpen : false,
						height : 300,
						width : 200,
						closeOnEscape : false,
						modal : false,
						resizable : true					
					})
					.addClass('zui-scroll-off')
					.dialog('option', 'position', [90, 90])
					.on('mousedown', function(event) {
						event.stopPropagation();
						_.moveToTop($(this));							
					});
				//--> widget
				var w = this.o.dialog('widget');
				w.find('.ui-dialog-titlebar').on('mousedown', function(event) {
					_.moveToTop($(this).next());
				});
				w.find('.ui-resizable-handle').css('background-image', 'url("")');	
				//--> context popup
				_.o.contextPopup({
		            items : [
				              {
				            	  label : 'Add',
				            	  icon : 'css/images/plus-white.png',
				            	  action : function() {
					            		_.deselectAll();
					            		_.selected = undefined;
					            		_._appendItem($.ZDS.generateComponent(_.T, {type : _._type}, false).o)
					            			.triggerHandler("focus");
				            	  } 
				              }			              
				            ]
				});	
			}
				
		});
		
		_._init();
	
	})($.ZIT);
	
});	