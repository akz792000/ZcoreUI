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
				
				value : {
					get : function() {
						return this.__.widget.find('a').text();
					},
					set : function(v) {
						this.__.widget.find('a').text(v);
					}	
				},	
				
				disabled : {
					refresh : 'finalize',
					after : function(v) {
						var 
							T = this.__,
							items = T.parent.o.tabs("option", "disabled"),
							makeArray = function(cnt) {
								var res = [];
								for (var i = 0; i < cnt; i++)
									res.push(i);
								return res;	
							};	
						//--> disabled component
						_.disabledChild(T, v);
						//--> disabled tab menu	
						if (typeof items === 'boolean')
							items = items ? makeArray(T.parent.widget.find('li').length) : [];
						var
							index = T.widget.index(),
							pos = $.inArray(index, items);
						if (v) {
							if (pos === -1)
								items.push(index);
						} else {	
							if (pos !== -1)
								items.splice(pos, 1);
						}
						T.parent.o.tabs("option", 'disabled', items);
					}
				}				
				
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
							html : '<a href="#:id">:id</a>'.replace(/:id/g, T.id()),
						});
						//--> add tab menu
						T.parent.widget.append(T.widget);							
						T.refresh();
						T.parent.o.tabs("refresh");
						T.parent.o.tabs("option", "active", T.widget.index());
					}			
				}			
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);