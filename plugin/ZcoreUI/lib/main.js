const {Cc, Ci} = require("chrome");

var tabs = require("sdk/tabs"),
	self = require("sdk/self"),
	window = require("sdk/window/utils").getMostRecentBrowserWindow(),
	file = {
		/*
		 * _convertUriToLocalPath
		 */ 
		_convertUriToLocalPath : function (url) {
			// Remove any location or query part of the URL
			var originalPath = url.split("#")[0].split("?")[0];
			if(originalPath.indexOf("file://localhost/") == 0)
				originalPath = "file://" + originalPath.substr(16);
			var localPath;
			if(originalPath.charAt(9) == ":") // PC local file
				localPath = unescape(originalPath.substr(8)).replace(new RegExp("/","g"),"\\");
			else if(originalPath.indexOf("file://///") == 0) // Firefox PC network													
				localPath = "\\\\" + unescape(originalPath.substr(10)).replace(new RegExp("/","g"),"\\");
			else if(originalPath.indexOf("file:///") == 0) // Mac/UNIX local file
				localPath = unescape(originalPath.substr(7));
			else if(originalPath.indexOf("file:/") == 0) // Mac/UNIX local file
				localPath = unescape(originalPath.substr(5));
			else if(originalPath.indexOf("//") == 0) // PC network file
				localPath = "\\\\" + unescape(originalPath.substr(7)).replace(new RegExp("/","g"),"\\");
			return localPath || originalPath;
		},			
		/*
		 * file picker
		 */ 	
		_filePicker : function(mode, params) {
			var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
			fp.init(window, 'Select a File', (mode == 'load' ? Ci.nsIFilePicker.modeOpen : Ci.nsIFilePicker.modeSave));
			fp.appendFilter(params.filterLabel, params.filter);
			fp.defaultString = params.defaultString;
			return fp;
		},	
		/*
		 * load
		 */ 
		load : function(params) {
			var fp = this._filePicker('load', params);
			if (fp.show() != Ci.nsIFilePicker.returnCancel) {
				//--> prepare file path
				var path = this._convertUriToLocalPath('file:///' + fp.file.target.replace(/\\/g, '/'));
				//--> load
				var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				file.initWithPath(path);
				if(!file.exists())
					return null;
				var inputStream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);	
				inputStream.init(file, 0x01, 00004, null);
				var sInputStream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
				sInputStream.init(inputStream);
				var content = sInputStream.read(sInputStream.available());
				sInputStream.close();
				inputStream.close();
				return {
					content : content,
					path : path
				};
			}	
			return null;
		},
		/*
		 * _save
		 */ 
		_save : function(path, content) {
			path = this._convertUriToLocalPath(path);
			//--> save 
			var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			file.initWithPath(path);
			if(!file.exists())
				file.create(0,0664);
			var out = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
			out.init(file, 0x20|0x02, 00004, null);
			out.write(content, content.length);
			out.flush();
			out.close();
			return path;
		},
		/*
		 * save
		 */ 
		save : function(params) {
			if (params.path	!== undefined) {			
				return {
					path : this._save(params.path, params.content)
				};
			} else {
				//--> open dialog
				var fp = this._filePicker('save', params);
				if (fp.show() != Ci.nsIFilePicker.returnCancel) {				
					return {
						path : this._save('file:///' + fp.file.target.replace(/\\/g, '/'), params.content)
					};
				}
			}
			return null;
		},
		/*
		 * activate
		 */
		activate : function() {
			return {
				content : true
			};
		}
	}

//--> tabs on ready
tabs.on('ready', function(tab) {
	
	//--> tab attach
	var worker = tab.attach({	
		include : '*ZcoreClient*',
		contentScriptFile : self.data.url("content-script.js")
	});
  
	worker.port.on('zcore-port', function(name, params) {
		worker.port.emit('zcore-port-' + name, file[name](params));
	});	
  
});




