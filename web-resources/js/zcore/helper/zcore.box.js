/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
		
	_.clazz({
		
		name : 'box',
		
		body : function() {		
		
			$.extend(this, {
							
				_init : function() {
					this._o = $('<div id="ZcoreBox"><p><b style="margin:2px"></b></p></div>')
						.appendTo('body')
						.dialog({
							autoOpen : false, 
							modal : true, 
							resizable : false, 
							draggable : true,	
							closeOnEscape : false,
							width : 'auto',
							height : 'auto'							
						});
					//--> widget
					this._w = this._o.dialog('widget');
					this._w.find('.ui-dialog-titlebar').find('.ui-dialog-titlebar-close').remove();	
				},
				
				_box : function(title, msg, btns, focus) {						
					var	buttons = {};				
					for (var i = 0; i < btns.length; i++)
						buttons[btns[i].label] = btns[i].click;						
					//--> show
					this._o.find('b').html(msg);
					this._o
						.dialog('option', 'title', title)
						.dialog('option', 'buttons', buttons)
						.dialog('open');
					//--> centeralize title and buttons	
					this._w.find('b')
						.position({
							"my" : "center center",
							"at" : "center center",
							"of" : this._o
						});
					//--> set button focus and blur
					var btnset = this._o.next(); 
					btnset.find('button').each(function() {
						$(this)	
							.blur(function() {
								$(this).removeClass('zui-state-hover');
							})
							.focus(function() {
								$(this).addClass('zui-state-hover');
							});
					});
					//--> focus it
					(focus !== undefined 
							? btnset.find("span:contains('" + this._message(focus) + "')").parent().focus() 
							: btnset.find('button:first')).focus(); 						
				},
				
				_message : function(v) {
					return $.ZAP.message.msg(v.toLowerCase());
				},
				
				show: function(title, msg, type, func, focus) {
					var btns = undefined;
					switch (type) {
					case 'MB_YESNO':
						btns = [
								{
									label : this._message('YES'), 
									click : function() {
										$(this).dialog('close');
										if (func !== undefined) {
											if ($.isFunction(func)) 
												func();
											else if ($.isFunction(func['YES']))
												func['YES']();
										}
									}
								},
								{
									label : this._message('NO'),
									click : function() {
										$(this).dialog('close');
										if (func !== undefined) {
											if ($.isFunction(func['NO']))
												func['NO']();
										}
									}
								}
							];			
							break;
					case 'MB_YES':
						btns = [
								{
									label : this._message('YES'),
									click : function() {
										$(this).dialog('close');
										if (func !== undefined) {
											if ($.isFunction(func)) 
												func();
											else if ($.isFunction(func['YES']))
												func['YES']();
										}
									}
								}
							];			
							break;						
					case 'MB_OKCANCEL':
						btns = [
								{
									label : this._message('OK'), 
									click : function() {
										$(this).dialog('close');
										if (func !== undefined) {
											if ($.isFunction(func)) 
												func();
											else if ($.isFunction(func['OK']))
												func['OK']();
										}
									}
								},
								{
									label : this._message('CANCEL'),
									click : function() {
										$(this).dialog('close');
										if (func !== undefined) {
											if ($.isFunction(func['CANCEL']))
												func['CANCEL']();
										}
									}
								}
							];			
							break;
					case 'MB_OK':
						btns = [
								{
									label : this._message('OK'), 
									click : function() {
										$(this).dialog('close');
										if (func !== undefined) {
											if ($.isFunction(func)) 
												func();
											else if ($.isFunction(func['OK']))
												func['OK']();
										}
									}
								}
							];			
							break;						
					default:
						btns = [
								{
									label : this._message('OK'), 
									click : function() {
										$(this).dialog('close');
									}
								}
							];						
					}
					this._box(title, msg, btns, focus);
				},
				
				destroy : function() {
					this._o.dialog('destroy').remove();
				}						
							
			});
			
			this._init();
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);