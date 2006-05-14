/*
Enumerating: document.location
document.location.hash = #x
document.location.host = www.google.com
document.location.hostname = www.google.com
document.location.href = http://www.google.com/search?q=foo&start=0&ie=utf-8&oe=utf-8&client=firefox-a&rls=org.mozilla:en-US:official#x
document.location.pathname = /search
document.location.port =
document.location.protocol = http:
document.location.search = ?q=foo&start=0&ie=utf-8&oe=utf-8&client=firefox-a&rls=org.mozilla:en-US:official
document.location.replace = function replace() { [native code] }
document.location.assign = function assign() { [native code] }
document.location.reload = function reload() { [native code] }
*/

var resurrect={

	mirrors:[
		{name:'CoralCDN', id:'coralcdn'},
		{name:'Google Cache', id:'google'},
		{name:'Yahoo! Cache', id:'yahoo'},
		{name:'MSN Cache', id:'msn'},
		{name:'The Internet Archive', id:'archive'}
	],

	originalDoc:null,
	gotoUrl:null,

// // // // // // // // // // // // // // // // // // // // // // // // // // //

	onLoad:function() {
		window.removeEventListener('load', resurrect.onLoad, false);

		document.getElementById('contentAreaContextMenu')
			.addEventListener('popupshowing', resurrect.toggleContextItems, false);
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

// // // // // // // // // // // // // // // // // // // // // // // // // // //

	dumpProps:function(obj, withFuncs) {
		dump('--------------------------------------------\n');
		dump(obj+'\n\n');
		var s='';
		for (i in obj) {
			try {
				if (!withFuncs && 'function'==typeof obj[i]) continue;
				s=i+': '+obj[i];
				s=s.replace(/\n\s*./, 'n');
				dump( s.substring(0, 79)+'\n' );
			} catch (e) { }
		}
		dump('\n');
	},

	findTag:function(tagName) {
		var el=document.popupNode;

		try {
			while (el && el.tagName && tagName!=el.tagName) {
				el=el.parentNode;
			}
			return el;
		} catch (e) { }
		return null;
	},

// // // // // // // // // // // // // // // // // // // // // // // // // // //

	page:function(event) {
		var doc=resurrect.findTag('HTML').ownerDocument;
		resurrect.showDialog(doc.location.href);
	},

	link:function(event) {
		var a=resurrect.findTag('A');
		resurrect.showDialog(a.href);
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

	loadMirrors:function() {
		var listbox=document.getElementById('mirror');
		for (var i=0, mirror=null; mirror=resurrect.mirrors[i]; i++) {
			var listitem=document.createElement('listitem');
			listitem.setAttribute('label', mirror.name);
			listitem.setAttribute('value', mirror.id);
			listbox.appendChild(listitem);
		}
		listbox.setAttribute('rows', listbox.getRowCount());
	},

	selectMirror:function(event) {
		var listbox=document.getElementById('mirror');

		var gotoUrl=null;

		var rawUrl=opener.resurrect.gotoUrl;
		var encUrl=encodeURIComponent(rawUrl);

		switch (listbox.value) {
		case 'coralcdn':
			gotoUrl=rawUrl.substring(0, 8)+
				rawUrl.substring(8).replace(/\//, '.nyud.net:8080/');
			break;
		case 'google':
			gotoUrl='http://www.google.com/search?q=cache:'+encUrl
			break;
		}
		if (gotoUrl) {
			opener.resurrect.originalDoc.location.assign(gotoUrl);
		}

		//setTimeout avoids error message when selecting in listbox
		setTimeout(window.close, 0);
	}

// // // // // // // // // // // // // // // // // // // // // // // // // // //

}//end var resurrect

if ('undefined'!=typeof gBrowser) {
	window.addEventListener('load', resurrect.onLoad, false);
}
