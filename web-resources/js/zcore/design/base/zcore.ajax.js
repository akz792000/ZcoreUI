/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
			
	_.clazz({
		
		name : 'ajax',
		
		inherit : 'postable',
		
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
							
				id : {
					after : function(v) {
						this.__.widget.p.text(v).attr('title', v);
						this.__.refresh();
					}
				},				
				
				height : {
					after : function() {
						this.__.refresh();
					}
				},	
				
				width : {
					after : function() {
						this.__.refresh();
					}
				},				
				
				value : {
					get : function() {
						return "";
					},
					set : function() {
						//--> nop
					}
				},			
				
				align : {
					after : function() {
						this.__.refresh();
					}
				},
							
				/*
				 * new
				 */
				
				data : {
					type : 'array',
					get : function() {
						return this.__.widget.data.text(); 
					},
					set : function(v) {
						this.__.widget.data.text(v);
					}				
				},
							
				service : _.defaultProperty()
					
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
				
				initialize : {
					advice : 'after',
					method : function() {
						var T = this.__;
						T.o.addClass('zui-ajax ui-state-default');
						$.extend(T.widget, {							
							//--> p
							p : $('<p>', {
									style : 'position:absolute',
									text : T.params.id,
									title : T.params.id
								}).appendTo(T.o),
							//--> data
							data : $('<data>', { 
									'style' : 'display:none'
								}).appendTo(T.o),
						});
					}					
				},			
								
				render : {
					advice : 'after',
					method : function() {
						this.__.refresh();						
					}
				},				
							
				refresh : { 				
					method : function() {
						var T = this.__;
						T.widget.p					
							.position({
								"my" : "center center",
								"at" : "center center",
								"of" : T.o
							});	
					}
				}		
			
			});
			
		}
						
	});
	
})(jQuery, jQuery.ZOF);