var resurrect={

  contextUrl:null,

// // // // // // // // // // // // // // // // // // // // // // // // // // //

  onLoad:function() {
    window.removeEventListener('load', resurrect.onLoad, false);
    document.getElementById('contentAreaContextMenu')
        .addEventListener('popupshowing', resurrect.toggleContextItems, false);
    addEventListener('DOMContentLoaded', resurrect.contentDomLoad, false);
  },

  toggleContextItems:function(event) {
    resurrect.contextUrl = gContextMenu.linkURL;

    var onDocument=!(
        gContextMenu.isContentSelected || gContextMenu.onTextInput ||
        gContextMenu.onLink || gContextMenu.onImage);

    document.getElementById('resurrect-page-context')
        .setAttribute('hidden', !onDocument);
    document.getElementById('resurrect-link-context')
        .setAttribute('hidden', !gContextMenu.onLink);
  },

  contentDomLoad:function(event) {
    var contentDoc=event.target;

    if (contentDoc.documentURI.indexOf('about:neterror') != 0) return;

    // Inject our content...
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'chrome://resurrect/content/netError.xhtml', true);
    xhr.onload = function() {
      var fieldset = xhr.responseXML.getElementById('resurrect');
      var xhtml = new XMLSerializer().serializeToString(fieldset);
      var container = contentDoc.getElementById('errorPageContainer');
      container.innerHTML += xhtml;

      // ...plus the CSS.
      var link = contentDoc.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', 'chrome://resurrect/skin/netError.css');
      link.setAttribute('type', 'text/css');
      link.setAttribute('media', 'all');
      contentDoc.getElementsByTagName('head')[0].appendChild(link);

      // Add the className that enables it, only when appropriate.
      contentDoc.location.href =
          'javascript:if ("nssBadCert" != getErrorCode()) {'
          + 'document.body.className += " resurrect";'
          + '}; void(0)';

      // Add event listener.
      contentDoc.getElementById('resurrect').addEventListener(
          'click', resurrect.clickedHtml, false);
      contentDoc.getElementById('resurrect').addEventListener(
          'keypress', resurrect.clickedHtml, false);
    };
    xhr.send(null);
  },

  disableButtons:function(doc) {
    var bs=doc.getElementById('resurrect')
        .getElementsByTagName('xul:button');
    for (var i=0, b=null; b=bs[i]; i++) {
      b.setAttribute('disabled', 'true');
    }
  },

// // // // // // // // // // // // // // // // // // // // // // // // // // //

  page:function(event) {
    var doc=getBrowser().contentWindow.document;
    resurrect.showDialog(doc.location.href);
  },

  link:function(event) {
    resurrect.showDialog(resurrect.contextUrl);
  },

// // // // // // // // // // // // // // // // // // // // // // // // // // //

  loadTarget:function() {
    var pref=Components.classes['@mozilla.org/preferences-service;1']
        .getService(Components.interfaces.nsIPrefBranch);
    var target=pref.getCharPref('extensions.resurrect.target');

    document.getElementById('targetGroup').selectedItem=
        document.getElementById(target);
  },

  saveTarget:function(el) {
    var target=document.getElementById('targetGroup').selectedItem.id;

    var pref=Components.classes['@mozilla.org/preferences-service;1']
        .getService(Components.interfaces.nsIPrefBranch);
    pref.setCharPref('extensions.resurrect.target', target);
  },

// // // // // // // // // // // // // // // // // // // // // // // // // // //

  showDialog:function(url) {
    window.openDialog(
        'chrome://resurrect/content/resurrect-select-mirror.xul',
        '_blank',
        'modal,centerscreen,resizable=no,chrome,dependent',
        getBrowser().contentWindow.document, url);
  },

  clickedHtml:function(event) {
    if ('true'==event.target.getAttribute('disabled')) {
      return;
    }
    if ('keypress' == event.type) {
      if (event.target.parentNode.id != 'resurrect') return;
      if (event.charCode != 32 && event.keyCode != 13) return;
    }

    return resurrect.clickHandler(
        event,
        event.target.ownerDocument,
        event.target.ownerDocument.location.href);
  },

  clickedXul:function(event) {
    resurrect.saveTarget(event.target);

    return resurrect.clickHandler(
        event,
        window.arguments[0],
        window.arguments[1]);
  },

  clickHandler:function(event, contentDoc, rawUrl) {
    resurrect.disableButtons(event.target.ownerDocument);

    // Run the actual code.  After timeout for UI repaint.
    setTimeout(
        resurrect.selectMirror, 1,
        event.target.getAttribute('value'),
        event.target.ownerDocument,
        contentDoc, rawUrl);
  },

  selectMirror:function(mirror, ownerDoc, contentDoc, rawUrl) {
    var gotoUrl=null;
    var encUrl=encodeURIComponent(rawUrl);

    switch (mirror) {
    case 'google':
      gotoUrl='https://www.google.com/search?q=cache:'+encUrl;
      break;
    case 'googletext':
      gotoUrl='https://www.google.com/search?strip=1&q=cache:'+encUrl;
      break;
    case 'archive':
      var dateStr = (new Date()).toISOString().replace(/-|T|:|\..*/g, '');
      gotoUrl='https://wayback.archive.org/web/'+dateStr+'/'+rawUrl;
      break;
    case 'archiveis':
      gotoUrl='https://archive.is/'+rawUrl;
      break;
    case 'webcitation':
      gotoUrl='http://webcitation.org/query.php?url='+encUrl;
      break;
    default:
      return false;
      break;
    }

    if (gotoUrl) {
      if (ownerDoc.getElementById('targetTab').getAttribute('selected')) {
        window.opener.openUILinkIn(gotoUrl, 'tab');
      } else if (ownerDoc.getElementById('targetWin').getAttribute('selected')) {
        // the setTimeout keeps focus from returning to the opener
        setTimeout(function(){
          window.opener.openNewWindowWith(gotoUrl, null, null);
        }, 10);
      } else {
        contentDoc.location.assign(gotoUrl);
      }

      if ('chrome://resurrect/content/resurrect-select-mirror.xul'==window.document.location) {
        // setTimeout avoids errors because the window is gone
        setTimeout(window.close, 0);
      }
    }
  }
};
