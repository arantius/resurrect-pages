var resurrect={

	mirrors:[
		{name:'CoralCDN', id:'coralcdn'},
		{name:'Google Cache', id:'google'},
		{name:'The Internet Archive', id:'archive'},
		{name:'MSN Cache', id:'msn'},
		{name:'Yahoo! Cache', id:'yahoo'}
	],

	originalDoc:null,
	disabled:false,

// // // // // // // // // // // // // // // // // // // // // // // // // // //

	onLoad:function() {
		window.removeEventListener('load', resurrect.onLoad, false);

		document.getElementById('contentAreaContextMenu')
			.addEventListener('popupshowing', resurrect.toggleContextItems, false);

		window.document.getElementById("appcontent").addEventListener(
			'DOMContentLoaded', resurrect.attachClickEvent, false
		);
	},

	toggleContextItems:function(event) {
		resurrect.clickTarget=event.target;

		var onDocument=!(
			gContextMenu.isContentSelected || gContextMenu.onTextInput ||
			gContextMenu.onLink || gContextMenu.onImage
		);

		document.getElementById('resurrect-page-context')
			.setAttribute('hidden', !onDocument);
		document.getElementById('resurrect-link-context')
			.setAttribute('hidden', !gContextMenu.onLink);
	},

	attachClickEvent:function() {
		resurrect.disabled=false;

		var contentWin=getBrowser().contentWindow;
		if (contentWin.document.documentURI.match(/^about:neterror/)) {
			contentWin.document.getElementById('mirror').addEventListener(
				'click', resurrect.selectMirror, false
			);
			try {
				// because this button isn't always there
				contentWin.document.getElementById('mirrorSelect').addEventListener(
					'click', resurrect.selectMirror, false
				);
			} catch (e) { }
		}
	},

// // // // // // // // // // // // // // // // // // // // // // // // // // //

	page:function(event) {
		var doc=getBrowser().contentWindow.document;
		resurrect.showDialog(doc.location.href);
	},

	link:function(event) {
		var el=document.popupNode;

		try {
			while (el && el.tagName && 'A'!=el.tagName) {
				el=el.parentNode;
			}
			resurrect.showDialog(el.href);
		} catch (e) { }
		return null;
	},

// // // // // // // // // // // // // // // // // // // // // // // // // // //

	selectTab:function(aTab) {
		with (gBrowser) {
			selectedTab=aTab;
			mTabBox.selectedPanel=getBrowserForTab(mCurrentTab).parentNode;
			mCurrentTab.selected = true;
			updateCurrentBrowser();
		}
	},

// // // // // // // // // // // // // // // // // // // // // // // // // // //

	showDialog:function(url) {
		resurrect.originalDoc=getBrowser().contentWindow.document;

		window.openDialog(
			'chrome://resurrect/content/resurrect-select-mirror.xul',
			'_blank',
			'modal,centerscreen,resizable=no,chrome,dependent'
		);
	},

	selectMirror:function(event) {
		var ownerDoc=event.target.ownerDocument;
		var listbox=ownerDoc.getElementById('mirror');
		if (resurrect.disabled) return false;
		resurrect.disabled=true;

		// find the content document -- this depends on whether we are
		// living inline in the netError page
		var contentDoc;
		if (window.opener && window.opener.resurrect) {
			contentDoc=window.opener.resurrect.originalDoc;
		} else {
			contentDoc=window.getBrowser().contentWindow.document;
		}

		var gotoUrl=null;
		var rawUrl=contentDoc.location.href;
		var encUrl=encodeURIComponent(rawUrl);

		switch (listbox.value) {
		case 'coralcdn':
			gotoUrl=rawUrl.substring(0, 8)+
				rawUrl.substring(8).replace(/\//, '.nyud.net:8080/');
			break;
		case 'google':
			gotoUrl='http://www.google.com/search?q=cache:'+encUrl
			break;
		case 'archive':
			gotoUrl='http://web.archive.org/web/*/'+rawUrl
			break;
		case 'yahoo':
			var xhr=new XMLHttpRequest();
			xhr.open('GET',
				'http://api.search.yahoo.com/WebSearchService/V1/'+
				'webSearch?appid=firefox-resurrect&query='+encUrl+'&results=1',
				false
			);
			xhr.send(null);

			try {
				var c=xhr.responseXML.getElementsByTagName('Cache');
				gotoUrl=c[0].firstChild.textContent;
			} catch (e ) {
				gotoUrl='http://search.yahoo.com/search?p='+encUrl;
			}

			break;
		case 'msn':
			var xmlUrl=rawUrl.replace('&', '&amp;');
			var soapBody='<?xml version="1.0" encoding="ISO-8859-1"?><SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:si="http://soapinterop.org/xsd"><SOAP-ENV:Body><ns1:Search xmlns:ns1="http://testuri.org"><Request><AppID xsi:type="xsd:string">FD382E93B5ABC456C5E34C238A906CAB2DEEB5D6</AppID><Query xsi:type="xsd:string">'+xmlUrl+'</Query><CultureInfo xsi:type="xsd:string">en-US</CultureInfo><SafeSearch xsi:type="xsd:string">Off</SafeSearch><Requests><SourceRequest><Source xsi:type="xsd:string">Web</Source><Offset xsi:type="xsd:int">0</Offset><Count xsi:type="xsd:int">1</Count><ResultFields xsi:type="xsd:string">All</ResultFields></SourceRequest></Requests></Request></ns1:Search></SOAP-ENV:Body></SOAP-ENV:Envelope>';

			var xhr=new XMLHttpRequest();
			xhr.open('POST', 'http://soap.search.msn.com/webservices.asmx', false);
			xhr.setRequestHeader('Content-Type', 'text/xml; charset=ISO-8859-1');
			xhr.setRequestHeader('SOAPAction', '""');
			xhr.send(soapBody);

			try {
				var c=xhr.responseXML.getElementsByTagName('CacheUrl');
				gotoUrl=c[0].textContent;
			} catch (e) {
				gotoUrl='http://search.msn.com/results.aspx?q='+encUrl;
			}

			break;
		default:
			return false;
			break;
		}

		if (gotoUrl) {
			if (ownerDoc.getElementById('targetTab').getAttribute('selected')) {
				var newTab=window.opener.gBrowser.addTab(gotoUrl);

				//replicate broken focus-new-tab functionality
				var prefServ=Components.classes['@mozilla.org/preferences-service;1']
					.getService(Components.interfaces.nsIPrefBranch);
				if (!prefServ.getBoolPref('browser.tabs.loadInBackground')) {
					window.opener.resurrect.selectTab(newTab);
				}
			} else if (ownerDoc.getElementById('targetWin').getAttribute('selected')) {
				// the setTimeout keeps focus from returning to the opener
				setTimeout(function(){
					window.opener.openNewWindowWith(gotoUrl, null, null);
				}, 10);
			} else {
				contentDoc.location.assign(gotoUrl);
			}
		}

		if ('chrome://resurrect/content/resurrect-select-mirror.xul'==window.document.location) {
			// setTimeout avoids errors because the window is gone
			setTimeout(window.close, 0);
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // // // //

}//end var resurrect

if ('undefined'!=typeof gBrowser) {
	window.addEventListener('load', resurrect.onLoad, false);
}
