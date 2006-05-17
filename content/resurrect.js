var resurrect={

	mirrors:[
		{name:'CoralCDN', id:'coralcdn'},
		{name:'Google Cache', id:'google'},
		{name:'The Internet Archive', id:'archive'},
		{name:'MSN Cache', id:'msn'},
		{name:'Yahoo! Cache', id:'yahoo'}
	],

	originalDoc:null,
	gotoUrl:null,

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
			} cach (e) { }
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

	showDialog:function(url) {
		resurrect.originalDoc=getBrowser().contentWindow.document;
		resurrect.gotoUrl=url;

		window.openDialog(
			'chrome://resurrect/content/resurrect-select-mirror.xul',
			'_blank',
			'modal,centerscreen,resizable=no,chrome,dependent'
		);
	},

	selectMirror:function(event) {
		var ownerDoc=event.target.ownerDocument;

		var listbox=ownerDoc.getElementById('mirror');

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
			//FD382E93B5ABC456C5E34C238A906CAB2DEEB5D6
			//ugh, they've got an API but .. SOAP?  blech too complicated

			var searchUrl='http://search.msn.com/results.aspx?q='+encUrl;

			var xhr=new XMLHttpRequest();
			xhr.open('GET', searchUrl, false);
			xhr.send(null);

			try {
				var m=xhr.responseText.match(/<a href=\"([^\"]+)\">Cached page/);
				gotoUrl=m[1];
				gotoUrl=gotoUrl.replace('&amp;', '&');
			} catch (e ) {
				gotoUrl=searchUrl;
			}

			break;
		default:
			return false;
			break;
		}
		if (gotoUrl) {
			contentDoc.location.assign(gotoUrl);
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
