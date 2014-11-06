/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

//--> document ready
$(function() {
	
	function ZcoreExpressionPlugin() {}
	
	//--> register as global
	$.ZEX = new ZcoreExpressionPlugin();	
	
	(function(_) {
	
		$.extend(ZcoreExpressionPlugin.prototype, {
			
			_init : function() {
				this._createBody();
				this._create();
			},			
			
			_title : 'Expression Builder', 
			
			o : $('<div id="DesignerExpression" class="zui-component ui-corner-all"><textarea id="code"></textarea></div>'),
			
			_editor : undefined,
			
			_selected : undefined,
			
			prefix : 'e-',
			
			_partialWidget : $('<button>', {
							class : "ui-dialog-titlebar-close",
							title : "partialable",					
							tabindex : -1
						}),
			
			_partialFlag : false,
			
			_partialInit : function(v) {
				if (v) {
					_._partialFlag = true;
					_._partialWidget.addClass('ui-state-highlight');					
				} else {
					_._partialFlag = false;
					_._partialWidget.removeClass('ui-state-highlight');
				}
			},

			_partial : function(v) {
				return $.ZDS.getElement($.ZDS.selected).invoke('property', _._selected.attr('id'), 'partial', v);
			},	
			
			_expression : function(v) {
				return $.ZDS.getElement($.ZDS.selected).invoke('property', _._selected.attr('id'), 'expression', v);
			},		
			
			show: function(o) {
				_._selected = o;
				var v = _._expression(); 
				v = (v !== undefined ? v : ''); 
				_._editor.setValue(v);
				_._partialInit(_._partial());
				_.o.dialog('option', 'title', _._title + ' ( ' + $.ZDS.selected.attr('id') + ' -> ' + _._selected.attr('id') + ' )');
				_.o.dialog('open');
				setTimeout(function() {
					$.ZEX._editor.refresh();
					$.ZEX._editor.focus();
				});
			},		
						
			_createBody : function() {
				return this.o.appendTo('body'); 			
			},
			
			_create : function() {
				//--> dialog
				this.o
					.dialog({
						autoOpen : false,
						height : 250,
						width : 400,
						closeOnEscape : false,
						modal : true,
						resizable : false,
						buttons : {
							OK : function() {
								var p = $.ZEX._selected.parent(),
									v = $.ZEX._editor.getValue(); 
								if (v != '') {
									if (_._partialFlag) 
										p.addClass('ui-state-highlight').removeClass('ui-state-error');
									else
										p.addClass('ui-state-error').removeClass('ui-state-highlight');
								} else {
									p.removeClass('ui-state-error ui-state-highlight');
								}
								_._expression(v);
								_._partial(_._partialFlag);								
								$(this).dialog("close");
							},							
							Clear : function() {
								_._partialInit(false);
								_._editor.setValue('');
								_._editor.focus();
							},
							Cancel : function() {
								$(this).dialog("close");
							} 
						}				
					})
					.addClass('zui-scroll-off');
				//--> widget
				var w = this.o.dialog('widget');
				w.find('.ui-resizable-handle').css('background-image', 'url("")');				
				//--> set expression state button
				_._partialWidget
					.appendTo(w.find('.ui-dialog-titlebar'))
					.css("left", '0.3em')
					.button({
						icons: {
							primary: "ui-icon-shuffle"
						},
						text: false				
					})
					.mousedown(function(e) {
						e.stopPropagation();
					})
					.click(function(e) {	
						if (_._partialFlag) {
							_._partialInit(false);
						} else {
							if ($.ZEX._editor.getValue() != '') 
								_._partialInit(true);
							else
								$.ZAP.box.show('alert', 'Expression builder does not have any values !!!');
						}
					});					
				//--> code
				this._editor = CodeMirror.fromTextArea(this.o.find("#code")[0], {
				    lineNumbers : true,
				    theme : "eclipse"
				});
			}
				
		});
		
		_._init();
	
	})($.ZEX);
	
});	