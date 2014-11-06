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
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/js/zcore/util/grid/',
					files : ['zcore.grid.css', 'zcore.grid.js']
			};			
		
			/*
			 * ----------------------------------------------------------------------
			 * 								 initialize
			 * ---------------------------------------------------------------------- 
			 */	
			
			this._setInvoker = function() {
				return {
					method : function() {
						return this.__.o.ZcoreGrid.apply(this.__.o, $.merge([this.name], arguments)); 				
					}
				};
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
				
				height : {
					defVal : 130,
					after : function(v) {
						this.__.o.ZcoreGrid('height', v);
					}
				},
				
				width : 380,			
											
				value : {
					get : function(v) {
						return this.__.getSelectedRows(v);
					}
				},						
				
				/*
				 * new
				 */			
				
				limitPage : _.defaultProperty('int', 10),
				
				multiSelected : _.defaultProperty('boolean'),	
				
				showNumber : _.defaultProperty('boolean', true),				
				
				items : {
					type : 'array',
					get : function() {
						//--> nop
					},
					set : function(v) {
						//--> nop
					}					
				},
								
				filterShow : _.defaultProperty('boolean'),
				
				sortShow : _.defaultProperty('boolean'),
				
				orderShow : _.defaultProperty('boolean'),	
				
				persistCaption : _.defaultProperty(),
				
				mergeCaption : _.defaultProperty(),
				
				removeCaption : _.defaultProperty(),
				
				orderByItem : _.defaultProperty(),				
				
				orderByItemSort : _.defaultProperty('string', 0, ['asc', 'dsc']),
				
				refreshOnRender : _.defaultProperty('boolean')			
							
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
						T.o.ZcoreGridInvoker('grid', T);
					}			
				},
				
				getMasterValue : {
					method : function(component, argument) {	
						var master = this.__.owner.elements[component];
						switch (master.type()) {
						case 'grid':
							var rows = master.getHoverRows();
							for (var item in master.getItems()) 
								if (master.getItems()[item] == argument)
									break;
							return ((rows[0]) ? ((rows[0][item]) ? rows[0][item] : '') : '');
						default:
							return master.value().split(',')[0];
						}
					}
				},			
				
				getSelectedRows : this._setInvoker(),	
				
				getSelectedCols : this._setInvoker(),		
				
				getHoverRows : this._setInvoker(),
				
				getHoverCols : this._setInvoker(),		
				
				getSelectedRowsId : this._setInvoker(),
				
				setSelectedRowsId : this._setInvoker(),
				
				getTotalCount : this._setInvoker(),
				
				getHoverRowsId : this._setInvoker(),
				
				getItems : this._setInvoker(),
				
				getTitle : this._setInvoker(),
				
				refresh : this._setInvoker(),	
				
				addAction : {
					method : function(v) {
						var P = this.__.params;
						if (P.iconCallback === undefined)
							P.iconCallback = [];
						P.iconCallback.push(v);
					}
				},			
				
				persistClick : {
					//--> event
				},
				
				mergeClick : {
					//--> event
				},
				
				removeClick : {
					//--> event
				},
				
				rowClick : {
					//--> event
				},
				
				refreshClick : {
					//--> event
				},
				
				rowAllClick : {
					//--> event
				},
				
				hoverClick : {
					//--> event
				},
							
				serviceParams : {
					event : function(v) {
						//--> add new method when it call from grid's finalize event
						this.__.methods({
							prepare : {
								method : function(options) {
									var serviceParams = v(), send = false;
									for (var k in serviceParams) {
										if ((typeof serviceParams[k] === 'array') && (serviceParams[k].length)) {
											send = true;
											break;
										} else if ((typeof serviceParams[k] === 'object') && (!$.isEmptyObject(serviceParams[k]))) {
											send = true;
											break;
										}
									}
									if (send) {
										options.sourceData = { serviceParams : JSON.stringify(v()) };
									}
								}
							}
						});
					}					
				}				
			
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);