/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
		
	_.clazz({
		
		name : 'dialog',
		
		body : function() {
		
			$.extend(this, {
				
				_init : function() {
					this._o = 
						$('<div>', { id : "ZcoreDialog"})
							.appendTo('body')
							.dialog({
								autoOpen : false, 
								modal : true, 
								resizable : false, 
								draggable : true,	
								closeOnEscape : false,
								minHeight: 250,
								minWidth: 300							
							});
						//--> widget
						this._o.dialog('widget')
							.find('.ui-dialog-titlebar')
								.find('.ui-dialog-titlebar-close').remove();	
				},
				
				show : function(params) {	
					if (params !== undefined) {
						//--> widget
						var widget = $('<div>', {
									id : 'ZcoreDialog_' + params.id, 						
									tabindex : 0,
									style : params.style,
									'class' : params.cssClass
							})
							.appendTo(this._o.empty());
						if ($.isFunction(params.show))	
							params.show(widget);
						//--> btn
						var btn = function(caption) {
							var res = {};
							res[$.ZAP.message.msg(caption)] = function() {
								if ($.isFunction(params[caption])) 
									params[caption](widget);							
							};			
							return res;
						};
						//--> show
						this._o
							.dialog('option', 'title', params.title)
							.dialog('option', 'buttons', $.extend({}, 
								btn('ok'),
								btn('clear'),
								btn('cancel')
							 ))			
							.dialog('option', 'height', 'auto')
							.dialog('option', 'width', 'auto')
							.dialog('option', 'position', 'center')
							.dialog('open');
					}
				},
				
				close : function() {
					this._o.dialog('close');
				},
				
				destroy : function() {
					this._o.dialog('destroy').remove();
				}						
							
			});
			
			this._init();
		
		}
	
	});
	
})(jQuery, jQuery.ZOF);