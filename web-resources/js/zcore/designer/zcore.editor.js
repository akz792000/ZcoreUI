/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

//--> document ready
$(function() {
	
	function ZcoreEditorPlugin() {}
	
	//--> register as global
	$.ZED = new ZcoreEditorPlugin();
	
	(function(_) {	
	
		$.extend(ZcoreEditorPlugin.prototype, {
			
			_init : function() {
				this._createBody();
				this._create();
			},
			
			o : $(
				'<div id="DesignerEditor" class="zui-component" title="Editor">' +
					'<textarea id="code"></textarea>' + 				 
				'</div>'								
			),
			
			_editor : undefined,
			
			getValue : function() {
				return this._editor.getValue();
			},
			
			setValue : function(v) {
				this._editor.setValue(v);
			},
							
			_createBody : function() {
				return this.o.appendTo('body'); 			
			},
			
			moveToTop : function(o) {
				setTimeout(function() {
					o.dialog('moveToTop');
				});	
			},
			
			_create : function() {
				//--> dialog
				this.o
					.dialog({
						autoOpen: true,
						height: 600,
						width: 800,
						closeOnEscape: false,
						modal: false,
						resizable: true					
					})
					.css('overflow', 'hidden')
					.dialog('option', 'position', [50, 50])
					.on('mousedown', function(event) {
						event.stopPropagation();
						_.moveToTop($(this));							
					});					
				//--> widget
				var w = this.o.dialog('widget');
				w.find('.ui-dialog-titlebar').on('mousedown', function(event) {
					_.moveToTop($(this).next());
				});
				w.find('.ui-resizable-handle').css('background-image', 'url("")');
				w.find('.ui-dialog-titlebar').find('.ui-dialog-titlebar-close').remove();				
				//--> code
				this._editor = CodeMirror.fromTextArea(this.o.find("#code")[0], {
				    lineNumbers: true,
				    theme: "eclipse"
				});								
			}
				
		});
		
		_._init();
	
	})($.ZED);
	
});	