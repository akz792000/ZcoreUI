/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'tabPage',
		
		inherit : 'component',
		
		body : function(o) {			
							
			/*
			 * ----------------------------------------------------------------------
			 * 								 properties
			 * ---------------------------------------------------------------------- 
			 */
			
			this.properties({
				
				/*
				 * override
				 */
				
				__null__ : ['tabindex', 'height', 'width', 'top', 'left', 'position', 'align', 'cssClass', 'cssStyle'],
				
				id : {
					before : function(v) {
						var T = this.__;
						T.widget.find('a').attr('href', "#" + v);
						T.parent.o.tabs('refresh');
					}
				},
				
				value : {
					get : function() {
						return this.__.widget.find('a').text();
					},
					set : function(v) {
						this.__.widget.find('a').text(v);
					}	
				},				
				
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
				
				beforeModelize : {
					method : function() {
						var T = this.__;
						T.parent.o.tabs("option", 'active', T.widget.index());		
					}
				},				
				
				refresh : { 				
					method : function() {
						var
							T = this.__,
							parent = T.parent;
						T.o.width(parent.width());
						T.o.height(
								parent.height() - parent.widget.height() -
								//--> top
								parseInt(parent.widget.css('border-top-width')) - parseInt(parent.o.css('padding-top')) -
								//--> bottom
								parseInt(parent.widget.css('border-bottom-width')) - parseInt(parent.o.css('padding-bottom')) 
						);
					}			
				},
				
				remove : {
					advice : 'before',
					method : function() {
						var T = this.__;
						T.widget.remove();
						T.parent.o.tabs("refresh");
					}
				},
							
				render : {
					advice : 'before',
					method : function() {
						var T = this.__;
						T.widget = $('<li>', { 
							html : '<a href="#:id">:id</a>'.replace(/:id/g, T.id())
						}).appendTo(T.parent.widget);
						//--> add tab menu
						T.refresh();
						T.parent.o.tabs("refresh");
						T.parent.o.tabs("option", "active", T.widget.index());
						//--> droppable
						T.o.droppable({
							accept : '.zui-palette-icon',
							greedy : true,
							drop : function(event, ui) {
								$.ZDS.generateComponent(T, ui, true);									
							}
						});
					}			
				}			
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);