/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

//--> document ready
$(function() {
	
	function ZcoreDesignerPlugin() {}
	
	//--> register as global
	$.ZDS = new ZcoreDesignerPlugin();
		
	(function(_) {	
			
		$.extend(ZcoreDesignerPlugin.prototype, {
			
			_init : function() {			
				this._create(this._model);
			},
			
			implementationMode : 'D',
						
			o : undefined,
						
			selected : undefined,
			
			getSelectable : function() {
				var o = _.o.find('[type]').first();
				return o.length ? o : _.o;
			},	
			
			elements : undefined,
			
			removeElement : function() {
				for (var i = 0; i < _.selected.length; i++) {
					//--> for call remove event
					var element = _.elements[$(_.selected[i]).attr('id')] || _.getElement($(_.selected[i]));
					element.invoke('method', 'remove', 'execute');						
				}
			},
			
			getElement : function(o) {
				return _.elements[o.attr('id')] || $.ZOF.getInstance(o); //--> this for get options components
			},
							
			_focus : function(o) {
				var s = _.o.find('.ui-selected');
				if (s.length > 1)
					s.find('.ui-resizable-handle').show();
				s.ZcoreSelected('remove').removeClass('ui-selected');
				/*
				 *  call focus event after inspector input values
				 *  because first mouse down event call and then change input event call
				 */				
				setTimeout(function() {
					_.selected = o;
					if (_.selected.attr('type') != 'form') { 
						_.selected
							.addClass('ui-selected')
							.ZcoreSelected(_.selected.length > 1 ? 'multiselect' : '');
						if (_.selected.length > 1)
							_.selected.find('.ui-resizable-handle').hide();
					}
					$.ZIN.init();
				});
			},
			
			_componentModel : function(type, parent) {
				var cnt = 0, a = [], f = true;
				//--> set id
				_.o.find('[id^="' + type + '"]').each(function() {
					a.push($(this).attr('id'));
				});
				while (true) {
					f = true;
					for (var i = 0; i < a.length; i++) {
						if (a[i] == type + cnt)
							f = false;
					}
					if (f)
						break;
					else
						cnt++;
				}
				//--> set tabindex
				var tabindex = 0;
				_.o.find('[type]').each(function() {
					if (tabindex <= parseInt($(this).attr('tabindex')))
						tabindex = parseInt($(this).attr('tabindex')) + 1;
				});			
				return {	
					attributes : $.ZOF.getInstance(type).prepareModel({	
						type : type,
						id : type + cnt,
						value : type + cnt,
						tabindex : tabindex,
						direction : 'inherit'
					})
				};
			},	
			
			generateComponent : function(parent, ui, register) {			
				var	model = _._componentModel(ui.draggable !== undefined ? ui.draggable.attr('type') : ui.type,	parent),
					c = $.ZOF.createComponent(model, parent);
				$.ZOF.renderComponent(c);
				if (register)
					_.elements[c.id()] = c;
				if (ui.offset !== undefined)
					c.o.offset({
						top : parseInt(ui.offset.top),
						left : parseInt(ui.offset.left)										
					});					
				c.o.triggerHandler("focus", [true]);
				return c;
			},
			
			getDragSelected : function(ui) {
				_._dragSelected = [];
				_.o.find('.ui-selected').not(ui.helper).each(function() {
					_._dragSelected.push({
						o : $(this),
						t : parseInt(ui.originalPosition.top - $(this).offset().top),
						l : parseInt(ui.originalPosition.left - $(this).offset().left)	
					});
				});			
			},
			
			setDragSelectedPos : function(ui) {
				$.each(_._dragSelected, function(index, obj) { 
					  var offset = obj.o.offset();
					  offset.top = ui.position.top - obj.t;
					  offset.left = ui.position.left - obj.l;			  
					  obj.o.offset(offset);
				});		
			},
			
			_model : {
				attributes : {
					type : "form",
					id : "DesignerForm",
					disabled : false,
					top : 150,
					left : 400,
					height : 450,
					width : 600,
					title : "DesignerForm",
					modal : false,
					resizable : false,
					draggable : false,
					mode: "dialog"
				}
			},
			
			_create : function(model) {
				_.elements = {};
				var c = $.ZOF.createComponent(model, 'body'),
					declareElements = function(c) {
						_.elements[c.id()] = c;
						for (var name in c.elements) 
							declareElements(c.elements[name]);
						delete c.elements;
					};				
				this.o = $.ZOF.renderComponent(c).o;
				declareElements(c);
				this.o.triggerHandler("focus", [true]);
			},
			
			reCreate : function(model) {				
				if (this.o !== undefined)
					this.o.remove();
				this._create(model || this._model);
			}			
			
		});
		
		_._init();
	
	})($.ZDS);
	
});