/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 * 
 * change the fg-menu plugin
 *  
 */

(function($) {
	
	function ZcoreMenuPlugin(caller, options) {
		this.caller = $(caller);
		this.menuExists = false;
		this.options = jQuery.extend({
			content: null,
			inside: window,		
			direction: 'rtl',
			width: 180, 
			positionOpts: {
				posX: 'left', 
				posY: 'bottom',
				offsetX: 0,
				offsetY: 0,
				directionH: (options.direction == 'rtl') ? 'left' : 'right',
				directionV: 'down', 
				detectH: true,  
				detectV: true,
				linkToFront: false
			},
			showSpeed: 200, 
			callerOnState: '', 
			loadingState: 'ui-state-loading', 
			linkHover: 'ui-state-hover', 
			linkHoverSecondary: 'li-hover', 		 
			flyOutOnState: 'ui-state-default',
			nextMenuLink: (options.direction == 'rtl') ? 'ui-icon-triangle-1-w' : 'ui-icon-triangle-1-e' 
		}, options);
		//--> content
		this.container = $('<div class="fg-menu-container ui-widget ui-widget-content ui-corner-all">' + this.options.content + '</div>');
	};	


	$.extend(ZcoreMenuPlugin.prototype, {		
		
		hide : function() {
			this.container.find('li').removeClass(this.options.linkHoverSecondary).find('a').removeClass(this.options.linkHover);		
			if (this.options.flyOutOnState) { 
				this.container.find('li a').removeClass(this.options.flyOutOnState); 
			}
			this.caller.removeClass(this.options.callerOnState); 
			this.container.find('ul ul').removeClass('ui-widget-content').hide();	
			var parent = this.container.parent();
			parent.hide();
			this.menuExists = false;
			//--> parent of parent equal ZcoreMenu
			parent.parent().remove();
			this.onHide();
		},
			
		show : function() {
			this.caller.addClass(this.options.loadingState);
			this.create(); 
			this.caller.addClass(this.options.callerOnState);
			var menu = this;
			this.container.parent().show().click(function() { 
				menu.hide(); 
				return false; 
			});
			this.container.hide().slideDown(this.options.showSpeed).find('.fg-menu:eq(0)');
			this.caller.removeClass(this.options.loadingState);		
			this.menuExists = true;
			this.onShow();
		},
		
		create : function(o) {	
			this.container
				.css({ width: this.options.width })
				.appendTo('body') 
				.find('ul:first')
				.not('.fg-menu-breadcrumb')
				.addClass('fg-menu')
				.addClass('fg-menu-' + this.options.positionOpts.directionH);
			
			this.container
				.find('ul, li a')
				.addClass('ui-corner-all');
			
			// aria roles & attributes
			this.container.find('ul').attr('role', 'menu').eq(0).attr('aria-activedescendant','active-menuitem').attr('aria-labelledby', this.caller.attr('id'));
			this.container.find('li').attr('role', 'menuitem');
			this.container.find('li:has(ul)').attr('aria-haspopup', 'true').find('ul').attr('aria-expanded', 'false');
			this.container.find('a').attr('tabindex', '-1');
			
			// when there are multiple levels of hierarchy, create flyout or drilldown menu
			if (this.container.find('ul').size() > 1) { 
				this.flyout(); 
			}
			else {
				var menu = this;
				this.container.find('a').click(function(e) {
					menu.chooseItem(this);
					return false;
				});
			};	
			
			if (this.options.linkHover) {
				var allLinks = this.container.find('.fg-menu li a');
				var menu = this;
				allLinks.hover(
					function(){
						var menuitem = $(this);
						$(this).find('.' + menu.options.linkHover).removeClass(menu.options.linkHover).blur().parent().removeAttr('id');
						$(this).addClass(menu.options.linkHover).focus().parent().attr('id','active-menuitem');
					},
					function(){
						$(this).removeClass(menu.options.linkHover).blur().parent().removeAttr('id');
					}
				);
			};
			
			if (this.options.linkHoverSecondary) {
				var menu = this;
				this.container.find('.fg-menu li').hover(
					function() {
						$(this).siblings('li').removeClass(menu.options.linkHoverSecondary);
						if (menu.options.flyOutOnState) { 
							$(this).siblings('li').find('a').removeClass(menu.options.flyOutOnState); 
						}
						$(this).addClass(menu.options.linkHoverSecondary);
					},
					function() { 
						$(this).removeClass(menu.options.linkHoverSecondary); 
					}
				);
			};	
			
			this.setPosition(this.container, this.caller, this.options);
		},
		
		chooseItem : function(item) {
			this.hide();	
			if ($.isFunction(this.options.click))
				this.options.click(this.getInfo(item));
		},
		
		getInfo : function(item) {
			var str = '', 
				parent = undefined, 
				parentId = '',
				res = {
					title : $(item).attr('title'),
					text : $(item).text(),
					command : $(item).attr('command')
				};
			while (item.length != 0) {
				str = ((str == '') ? $(item).text() : $(item).text() + ' -> ') + str;
				parent = $(item).parents('ul');
				parentId = parent.attr('aria-labelledby');
				item = parent.prev();
			}
			res.path = this.caller.text() + ' -> ' + str;
			return res;
		},
		
		flyout : function() {
			var menu = this;
			
			this.container.addClass('fg-menu-flyout').find('li:has(ul)').each(function() {
				var linkWidth = menu.container.width();
				var showTimer, hideTimer;
				var allSubLists = $(this).find('ul');		
				
				allSubLists.css({ left: linkWidth, width: linkWidth }).hide();
					
				$(this).find('a:eq(0)').addClass('fg-menu-indicator').addClass('fg-menu-indicator-' + menu.options.positionOpts.directionH).html('<span>' + $(this).find('a:eq(0)').text() + '</span><span class="ui-icon ' + menu.options.nextMenuLink + '"></span>').hover(
					function() {
						clearTimeout(hideTimer);
						var subList = $(this).next();
						if (!menu.fitVertical(subList, $(this).offset().top)) { subList.css({ top: 'auto', bottom: 0 }); };
						if (!menu.fitHorizontal(subList, $(this).offset().left + 100, menu.options.positionOpts.directionH)) { subList.css({ left: 'auto', right: linkWidth, 'z-index': 999 }); };
						showTimer = setTimeout(function() {
							subList.addClass('ui-widget-content').show(menu.options.showSpeed).attr('aria-expanded', 'true');	
						}, 300);	
					},
					function() {
						clearTimeout(showTimer);
						var subList = $(this).next();
						hideTimer = setTimeout(function() {
							subList.removeClass('ui-widget-content').hide(menu.options.showSpeed).attr('aria-expanded', 'false');
						}, 400);	
					}
				);
		
				$(this).find('ul a').hover(
					function() {
						clearTimeout(hideTimer);
						if ($(this).parents('ul').prev().is('a.fg-menu-indicator')) {
							$(this).parents('ul').prev().addClass(menu.options.flyOutOnState);
						}
					},
					function() {
						hideTimer = setTimeout(function() {
							allSubLists.hide(menu.options.showSpeed);
							menu.container.find(menu.options.flyOutOnState).removeClass(menu.options.flyOutOnState);
						}, 500);	
					}
				);	
			});
			
			this.container.find('a').click(function() {
				menu.chooseItem(this);
				return false;
			});
		},
		
		getTotalWidth : function(referrer) {
			return referrer.width() + parseInt(referrer.css('paddingRight')) + parseInt(referrer.css('paddingLeft')) + parseInt(referrer.css('borderRightWidth')) + parseInt(referrer.css('borderLeftWidth'));
		},
		
		getTotalHeight : function(referrer) {
			return referrer.height() + parseInt(referrer.css('paddingTop')) + parseInt(referrer.css('paddingBottom')) + parseInt(referrer.css('borderTopWidth')) + parseInt(referrer.css('borderBottomWidth'));
		},
		
		setPosition : function(el, referrer, options) {
			var dims = {
					refX: referrer.offset().left,
					refY: referrer.offset().top,
					refW: this.getTotalWidth(referrer),
					refH: this.getTotalHeight(referrer)
				},		
				helper = $('<div id="ZcoreMenu"><div id="' + referrer.attr('id') + 'Items' + '"></div></div>');			
			helper.css({ 
				position: 'absolute', 
				left: dims.refX, 
				top: dims.refY, 
				width: dims.refW, 
				height: dims.refH 
			});
			el.wrap(helper);
			
			var xVal = 0, 
				yVal = 0;
			switch(options.positionOpts.posX) {
				case 'left': xVal = 0; 
					break;				
				case 'center': xVal = dims.refW / 2;
					break;				
				case 'right': xVal = dims.refW;
					break;
			};
			switch(options.positionOpts.posY) {
				case 'top': yVal = 0;
					break;				
				case 'center': yVal = dims.refH / 2;
					break;				
				case 'bottom': yVal = dims.refH;
					break;
			};
			
			// add the offsets (zero by default)
			xVal += options.positionOpts.offsetX;
			yVal += options.positionOpts.offsetY;
			
			// position the object vertically
			if (options.positionOpts.directionV == 'up') {
				el.css({ top: 'auto', bottom: yVal });
				if (options.positionOpts.detectV && !this.fitVertical(el)) {
					el.css({ bottom: 'auto', top: yVal });
				}
			} 
			else {
				el.css({ bottom: 'auto', top: yVal });
				if (options.positionOpts.detectV && !this.fitVertical(el)) {
					el.css({ top: 'auto', bottom: yVal });
				}
			};
			
			// and horizontally
			if (options.positionOpts.directionH == 'left') {
				//<NEW>
				if (this.fitHorizontal(el)) 
					xVal += this.options.inside.position().left + this.getScrollLeft();
				//</NEW>		
				el.css({ left: 'auto', right: xVal });
				if (options.positionOpts.detectH && !this.fitHorizontal(el)) {
					el.css({ right: 'auto', left: xVal });
				}
			} 
			else {
				el.css({ right: 'auto', left: xVal });
				if (options.positionOpts.detectH && !this.fitHorizontal(el)) {
					el.css({ left: 'auto', right: xVal });
				}
			};
			
			// if specified, clone the referring element and position it so that it appears on top of the menu
			if (options.positionOpts.linkToFront) {
				referrer.clone().addClass('linkClone').css({
					position: 'absolute', 
					top: 0, 
					right: 'auto', 
					bottom: 'auto', 
					left: 0, 
					width: referrer.width(), 
					height: referrer.height()
				}).insertAfter(el);
			};
		},
		
		getWindowHeight : function() {
			var de = document.documentElement;
			return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
		},
		
		getWindowWidth : function() {		
			var de = document.documentElement;
			return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
		},
		
		getScrollTop : function() {
			return self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		},
		
		getScrollLeft : function() {
			return self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
		},
		
		fitHorizontal : function(el, leftOffset, directionH) {	
			leftOffset = leftOffset ? leftOffset : 0;
			if (leftOffset == 0)
				return true;		
			var leftVal = parseInt(leftOffset) || $(el).offset().left;
		    if (directionH == 'left') 
		    	return (leftVal - $(el).width() - 100 <= this.options.inside.position().left + this.getScrollLeft());
		    else 
		        return (leftVal + $(el).width() + 100 <= this.options.inside.position().left + (this.options.inside.outerWidth() || this.getWindowWidth()) + this.getScrollLeft());
		},
		
		fitVertical : function(el, topOffset) {
			var topVal = parseInt(topOffset) || $(el).offset().top;
			return (topVal + $(el).height() <= (this.options.inside.outerHeight() || this.getWindowHeight()) + this.getScrollTop() && topVal - this.getScrollTop() >= 0);
		}

	});

	/*
	 * ZcoreMenu
	 */
	$.fn.ZcoreMenu = function(action, options) {	
		switch (action) {
			case 'create':	
				var _ = new ZcoreMenuPlugin(this, options);
				_.onShow = function() {
					$(document).bind('click.ZcoreMenu', function() {
						_.hide();								
					})
				}
				_.onHide = function() {
					$(document).unbind('click.ZcoreMenu');
				}
				//--> on click
				$(this).bind('click.ZcoreMenu', _, function(e) {
					e.stopPropagation();	
					if (!e.data.menuExists) {
						//--> first unbind previous ZcoreMenu 
						$(document).trigger('click.ZcoreMenu');
						e.data.show();							
					} else {
						e.data.hide();						
					}
				});	
				break;
			case 'invokeOnClick':
				var res = '';
				$(this).find('div').each(function() {
					$('#' + $(this).attr('id') + 'Items a').each(function() {
						if ($(this).attr('title') == options) {
							$(this).trigger('click');
							return false;
						}
					});					
				});
				return $(this);
				break;
			default:
				break;
		}		
	};	

})(jQuery);
