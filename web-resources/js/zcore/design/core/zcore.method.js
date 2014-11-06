/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {	
								
	_.clazz({
		
		name : 'method',
		
		inherit : 'action',
				
		body : function(parent, name, params) {	
		
			/*
			 * ----------------------------------------------------------------------
			 * 								extends parameters
			 * ---------------------------------------------------------------------- 
			 */	
			
			$.extend(this, $.extend({	
				
				advice : 'around',
				
				method : undefined,
				
				_queue : [],
				
				extend : function(params) {
					this.advice = params.advice || 'around';
					switch (this.advice) {
					case 'before':
						this._queue.unshift(params.method);
						break;
					case 'around':
						this._queue = [params.method];
						break;
					case 'after':
						this._queue.push(params.method);
						break;							
					}								
				},	
								
				abstractMethod : function(args) {
					var res = undefined;
					for (var item in this._queue)	
						res = this._queue[item].apply(this, args);
					return res;
				}
				
			}, params));
			
			//--> register in queue
			if (this.method !== undefined && $.isFunction(this.method))
				this._queue.push(this.method);
			
		}
		
	});
		
})(jQuery, jQuery.ZOF);