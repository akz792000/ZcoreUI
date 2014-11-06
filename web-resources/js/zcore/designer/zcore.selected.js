/**
 * 
 * @author Ali Karimizandi
 * @since 2012-2014 
 * @version 1.0
 *  
 */

(function($) {
	
    $.fn.ZcoreSelected = function(flag) {
    	switch (flag) {
		case 'remove':
			$(this).children('#ZcoreSelected').remove();
			break;
		case 'multiselect':
	    	$(this).append(
		    	'<div id="ZcoreSelected">' +
		    	'<span class="zui-mulitselected-span zui-mulitselected-top zui-mulitselected-left"/>' +
	            '<span class="zui-mulitselected-span zui-mulitselected-top zui-mulitselected-right"/>' +
	            '<span class="zui-mulitselected-span zui-mulitselected-bottom zui-mulitselected-right"/>' +
	            '<span class="zui-mulitselected-span zui-mulitselected-bottom zui-mulitselected-left"/>' +
	            '</div>'
		    );
			break;
		default:
	    	$(this).append(
	    		'<div id="ZcoreSelected">' +
	    		'<span class="zui-selected-span zui-selected-top zui-selected-left"/>' +
                '<span class="zui-selected-span zui-selected-top zui-selected-h-mid"/>' +
                '<span class="zui-selected-span zui-selected-top zui-selected-right"/>' +
                '<span class="zui-selected-span zui-selected-v-mid zui-selected-right"/>' +
                '<span class="zui-selected-span zui-selected-bottom zui-selected-right"/>' +
                '<span class="zui-selected-span zui-selected-bottom zui-selected-h-mid"/>' +
                '<span class="zui-selected-span zui-selected-bottom zui-selected-left"/>' +
                '<span class="zui-selected-span zui-selected-v-mid zui-selected-left"/>' + 
                '</div>'
	    	);			
			break;
		}
    	return $(this);
    };
	
})(jQuery);		