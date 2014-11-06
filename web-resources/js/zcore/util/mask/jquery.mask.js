/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3
*/
(function($) {
	var pasteEventName = ($.browser.msie ? 'paste' : 'input') + ".mask";
	var iPhone = (window.orientation != undefined);

	$.mask = {
		//Predefined character definitions
		definitions: {
			'9': "[0-9]",
			'a': "[A-Za-z]",
			'*': "[A-Za-z0-9]"
		},
		dataName:"rawMaskFn",
		captureKey: '', //zandi
	};

	$.fn.extend({
		//Helper Function for Caret positioning
		caret: function(begin, end) {
			if (this.length == 0) return;
			if (typeof begin == 'number') {
				end = (typeof end == 'number') ? end : begin;
				return this.each(function() {
					if (this.setSelectionRange) {
						this.setSelectionRange(begin, end);
					} else if (this.createTextRange) {
						var range = this.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', begin);
						range.select();
					}
				});
			} else {
				if (this[0].setSelectionRange) {
					begin = this[0].selectionStart;
					end = this[0].selectionEnd;
				} else if (document.selection && document.selection.createRange) {
					var range = document.selection.createRange();
					begin = 0 - range.duplicate().moveStart('character', -100000);
					end = begin + range.text.length;
				}
				return { begin: begin, end: end };
			}
		},
		unmask: function() { return this.trigger("unmask"); },
		mask: function(mask, settings) {
			if (!mask && this.length > 0) {
				var input = $(this[0]);
				return input.data($.mask.dataName)();
			}
			settings = $.extend({
				placeholder: "_",
				completed: null
			}, settings);

			var defs = $.mask.definitions;
			var tests = [];
			var partialPosition = mask.length;
			var firstNonMaskPos = null;
			var len = mask.length;

			$.each(mask.split(""), function(i, c) {
				if (c == '?') {
					len--;
					partialPosition = i;
				} else if (defs[c]) {
					tests.push(new RegExp(defs[c]));
					if(firstNonMaskPos==null)
						firstNonMaskPos =  tests.length - 1;
				} else {
					tests.push(null);
				}
			});

			return this.trigger("unmask").each(function() {
				var input = $(this);
				var buffer = $.map(mask.split(""), function(c, i) { if (c != '?') return defs[c] ? settings.placeholder : c });
				var focusText = input.val();

				function seekNext(pos) {
					while (++pos <= len && !tests[pos]);
					return pos;
				};
				function seekPrev(pos) {
					while (--pos >= 0 && !tests[pos]);
					return pos;
				};

				function shiftL(begin,end) {
					if(begin<0)
					   return;
					for (var i = begin,j = seekNext(end); i < len; i++) {
						if (tests[i]) {
							if (j < len && tests[i].test(buffer[j])) {
								buffer[i] = buffer[j];
								buffer[j] = settings.placeholder;
							} else
								break;
							j = seekNext(j);
						}
					}
					writeBuffer();
					input.caret(Math.max(firstNonMaskPos, begin));
				};

				function shiftR(pos) {
					for (var i = pos, c = settings.placeholder; i < len; i++) {
						if (tests[i]) {
							var j = seekNext(i);
							var t = buffer[i];
							buffer[i] = c;
							if (j < len && tests[j].test(t))
								c = t;
							else
								break;
						}
					}
				};

				function keydownEvent(e) {
					var k=e.which;

					//backspace, delete, and escape get special treatment
					if(k == 8 || k == 46 || (iPhone && k == 127)){
						var pos = input.caret(),
							begin = pos.begin,
							end = pos.end;
						
						if(end-begin==0){
							begin=k!=46?seekPrev(begin):(end=seekNext(begin-1));
							end=k==46?seekNext(end):end;
						}
						clearBuffer(begin, end);
						shiftL(begin,end-1);

						return false;
					} else if (k == 27) {//escape
						input.val(focusText);
						input.caret(0, checkVal());
						return false;
					}
				};

				function keypressEvent(e) {
					//<ZANDI>					
					if (e.keyCode == 13 && checkVal() != mask.length)
						input.change();
					if (e.keyCode == 27 || e.keyCode == 120 || e.keyCode == 121)
						return true;
					if (settings.captureKey !== undefined && settings.captureKey.indexOf(String.fromCharCode(e.charCode)) != -1) 
						return false;
					//</ZANDI>
					var k = e.which,
						pos = input.caret();
					if (e.ctrlKey || e.altKey || e.metaKey || k<32) {//Ignore
						return true;
					} else if (k) {
						if(pos.end-pos.begin!=0){
							clearBuffer(pos.begin, pos.end);
							shiftL(pos.begin, pos.end-1);
						}

						var p = seekNext(pos.begin - 1);
						if (p < len) {
							var c = String.fromCharCode(k);
							if (tests[p].test(c)) {
								shiftR(p);
								buffer[p] = c;
								writeBuffer();
								var next = seekNext(p);
								input.caret(next);
								if (settings.completed && next >= len)
									settings.completed.call(input);
							}
						}
						return false;
					}
				};

				function clearBuffer(start, end) {
					for (var i = start; i < end && i < len; i++) {
						if (tests[i])
							buffer[i] = settings.placeholder;
					}
				};

				function writeBuffer() { return input.val(buffer.join('')).val(); };

				function checkVal(allow) {
					//try to place characters where they belong
					var test = input.val();
					var lastMatch = -1;
					for (var i = 0, pos = 0; i < len; i++) {
						if (tests[i]) {
							buffer[i] = settings.placeholder;
							while (pos++ < test.length) {
								var c = test.charAt(pos - 1);
								if (tests[i].test(c)) {
									buffer[i] = c;
									lastMatch = i;
									break;
								}
							}
							if (pos > test.length)
								break;
						} else if (buffer[i] == test.charAt(pos) && i!=partialPosition) {
							pos++;
							lastMatch = i;
						}
					}
					if (!allow && lastMatch + 1 < partialPosition) {
						input.val("");
						clearBuffer(0, len);
					} else if (allow || lastMatch + 1 >= partialPosition) {
						writeBuffer();
						if (!allow) input.val(input.val().substring(0, lastMatch + 1));
					}
					return (partialPosition ? i : firstNonMaskPos);
				};

				input.data($.mask.dataName,function(){
					return $.map(buffer, function(c, i) {
						return tests[i]&&c!=settings.placeholder ? c : null;
					}).join('');
				})

				if (!input.attr("readonly"))
					input
					.one("unmask", function() {
						input
							.unbind(".mask")
							.removeData($.mask.dataName);
					})
					.bind("focus.mask", function() {
						focusText = input.val();
						var pos = checkVal();
						writeBuffer();
						var moveCaret=function(){
							if (pos == mask.length)
								input.caret(0, pos);
							else
								input.caret(pos);
						};
						($.browser.msie ? moveCaret:function(){setTimeout(moveCaret,0)})();
					})
					.bind("blur.mask", function() {
						checkVal();
						if (input.val() != focusText)
							input.change();
					})
					.bind("keydown.mask", keydownEvent)
					.bind("keypress.mask", keypressEvent)
					.bind(pasteEventName, function() {
						setTimeout(function() { input.caret(checkVal(true)); }, 0);
					});

				checkVal(); //Perform initial check for existing values
			});
		}
	});
})(jQuery);


