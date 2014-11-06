/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
		
	_.clazz({
		
		name : 'hint',
		
		body : function() {	
		
			$.extend(this, {
				
				_init : function() {
					this._o = 
						$('<div id="ZcoreHint" class="ui-state-highlight ui-priority-primary"><span class="ui-icon ui-icon-triangle-1-n"></span><div></div></div>')
							.appendTo('body');	
				},
		
				show : function(o, msg) {
					var t = this;
					o
						.bind('mouseenter.ZcoreHint', function() {
							var 
								pos = $(this).offset(),
								d = t._o.find('div'),
								direction = $(this).css('direction');
							pos.top = pos.top + $(this).outerHeight();
							d.html(msg);
							t._o
								.css('direction', direction)
								.css(pos)
								.show();
							if (direction === 'rtl')
								pos.left = pos.left - (d.outerWidth() - $(this).outerWidth());
							t._o.css(pos);				        	
						})
						.bind('mouseleave.ZcoreHint', function() {
							t._o.hide(); 
						});	
				},
			
				hide : function(o) {
					this._o.hide(); 
					o 
						.unbind('mouseenter.ZcoreHint')
						.unbind('mouseleave.ZcoreHint');
				},
				
				destroy : function() {
					this._o.remove();
				}			
				
			});
			
			this._init();
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);