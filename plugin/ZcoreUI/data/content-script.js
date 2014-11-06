window.addEventListener("zcore-event", function(event) {
	var
		portName = 'zcore-port',
		portNameRet = 'zcore-port-' + event.detail.name,
		zcoreMethod = function(res) {	 
			self.port.removeListener(portNameRet, zcoreMethod);
			//--> if I send res as object I encounter with permission denied error
			/*
			 * based on this https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Content_Scripts/Interacting_with_page_scripts
			 */
			if (res != null) {
				//--> init res
				res.name = event.detail.name;
				res.flag = event.detail.flag;
				//--> send response
				var cloned = cloneInto(res, document.defaultView),
					eventRet = document.createEvent('CustomEvent');
				eventRet.initCustomEvent("zcore-event-ret", true, true, cloned);
				document.documentElement.dispatchEvent(eventRet);
			}
		};
		
	//--> check expiration	
	/*var 
		encode = function (str) {
		    var bytes = [], res = '';
		    for (var i = 0; i < str.length; i++)
		        bytes.push(str.charCodeAt(i) >>> 8, str.charCodeAt(i) & 0xFF);
			for (var item = 0; item < bytes.length; item++)
				res += bytes[item];
			return res;
		},	
		now = new Date(),
		exp = new Date(2015, 12 - 1, 26),
		resNow = encode((now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()).toString()),
		resExp = encode((exp.getFullYear() * 10000 + (exp.getMonth() + 1) * 100 + exp.getDate()).toString());		
	if (resNow >= resExp) {
		return;
	}*/
	//--> port communication
	self.port.on(portNameRet, zcoreMethod);
	self.port.emit(portName, event.detail.name, event.detail.params);
}, false);