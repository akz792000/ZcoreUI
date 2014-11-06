/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

//--> document ready
$(function() {
	
	function ZcoreInspectorPlugin() {}
	
	//--> register as global
	$.ZIN = new ZcoreInspectorPlugin();
	
	(function(_) {
	
		$.extend(ZcoreInspectorPlugin.prototype, {
			
			_init : function() {
				this._createBody();
				this._create();
			},			
			
			o : $('<div id="DesignerInspector" class="zui-component" title="Object Inspector"></div>'),
			
			prepareValues: function(o, items) {
				var res = {};
				for (var item in items)
					if ($.isFunction(o[items[item]]))
						res[items[item]] = o[items[item]]();
				return res;
			},
			
			setValues : function(items) {		
				for (var item in items)
					this.o.find('#' + item).val(items[item]);
			},		
			
			_changeValue : function(o) {
				var oldVal = o.val(),
					c = $.ZDS.getElement($.ZDS.selected);
				//--> get object value as string
				oldVal = oldVal != undefined ? oldVal.toString() : '';
				c[o.attr('id')](oldVal);
				var	newVal = c[o.attr('id')]().toString();			
				if (oldVal != newVal)
					o.val(newVal);			
			},		
			
			_renderMultiSelect : function() {
				var renderStr = '';
				$.ZDS.selected.each(function() { 
					renderStr += '<tr><td align="center" class="ui-widget-header"><b><label>' +  $(this).attr('id') + '</label></b></td>';
				});
				//--> render
				this.o.html('<div id="DesignerInspectorTab"><table>' + renderStr + '</table></div>');
				this.o.find('td')
					.click(function() {
						$.ZDS._focus($.ZDS.o.find('#' + $(this).find('label').html()), true);
					})
					.hover(
						function() {
							$(this).addClass('ui-state-highlight');
						},
						function() {
							$(this).removeClass('ui-state-highlight');
						}
		  			);
			},
			
			_renderSingleSelect : function() {
				var element = $.ZDS.getElement($.ZDS.selected),
				 	query = '', propertyQuery = '', eventQuery = '';
				//--> properties
				for (var item in element)	{	
					query = '';
					//--> instance of property
					if (element[item] instanceof $.ZOF.property && element[item].state !== 'hidden') {
						//--> initialize
						query = 
							'<tr>' + 
							'<td align="center" class="zui-inspector-td ui-widget-header"><b><label>:id</label></b></td>' + 
							'<td ' + (!(element[item].state !== 'disabled' && $.isFunction(element[item].expression)) ? 'colspan="2"' : '') + 'class=":classVal">:knd</td>' + 
							(element[item].state !== 'disabled' && $.isFunction(element[item].expression)  
								? '<td align="center" ' + (element[item].expression() !== undefined ? (element[item].partial() ? ' class="ui-state-highlight"' : ' class="ui-state-error"') : '') +
								  '><div id=":id" style="height:14px;width:14px;" type="expression"></div></td>'	
								: '') +
							'</tr>';
						//--> select value
						if (element[item].values instanceof Array) {
							if (element[item].type !== 'array')
								query = query.replace(':knd', '<select id=":id" class=":classVal" :disabled :readonly>:options</select>');
							else	
								query = query.replace(':knd', '<select id=":id" :disabled :readonly multiple="multiple">:options</select>');
							//--> set options
							var options = '';
							for (var valuesItem in element[item].values) {
								options += ('<option :selected value="' + element[item].values[valuesItem] + '">' + element[item].values[valuesItem] + '</option>');
								if (element[item].type !== 'array')
									options = options.replace(':selected', element[item].execute() == element[item].values[valuesItem] ? 'selected="selected"' : '');
								else
									options = options.replace(':selected', $.inArray(element[item].values[valuesItem], element[item].execute()) !== -1 ? 'selected="selected"' : '');
							}
							query = query.replace(':options', options);
						}
						//--> text value
						else {
							query = query.replace(':knd', "<input class=':classVal' id=':id' type='text' value=':value' title=':value' :disabled :readonly>")	
									.replace(/:value/g, element[item].execute().toString().replace(/'/g, "\'"));
						}
						propertyQuery += query
											.replace(/:id/g, element[item].name)
											.replace(/:classVal/g, (element[item].state === 'enabled') ? 'ui-state-active' : 'ui-state-hover')
											.replace(':readonly', (element[item].state == 'readonly') ? 'readonly="readonly"' : '')
											.replace(':disabled', (element[item].state === 'disabled') ? 'disabled="disabled"' : '');	
					}
				}
				//--> render
				var renderStr =  
					'<div id="DesignerInspectorTab">' +
					'<ul>' +
					'<li><a href="#DesignerInspectorTab-1">Properties</a></li>' +
					'<li><a href="#DesignerInspectorTab-2">Events</a></li>' +
					'</ul>' +
					'<div id="DesignerInspectorTab-1"><table id="DesignerInspectorTab-Properties" style="resize: both;">' + propertyQuery + '</table></div>' +
					'<div id="DesignerInspectorTab-2"><table id="DesignerInspectorTab-Events">' + eventQuery + '</table></div>' +
					'</div>';
				this.o.html(renderStr);
				//--> set plugins
				var inspectorTab = this.o.find('#DesignerInspectorTab').tabs(),
					inspectorTabProperties = inspectorTab.find('#DesignerInspectorTab-Properties');
				//--> set change value 
				inspectorTabProperties.find(':enabled')
					.change(function() {
						_._changeValue($(this));
					});
				//--> set button for expression
				inspectorTabProperties.find('div[type="expression"]')
					.button({
						icons: { primary: "ui-icon-pencil" },
						text: false
					})
					.click(function() {
						$.ZEX.show($(this));
					});		
				//--> set drop down check list just for multiple select value because of process's speed
				inspectorTabProperties.find('select[multiple]').dropdownchecklist({width : 140});
			},
							
			init : function() {	
				this.o.find('#DesignerInspectorTab').remove();
				if ($.ZDS.selected.length > 1) 
					this._renderMultiSelect();	
				else
					this._renderSingleSelect();
					
			},			
				
			_createBody : function() {
				return this.o.appendTo('body'); 			
			},
			
			_create : function() {
				//--> dialog
				this.o
					.dialog({
						height: 600,
						width: 260,
						closeOnEscape: false,
					})
					.on('mousedown', function(event) {
						event.stopPropagation();
						$(this).dialog('moveToTop');							
					})
					.dialog('option', 'position', [1120, 40]);
				//--> widget
				var w = this.o.dialog('widget');
				w.find('.ui-dialog-titlebar')
					.on('mousedown', function(event) {
						$(this).next().dialog('moveToTop');
					})
					.find('.ui-dialog-titlebar-close').remove();
				w.find('.ui-resizable-handle').css('background-image', 'url("")');
			}
			
		});
		
		_._init();
	
	})($.ZIN);
	
});	