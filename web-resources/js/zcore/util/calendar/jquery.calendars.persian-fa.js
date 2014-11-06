/* http://keith-wood.name/calendars.html
   Farsi/Persian localisation for Persian calendar for jQuery.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2009. */
(function($) {
	$.calendars.calendars.persian.prototype.regional['fa'] = {
			name: 'Persian', // The calendar name
			epochs: ['BP', 'AP'],
			monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
			'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
			monthNamesShort: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
			'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
			dayNames: ['یکشنبه','دوشنبه','سه شنبه','جهارشنبه','پنجشنبه','جمعه','شنبه'], //AKZ
			dayNamesShort: ['یک','دو','سه','چهار','پنج','جمعه','شنبه'], //AKZ
			dayNamesMin: ['یک','دو','سه','چهار','پنج','جمعه','شنبه'], //AKZ
			dateFormat: 'yyyy/mm/dd', // See format options on BaseCalendar.formatDate
			firstDay: 6, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: true // True if right-to-left language, false if left-to-right
		};	
})(jQuery);