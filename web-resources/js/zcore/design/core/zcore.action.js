/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {	
			
	_.clazz({
		
		name : 'action',
				
		body : function(parent, name, params) {
		
			$.extend(this, $.extend({	
				
				__ : parent,
				
				name : name,
				
				eventBase : true,
			
				_eventHandler : undefined, 
				
				event : function(v) {
					this._eventHandler = v;
				},
			
				abstractMethod : undefined, 
				
				signal : function(args) {
					if (this.eventBase && $.isFunction(this._eventHandler))
						this._eventHandler.apply(this, args);			
				},
				
				execute : function(args) {
					var result = this.abstractMethod(args);	
					this.signal(args);
					return result;
				}		
				
			}, params));
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);