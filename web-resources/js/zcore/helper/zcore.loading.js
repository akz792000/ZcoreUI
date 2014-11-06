/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
		
	_.clazz({
		
		name : 'loading',
		
		body : function() {	
		
			$.extend(this, {
				
				_init : function() {
					this._id = "ZcoreLoading_";
				},
				
				_info : function(c) {
					var id = this._id.concat(c === undefined ? "Body" : c.name),
						o = $(window),
						p = $('body');					
					if (c !== undefined && c.o !== undefined) {
						o = c.o;
						if (c instanceof $.ZOF.form) 
							o = o.parent();		
						p = o.parent();
					}				
					return {						
						id : id,
						p : p, 
						o : o, 
						loading : p.find('#' + id)
					};				
				},
				
				_image : function(v) {
					if (v < 50000) return 32;
					if (v < 300000) return 48;
					if (v < 700000) return 64;
					return 128;
				},
				
				show : function(c) {
					var info = this._info(c); 
					if (info.loading.length) 
						info.loading.attr('cnt', parseInt(info.loading.attr('cnt')) + 1);
					else {
						var height = info.o.outerHeight(),
							width = info.o.outerWidth();
						info.loading = $('<div>', {
										id : info.id,
										name : info.id,
										cnt : 0,
										'class' : 'zcore-loading zcore-loading-image-' + this._image(height * width),
										tabindex : -1 //--> focus able
								})	
								.appendTo(info.p)
								.offset(info.o.offset() || {
									top : 0,
									left : 0
								})						
								.height(height)
								.width(width)
								.focus();
					}					
				},
				
				hide : function(c) {
					var info = this._info(c);
					if (parseInt(info.loading.attr('cnt')) === 0)
						info.loading.remove();
					else
						info.loading.attr('cnt', parseInt(info.loading.attr('cnt')) - 1);
				}
				
			});
			
			this._init();
			
		}
		
	});
		
})(jQuery, jQuery.ZOF);