var resurrect={

  originalDoc:null,

// // // // // // // // // // // // // // // // // // // // // // // // // // //

  onLoad:function() {
    window.removeEventListener('load', resurrect.onLoad, false);

    document.getElementById('contentAreaContextMenu')
        .addEventListener('popupshowing', resurrect.toggleContextItems, false);

    window.document.getElementById('appcontent').addEventListener(
        'DOMContentLoaded', resurrect.contentDomLoad, false);
  },

  toggleContextItems:function(event) {
    resurrect.clickTarget=event.target;

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

    if (contentDoc.documentURI.match(/^about:neterror/)) {
      // Inject our content...
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'chrome://resurrect/content/netError.xhtml', false);
      xhr.send(null);
      var resurrectFieldset = xhr.responseXML.getElementById('resurrect');
      var newFieldset = contentDoc.adoptNode(resurrectFieldset);
      var container = contentDoc.getElementById('errorPageContainer');
      container.appendChild(newFieldset);
      // ...including the CSS.
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
    }
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
    var el=document.popupNode;

    try {
      while (el && el.tagName && 'A'!=el.tagName.toUpperCase()) {
        el=el.parentNode;
      }
      resurrect.showDialog(el.href);
    } catch (e) { }
    return null;
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
    resurrect.originalDoc=getBrowser().contentWindow.document;

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
    case 'coralcdn':
      gotoUrl=rawUrl.substring(0, 8)+
          rawUrl.substring(8).replace(/\//, '.nyud.net/');
      break;
    case 'google':
      gotoUrl='http://www.google.com/search?q=cache:'+encUrl;
      break;
    case 'googletext':
      gotoUrl='http://www.google.com/search?strip=1&q=cache:'+encUrl;
      break;
    case 'archive':
      gotoUrl='http://wayback.archive.org/web/*/'+rawUrl;
      break;
    case 'archiveis':
      gotoUrl='https://archive.is/'+rawUrl;
      break;
    case 'bing':
      var xhr=new XMLHttpRequest();
      xhr.open('GET',
          'http://api.search.live.net/xml.aspx'+
          '?AppId=FD382E93B5ABC456C5E34C238A906CAB1E6F9875'+
          '&Query=url:'+encUrl+
          '&Sources=web&Web.Count=1',
          false);
      xhr.send(null);

      try {
        var c=xhr.responseXML.getElementsByTagName('web:CacheUrl');
        gotoUrl=c[0].textContent;
      } catch (e) {
        gotoUrl='http://www.bing.com/search?q=url:'+encUrl;
      }

      break;
    case 'gigablast':
      var siteRegex = new RegExp('://([^/]+)');
      var apiUrl=[
          'http://feed.gigablast.com/search',
          '?q=url:', encUrl,
          '&site=', (siteRegex.match(rawUrl)[1]),
          '&n=1&ns=0&raw=9&bq=0&nrt=0'
          ].join('');

      var xhr=new XMLHttpRequest();
      xhr.open('GET', apiUrl, false);
      xhr.send(null);

      try {
        var docId=xhr.responseXML
            .getElementsByTagName('docId')[0].textContent;
        gotoUrl='http://www.gigablast.com/index.php'
            +'?page=get&ih=1&ibh=1&cas=0&d='
            +docId;
      } catch (e) {
        gotoUrl='http://www.gigablast.com/index.php?q=url:'+encUrl;
      }

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
