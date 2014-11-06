/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($) {
	
	function ZcoreTreeInvokerPlugin() {}
	
	$.extend(ZcoreTreeInvokerPlugin, {
		
		//--> static method
		checkbox : function(o, theme, resourcePath, T) {
			o.jstree({
				/*
			     * core
			     */	
				core: {
					rtl : T.orientation()[0] === 'rtl',
				    strings : {
						new_node : "...",
						loading : $.ZAP.message.get($.ZAP.locale, 'loading')	
				    },							
				},
				/*
			     * themes
			     */
				themes: {
		            theme: theme,
		            url: resourcePath + '/style.css'
			    },
			    /*
			     * types
			     */
			    types: {
			    	valid_children : [ "root" ],
			    	types: {
			    		root: {
							icon: {
		                        image : resourcePath + '/drive.png'
		                    }		    		
			    		},
			    		"default": {
							icon: {
		                        image : resourcePath + '/folder.png'
		                    }			    		
			    		},
			    		without_children: {
							icon: {
		                        image : resourcePath + '/file.png'
		                    }			    		
			    		}
			    	}
			    },
				/*
			     * json_data
			     */		    
			    json_data : {
			    	ajax : {
			    		url : T.service(),
			    		contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
		                data : function (n) {
		                	var m = T.master();
		                	m = (m === undefined) ? 0 : m;
		                	m = (m == '') ? 0 : m;
		                    return {
		                        operation : "get_all_children",
		                        master : n.attr ? n.attr("master") : m,
		                        id : n.attr ? n.attr("id") : 0
	                    	};
	                	}	    		
			    	}
			    },
			    /*
			     * checkbox
			     */
			    checkbox: {
			    	two_state : false				    	
			    },					    
			    /*
			     * plugins
			     */
				plugins : ['ui', 'core', 'themes', 'types', 'json_data', 'checkbox']
			});					
		},
		
		crud : function(o, theme, resourcePath, T) {
			o.jstree({
				/*
			     * core
			     */	
				core: {
					rtl : T.orientation()[0] === 'rtl',
				    strings : {
						new_node : "...",
						loading : $.ZAP.message.get($.ZAP.locale, 'loading')	
				    },							
				},
				/*
			     * themes
			     */
				themes: {
		            theme: theme,
		            url: resourcePath + '/style.css'
			    },
			    /*
			     * types
			     */
			    types: {
			    	valid_children : [ "root" ],
			    	types: {
			    		root: {
							icon: {
		                        image : resourcePath + '/drive.png'
		                    }		    		
			    		},
			    		"default": {
							icon: {
		                        image : resourcePath + '/folder.png'
		                    }			    		
			    		},
			    		without_children: {
							icon: {
		                        image : resourcePath + '/file.png'
		                    }			    		
			    		}
			    	}
			    },
				/*
			     * json_data
			     */		    
			    json_data : {
			    	ajax : {
			    		url : T.service(),
			    		contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
		                data : function (n) {
		                	var m = T.master();
		                	m = (m === undefined) ? 0 : m;
		                	m = (m == '') ? 0 : m;
		                    return {
		                        operation : "get_children",
		                        master : n.attr ? n.attr("master") : m,
		                        id : n.attr ? n.attr("id") : 0
	                    	};
	                	}	    		
			    	}
			    },
			    /*
			     * contextmenu
			     */
			    contextmenu : {
			    	items : function(node) {
						var menuitems = {
								createItem : {
									label : $.ZAP.message.get($.ZAP.locale, 'persist'),
									action : function(e) { T.signal('persist', e); }
								},
								renameItem : {
									label : $.ZAP.message.get($.ZAP.locale, 'merge'),
									action : function(e) { T.signal('merge', e); }
								},
								deleteItem : {
									label : $.ZAP.message.get($.ZAP.locale, 'remove'),
									action : function(e) { T.signal('remove', e); }
								}
						};	
						switch (node.attr('rel')) {
							case "root" :
								return {
									createItem : menuitems.createItem
								};				
								break;			
							case "default" :
								return {
									createItem : menuitems.createItem,
									renameItem : menuitems.renameItem
								};				
								break;	
							default :
								return {
									createItem : menuitems.createItem,
									renameItem : menuitems.renameItem,
									delteItem : menuitems.deleteItem 					
								};
								break;
						}
			    	}
				},
			    /*
			     * plugins
			     */
				plugins : ['ui', 'core', 'themes', 'types', 'json_data', 'crrm', 'contextmenu']
			});						
		}			
		
	});

	/*
	 * register as jQuery function
	 */
	$.fn.ZcoreTreeInvoker = function(key, method, T) {
		switch (key) {
		case 'show':
			var 
				theme = (T.orientation()[0] === 'ltr') ? 'default' : 'default-rtl',
				resourcePath = "/js/zcore/util/tree/themes/" + theme;		
			ZcoreTreeInvokerPlugin[method]($(this), theme, resourcePath, T);
			break;
		case 'option':
			switch (method) {
			case 'set':
				$(this).bind("loaded.jstree", function (event, data) {
					var nodeSelected = T.value();			
					for (var i = 0; i < nodeSelected.length; i++)
						if (nodeSelected[i] !== '')
							$.jstree._focused().check_node('#' + nodeSelected[i]);						
				});
				return $(this);
			case 'get':
				var res = {
					val : [],
					dsc : []
				};
				$(this).find('.jstree-checked').each(function(){
					var node = $.jstree._focused()._get_parent('#' + $(this).attr('id'));
					if (node === -1 || !node.hasClass('jstree-checked')) {
						res.val.push($(this).attr('id'));
						res.dsc.push($(this).find('a:first').text());
					}
				});
				return res;
			default:
				break;
			}
		default:
			break;
		}
		return $(this);
	};
	
})(jQuery);