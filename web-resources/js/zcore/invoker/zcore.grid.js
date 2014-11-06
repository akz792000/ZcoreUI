/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($) {
	
	function ZcoreGridInvokerPlugin() {}
	
	$.extend(ZcoreGridInvokerPlugin, {		
		
		//--> static method
		grid : function(T, G, event) {
			var 
				O = {},
				P = T.params;
			//--> items
			O.id = P.id,
			O.message = $.ZAP.message;
			O.colsWidth = [];
			O.colsCaption = [];
			O.hintsLength = [];
			O.filtersShow = [];	
			O.sortsShow = [];
			O.ordersShow = [];					
			$.each(P.items, function(k, v) {
				O.colsWidth.push(v[0]);
				O.colsCaption.push(v[1]);
				O.hintsLength.push(v[2]);
				O.filtersShow.push(v[3]);
				O.sortsShow.push(v[4]);
				O.ordersShow.push(v[5]);
			});
			O.colsStyle = [];
			for (var i = 0; i < O.colsWidth.length; i++) {
				if (O.colsWidth[i] == 0)
					O.colsStyle.push('display: none;');
				else
					O.colsStyle.push('');
			}					
			//--> grid
			O.cols = G[0]; 
			O.titles = O.colsCaption; 
			O.filterColumns = G[1];
			//--> set columns type from filter columns
			O.colsType = [];
			for (var i = 0; i < O.filterColumns.length; i++) {
				if (O.filterColumns[i]) {
					O.colsType.push(O.filterColumns[i].type);					
					//--> if have client then load from global
					if (O.filterColumns[i].client !== undefined) {
						O.filterColumns[i].data = $.ZAP.reverse($.ZAP.global(O.filterColumns[i].client)); 
					}
					//--> translate
					if (O.filterColumns[i].type === 'select') {
						for (var d in O.filterColumns[i].data) {
							O.filterColumns[i].data[d] = $.ZAP.message.translate('${' + O.filterColumns[i].data[d] + '}'); 
						}
					}
				} else {
					O.colsType.push(null);	
				}
			}	
			//--> others
			O.height = P.height;
			O.width = P.width;
			O.title = P.title;
			O.limitPage = P.limitPage;
			O.source = T.service();
			O.sourceData = undefined;
			O.locale = $.ZAP.locale;
			O.direction = T.orientation()[0];
			O.multiSelected = P.multiSelected;
			O.refreshOnRender = P.refreshOnRender;
			O.filterShow = P.filterShow;
			O.sortShow = P.sortShow;
			O.orderShow = P.orderShow;
			O.persistCaption = P.persistCaption;
			O.mergeCaption = P.mergeCaption;
			O.removeCaption = P.removeCaption;
			O.showNumber = P.showNumber;	
			O.orderByItem = P.orderByItem;
			O.orderByItemSort = P.orderByItemSort;
			O.finalize = $.proxy(function(options) { 
				this.invoke('method', 'prepare', 'execute', [options]);
				return true;
			}, T);
			//--> events
			if (event) {
				O.iconCallback = P.iconCallback;
				O.persistCallback = $.proxy(function(e) { this.signal('persistClick', e); }, T);
				O.mergeCallback = $.proxy(function(e) { this.signal('mergeClick', e); }, T);
				O.removeCallback = $.proxy(function(e) { this.signal('removeClick', e); }, T);
				O.rowClickCallback = $.proxy(function(e) { this.signal('rowClick', e); }, T);
				O.rowAllClickCallback = $.proxy(function(e) { this.signal('rowAllClick', e); }, T);
				O.refreshCallback = $.proxy(function(e) { this.signal('refreshClick', e); return T;}, T);
				O.hoverCallback = $.proxy(function(e) { this.signal('hoverClick', e); }, T);
			}
			return O;
		}
				
	});

	/*
	 * register as jQuery function
	 */
	$.fn.ZcoreGridInvoker = function(key, T) {
		var options = {};
		switch (key) {
		case 'grid':
			options = ZcoreGridInvokerPlugin['grid'](T, T.params.data, true);
			break;
		case 'lovgrid':
			options = ZcoreGridInvokerPlugin['grid'](T, T.params.data[1], false);
			options.height = T.params.lovHeight;
			options.width = T.params.lovWidth;
			break;		 				
		default:
			break;
		}
		return $(this).ZcoreGrid('show', options);
	};
	
})(jQuery);