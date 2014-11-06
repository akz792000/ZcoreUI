/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
		
	_.clazz({
		
		name : 'bar',
		
		body : function() {	
		
			$.extend(this, {
				
				_init : function() {
					this._o = $('<div id="ZcoreBar" class="ui-widget ui-widget-content ui-corner-all ui-state-highlight ui-priority-primary"><div class="ui-widget-content ui-corner-all"></div><p></p></div>')
						.appendTo('body');
					this._func = undefined;
				},
		
				show : function(type, msg, time) {
					var orientation = $.ZAP.orientation()[1];
					this.hide();
					var 
						p = this._o.find('p'),
						div = this._o.find('div');					
					p.text(msg);
					//--> set orientation
					p.css('padding-' + orientation, '32px');
					div.css(orientation, '8px');
					switch (type) {
						case 'success':
							div.html('<span class="ui-icon ui-icon-circle-check"></span>');				
							break;	
						case 'error':
							div.html('<span class="ui-icon ui-icon-circle-close"></span>');
							break;
					}
					var _t_ = this;
					this._o
						.css('top', $('html').scrollTop())				
						.show('bounce', {}, 500, function() {   
							_t_._func = setTimeout(function() {
								_t_._hide();
							}, 
							(time === undefined) ? 2500 : time);        	
					});
				},
				
				_hide : function() {
					this._o.removeAttr('style').hide().fadeOut();				
				},
			
				hide : function() {
					if (this._func !== undefined) {
						clearTimeout(this._func);
						this._func = undefined;
					}
					this._hide();
				},
				
				destroy : function() {
					this._o.remove();
				}
				
			});
			
			this._init();
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);