/**
 * @class DecimalFormat
 * @constructor
 * @param {String} formatStr
 * @author Oskan Savli
 */
function DecimalFormat(formatStr)
{
     /**
     * @fieldOf DecimalFormat
     * @type String
     */
    this.prefix = '';
    /**
     * @fieldOf DecimalFormat
     * @type String
     */
    this.suffix = '';
    /**
     * @description Grouping size
     * @fieldOf DecimalFormat
     * @type String
     */
    this.comma = 0;
    /**
     * @description Minimum integer digits to be displayed
     * @fieldOf DecimalFormat
     * @type Number
     */
    this.minInt = 1;
    /**
     * @description Minimum fractional digits to be displayed
     * @fieldOf DecimalFormat
     * @type String
     */
    this.minFrac = 0;
    /**
     * @description Maximum fractional digits to be displayed
     * @fieldOf DecimalFormat
     * @type String
     */
    this.maxFrac = 0;
    
    // get prefix
    for (var i=0; i<formatStr.length; i++) {
        if (formatStr.charAt(i) == '#' || formatStr.charAt(i) == '0') {
            this.prefix = formatStr.substring(0,i);
            formatStr = formatStr.substring(i);
            break;
        }
    }
    
    // get suffix
    this.suffix = formatStr.replace(/[#]|[0]|[,]|[.]/g , '');

    // get number as string
    var numberStr = formatStr.replace(/[^0#,.]/g , '');
    
    var intStr = '';
    var fracStr = '';
    var point = numberStr.indexOf('.');
    if (point != -1) {
        intStr = numberStr.substring(0,point);
        fracStr = numberStr.substring(point+1);
    }
    else {
        intStr = numberStr;
    }
    
    var commaPos = intStr.lastIndexOf(',');
    if (commaPos != -1) {
        this.comma = intStr.length - 1 - commaPos;
    }
    
    intStr = intStr.replace(/[,]/g , ''); // remove commas

    fracStr = fracStr.replace(/[,]|[.]+/g , '');

    this.maxFrac = fracStr.length;
    var tmp = intStr.replace(/[^0]/g , ''); // remove all except zero
    if (tmp.length > this.minInt)
      this.minInt = tmp.length;
    tmp = fracStr.replace(/[^0]/g , '');
    this.minFrac = tmp.length;
}

/**
 * @description Formats given value
 * @methodOf DecimalFormat
 * @param {String} numberStr
 * @return {String} Formatted number
 * @author Oskan Savli
 */
DecimalFormat.prototype.format = function(numStr) { // 1223.06 --> $1,223.06
    // remove prefix, suffix and commas
    var numberStr = this.formatBack(numStr).toLowerCase();
    
    // do not format if not a number
    if (isNaN(numberStr) || numberStr.length == 0)
      return numStr;
    
    //scientific numbers
    if (i = numberStr.indexOf("e") != -1) {
      var n = Number(numberStr);
      if (n=="Infinity" || n=="-Infinity") return numberStr;
      numberStr = n+"";
      if(numberStr.indexOf('e') != -1) return numberStr;
    }

    var negative = false;
    // remove sign
    if (numberStr.charAt(0) == '-') {
      negative = true;
      numberStr = numberStr.substring(1);
    }
    else if (numberStr.charAt(0) == '+') {
      numberStr = numberStr.substring(1);
    }

    var point = numberStr.indexOf('.'); // position of point character
    var intStr = '';
    var fracStr = '';
    if (point != -1) {
        intStr = numberStr.substring(0,point);
        fracStr = numberStr.substring(point+1);
    }
    else {
        intStr = numberStr;
    }
    fracStr = fracStr.replace(/[.]/ , ''); // remove other point characters
    
    var isPercentage = this.suffix && this.suffix.charAt(0) === '%';
    // if percentage, number will be multiplied by 100.
    var minInt = this.minInt, minFrac = this.minFrac, maxFrac = this.maxFrac;
    if (isPercentage) {
      minInt -= 2;
      minFrac += 2;
      maxFrac += 2;
    }
    
    if (fracStr.length > maxFrac) { // round
        //case 6143
        var num = new Number('0.' + fracStr);
        num = (maxFrac == 0)? Math.round(num) : num.toFixed(maxFrac);
        // toFixed method has bugs on IE (0.7 --> 0)
        fracStr = num.toString(10).substr(2);
        var c = (num>=1)? 1:0; //carry
        var x, i=intStr.length-1;
        while (c) { //increment intStr
          if (i==-1) {
            intStr = '1'+intStr;
            break;
          }
          else {
            x = intStr.charAt(i);
            if (x==9) {x='0'; c=1;}
            else {x = (++x)+''; c=0;}
            intStr = intStr.substring(0,i) + x + intStr.substring(i+1,intStr.length);
            i--;
          }
        }
    }
    for (var i=fracStr.length; i<minFrac; i++) { // if minFrac=4 then 1.12 --> 1.1200
        fracStr = fracStr + '0';
    }
    while (fracStr.length > minFrac && fracStr.charAt(fracStr.length-1) == '0') { // if minInt=4 then 00034 --> 0034)
        fracStr = fracStr.substring(0,fracStr.length-1);
    }
    
    for (var i=intStr.length; i<minInt; i++) { // if minInt=4 then 034 --> 0034
        intStr = '0' + intStr;
    }
    while (intStr.length > minInt && intStr.charAt(0) == '0') { // if minInt=4 then 00034 --> 0034)
        intStr = intStr.substring(1);
    }
    
    if (isPercentage) { // multiply by 100
      intStr += fracStr.substring(0,2);
      fracStr = fracStr.substring(2);
    }
    
    var j = 0;
    for(var i=intStr.length; i>0; i--) { // add commas
        if (j != 0 && j%this.comma == 0) {
            intStr = intStr.substring(0,i) + ',' + intStr.substring(i);
            j = 0;
        }
        j++;
    }

    var formattedValue;
    if (fracStr.length > 0)
        formattedValue = this.prefix + intStr + '.' + fracStr + this.suffix;
    else
        formattedValue = this.prefix + intStr + this.suffix;
        
    if (negative) {
        formattedValue = '-' + formattedValue;
    }
    
    return formattedValue;
}


/**
 * @description Converts formatted value back to non-formatted value
 * @methodOf DecimalFormat
 * @param {String} fNumberStr Formatted number
 * @return {String} Original number
 * @author Oskan Savli
 */
DecimalFormat.prototype.formatBack = function(fNumStr) { // $1,223.06 --> 1223.06
  fNumStr += ''; //ensure it is string
  if (!fNumStr) return ''; //do not return undefined or null
  if (!isNaN(fNumStr)) return this.getNumericString(fNumStr);
  var fNumberStr = fNumStr;
  var negative = false;
  if (fNumStr.charAt(0) == '-') {
    fNumberStr = fNumberStr.substr(1);
    negative = true;
  }
  var pIndex = fNumberStr.indexOf(this.prefix);
  var sIndex = (this.suffix == '')? fNumberStr.length : fNumberStr.indexOf(this.suffix, this.prefix.length+1);
  if (pIndex == 0 && sIndex > 0) {
    // remove suffix
    fNumberStr = fNumberStr.substr(0,sIndex);
    // remove prefix
    fNumberStr = fNumberStr.substr(this.prefix.length);
    // remove commas
    fNumberStr = fNumberStr.replace(/,/g , '');
    if (negative)
      fNumberStr = '-' + fNumberStr;
    if (!isNaN(fNumberStr))
      return this.getNumericString(fNumberStr);
  }
  return fNumStr;
}
/**
 * @description We shouldn't return strings like 1.000 in formatBack method.
 * However, using only Number(str) is not enough, because it omits . in big numbers
 * like 23423423423342234.34 => 23423423423342236 . There's a conflict in cases
 * 6143 and 6541.
 * @methodOf DecimalFormat
 * @param {String} str Numberic string
 * @return {String} Corrected numeric string
 * @author Serdar Bicer
 */
DecimalFormat.prototype.getNumericString = function(str){
    //first convert to number
    var num = new Number(str);
    //check if there is a missing dot
    var numStr = num + '';
    if (str.indexOf('.')>-1 && numStr.indexOf('.')<0){
        //check if original string has all zeros after dot or not
        for (var i=str.indexOf('.')+1;i<str.length;i++){
            //if not, this means we lost precision
            if (str.charAt(i) !== '0') return str;
        }
        return numStr;
    }
    return str;
}