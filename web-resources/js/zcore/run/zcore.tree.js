/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'tree',
		
		inherit : 'ajax',
		
		body : function(o) {	
			
			/*
			 * ----------------------------------------------------------------------
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/js/zcore/util/tree/',
					files : ['jquery.jstree.js']
			};				
				
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
				
				height : 250,	
				
				width : 200,
				
				value : {
					get : function() {
						return "";
					},
					set : function() {
						//--> nop
					}
				},
				
				/*
				 * new
				 */
							
				master : _.defaultProperty('int', 0)
				
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
				
				render : {
					method : function() {						
						var T = this.__;
						T.o
							.addClass('ui-widget ui-state-default')
							.ZcoreTreeInvoker('show', 'crud', T);
					}
				},
				
				/*
				 * new
				 */
				
				persist : {
					//--> event
				},
				
				merge : {
					//--> event
				},
				
				remove : {
					//--> event
				},
				
				refresh : { 
					method : function(val, func) {
						var T = this.__;
						if (val) {
							var name = T.id();
							T.o.unbind('refresh.jstree').bind('refresh.jstree', function() {
								$.jstree._reference(name).open_all(-1);
								if ($.isFunction(func))
									func();
				      		});
						}
						T.o.jstree('refresh', -1);
					}
				},
				
				persist_node : { 
					method : function(v) {
						var tree = $.jstree._focused();
						if (tree._is_loaded('#' + v.parent)) 
							tree.create_node('#' + v.parent, 'last', {data: v.name, attr:{id: v.id, rel: 'without_children'}}, null, false);
						if (tree._get_node('#' + v.parent).attr('rel') == 'without_children')
							tree._get_node('#' + v.parent).attr('rel', 'default');
						tree.open_node('#' + v.parent);	
					}
				},			
				
				merge_node : { 
					method : function(v) {
						$.jstree._focused().rename_node('#' + v.id, v.name);
					}
				},
				
				remove_node : { 
					method : function(v) {
						var 
							tree = $.jstree._focused(),
							parent = tree._get_parent('#' + v.id);
						if ((tree._get_children('#' + parent.attr('id')).length == 1) && (parent.attr('id') != '1'))
							parent.attr('rel', 'without_children');						
						tree.delete_node('#' + v.id);
					}
				}				
			
			});			
			
		}
	
	});
	
})(jQuery, jQuery.ZOF);