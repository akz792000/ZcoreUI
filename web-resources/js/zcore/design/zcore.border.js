/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'border',
		
		inherit : 'component',
		
		body : function(o) {
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.palette = 'Standard';
			
			this.append = false;
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */
			
			this.properties({
				
				/*
				 * override
				 */

				__null__ : ['align', 'direction', 'tabindex', 'title', 'value'],
							
				height : 24,
				
				width : 100,			
				
				/*
				 * new
				 */
						
	  			border : $.extend(_.defaultProperty('enum', 0, ['all', 'top', 'bottom', 'left', 'right']), {
					set : function(v) {	
						var 
							T = this.__,
							name = this.name,
							cls = T.o.attr("class").split(" ").map(function(item) {
							    return item.indexOf("zui-" + name + "-") === -1 ? item : "";
							});
						cls.push("zui-" + name + "-" + v);
						T.o
							.attr(name, v)
							.attr("class", cls.join(" "));
					}	
				})	
				
			});			
			
		}
					
	});
	
})(jQuery, jQuery.ZOF);