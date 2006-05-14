var resurrect={
	clickTarget:null,

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
		alert(url);
	}

}//end var resurrect

window.addEventListener('load', resurrect.onLoad, false);
