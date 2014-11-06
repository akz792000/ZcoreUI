/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'grid',
		
		inherit : 'ajax',
		
		body : function(o) {
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.palette = 'Ajax';		
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */
			
			this.properties({
				
				/*
				 * override
				 */
				
				readonly : null,
				
				height : 130,
				
				width : 380,		
				
				/*
				 * new
				 */			
				
				limitPage : _.defaultProperty('int', 10),
				
				multiSelected : _.defaultProperty('boolean'),							
				
				showNumber : _.defaultProperty('boolean'),
				
				items : _.defaultProperty('item', 'gridItem'),
				
				filterShow : _.defaultProperty('boolean'),
				
				sortShow : _.defaultProperty('boolean'),
				
				orderShow : _.defaultProperty('boolean'),	
				
				persistCaption : _.defaultProperty(),
				
				mergeCaption : _.defaultProperty(),
				
				removeCaption : _.defaultProperty(),
				
				orderByItem : _.defaultProperty(),				
				
				orderByItemSort : _.defaultProperty('enum', 0, ['asc', 'dsc']),
				
				refreshOnRender : _.defaultProperty('boolean', true)
				
			});			
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 methods
			 * ---------------------------------------------------------------------- 
			 */	
			
			this.methods({		
				
				/*
				 * override
				 */			
			
				finalize : {
					advice : 'before',
					method : function() {
						var T = this.__;
						T.addPopup({
							label : 'items',
							icon : 'css/images/category-item.png',
							action : function() {
								$.ZIT.show(T, 'gridItem', this.label);
							} 
						});
					}			
				}
					
			});			
		
		}
	
	});
	
})(jQuery, jQuery.ZOF);