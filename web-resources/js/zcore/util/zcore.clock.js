/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($) {
	
	function ZcoreClockPlugin() {}
	
	$.extend(ZcoreClockPlugin, {
		
		//--> static method
		run : function(o) {
			var timerFunc = function(o) {
				if (o.length) {
					var v = o.text(),
						h = parseInt(v.substr(0, 2), 10),
						m = parseInt(v.substr(3, 2), 10),
						s = parseInt(v.substr(6, 2), 10);
					s += 1;
					if (s == 60) {
						s = 0;
						m += 1;
						if (m == 60) {
							m = 0;
							h += 1;
							if (h == 24)
								h = 0;							
						};					
					};
					o.text(
						h.toString().lpad("0", 2) + ":" + 
						m.toString().lpad("0", 2) + ":" +
						s.toString().lpad("0", 2)
					);
					//--> recall
					setTimeout(function() {
						timerFunc(o);
					}, 1000);
				}
			};			
			timerFunc(o);
		}
		
	});

	/*
	 * register as jQuery function
	 */
	$.fn.ZcoreClock = function() {
		ZcoreClockPlugin.run($(this));		
	};
	
})(jQuery);