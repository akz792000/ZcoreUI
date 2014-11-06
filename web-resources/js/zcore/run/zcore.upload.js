/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($, _) {
	
	_.clazz({
		
		name : 'upload',
		
		inherit : 'component',
		
		body : function(o) {		

			/*
			 * ----------------------------------------------------------------------
			 * 								 resources
			 * ---------------------------------------------------------------------- 
			 */			
			
			this.resource = {					
					root : '/js/zcore/util/upload/',
					files : ['fileuploader.css', 'fileuploader.js']
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
				
				__null__ : ['align', 'direction'],
								
				disabled : {
					after : function(v) {
						//this.__.o.button("option", "disabled", v);
					}
				},
				
				height : {
					after : function(v) {			
						this.__.refresh();
					}
				},
									
				value : {
					get : function() {
						return this.__.widget.btn.children('p').text(); 
					},
					set : function(v) {
						this.__.widget.btn.children('p').text(v);
					},
					after : function(v) {
						this.__.refresh();
					}					
				},
				
				width : {
					after : function(v) {
						this.__.refresh();
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
						var T = this.__;						
						//T.widget.btn.height(T.height() - parseInt(T.widget.btn.css('border-top-width')) - parseInt(T.widget.btn.css('border-bottom-width')));
						//T.widget.btn.width(T.width() - parseInt(T.widget.btn.css('border-left-width')) - parseInt(T.widget.btn.css('border-right-width')));
						/*T.widget.btn.children('p')
							.position({
								"my" : "center center",
								"at" : "center center",
								"of" : T.widget.btn
							});*/						
					}
				},						
				
				render : { 			
					method : function() {
						var T = this.__;
						//--> uploader
						T.widget = {
								uploader : new qq.FileUploader({
								                element : T.o.get(0),
								                //action: $.zcoreApp.url + '/form/' + options.form,
								                //uploadButtonText: options.uploadButtonText,
								                forceMultipart: true,
								                //inputName: options.name,
								                //sizeLimit: options.sizeLimit === undefined ? 0 : options.sizeLimit,
								                //allowedExtensions: options.allowedExtensions === undefined ? [] : options.allowedExtensions,
								                onSubmit: function() {
								                	//T.widget._options.params = T.onServiceParams();
								                },
								                onError: function(id, fileName, reason, responseJSON) {
								                	//$.ZAP._errorHandler(responseJSON);
								                },
								                onComplete: function(id, name, response) {
								                    /*$.zcoreApp._jsonHandle(response, {});
								                    if (response.type == 'validate') {
								                    	$.zcoreApp._formValidateClear(options.form);
								                    	$.zcoreApp._formValidateSet(options.form, response.value);
								                    }*/
								                }
								            }),
								btn : T.o.find('.qq-upload-button')								            
						};
					//	T.widget.btn.hide();
						
						
						
						this.__.o.bind('click.zcore', function(e) {
							
							if (!$(this).is(':disabled') && $(this).is(e.target))
								 $(this).find("input").trigger("click");
						});
						
					}					
				}			
				
				
			});
			
		}
		
	});
	
})(jQuery, jQuery.ZOF);