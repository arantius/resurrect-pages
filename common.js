openInEnum = {
	CURRENT_TAB : 0,
	NEW_TAB     : 1,
	NEW_BGTAB   : 2,
	NEW_WINDOW  : 3
}

var openIn = openInEnum.CURRENT_TAB;
browser.storage.local.get ("openIn").then (function (item) { if (item.openIn) {openIn = item.openIn} }, onError);

function onError(error) {
  console.log('Error: '+error);
}

function genGoogleURL (url) {
  return 'https://www.google.com/search?q=cache:'+encodeURIComponent(url);
}

function genGoogleTextURL (url) {
  return 'https://www.google.com/search?strip=1&q=cache:'+encodeURIComponent(url);
}

function genIAURL (url) {
  var dateStr = (new Date()).toISOString().replace(/-|T|:|\..*/g, '');
  return 'https://web.archive.org/web/'+dateStr+'/'+url;
}

function genArchiveIsURL (url) {
  return 'https://archive.is/'+url;
}

function genWebCiteURL (url) {
  return 'http://webcitation.org/query.php?url='+encodeURIComponent(url);
}

function setOpenIn (where) {
  openIn = where;
  browser.storage.local.set({openIn: openIn}).then(null, onError);
  update_context_radios();
}

function update_context_radios() {
  browser.contextMenus.update ("resurrect-page-current-tab"       , {checked: openIn==openInEnum.CURRENT_TAB});
  browser.contextMenus.update ("resurrect-page-new-tab"           , {checked: openIn==openInEnum.NEW_TAB});
  browser.contextMenus.update ("resurrect-page-new-background-tab", {checked: openIn==openInEnum.NEW_BGTAB});
  browser.contextMenus.update ("resurrect-page-new-window"        , {checked: openIn==openInEnum.NEW_WINDOW});

  browser.contextMenus.update ("resurrect-link-current-tab"       , {checked: openIn==openInEnum.CURRENT_TAB});
  browser.contextMenus.update ("resurrect-link-new-tab"           , {checked: openIn==openInEnum.NEW_TAB});
  browser.contextMenus.update ("resurrect-link-new-background-tab", {checked: openIn==openInEnum.NEW_BGTAB});
  browser.contextMenus.update ("resurrect-link-new-window"        , {checked: openIn==openInEnum.NEW_WINDOW});

  browser.contextMenus.update ("resurrect-slct-current-tab"       , {checked: openIn==openInEnum.CURRENT_TAB});
  browser.contextMenus.update ("resurrect-slct-new-tab"           , {checked: openIn==openInEnum.NEW_TAB});
  browser.contextMenus.update ("resurrect-slct-new-background-tab", {checked: openIn==openInEnum.NEW_BGTAB});
  browser.contextMenus.update ("resurrect-slct-new-window"        , {checked: openIn==openInEnum.NEW_WINDOW});
}

function goToURL (url, where) {
  switch (Number(where)) {
  case openInEnum.CURRENT_TAB:
    browser.tabs.update({ "url": url});
    break;
  case openInEnum.NEW_TAB:
    browser.tabs.create({ "url": url});
    break;
  case openInEnum.NEW_BGTAB:
    browser.tabs.create({ "url": url, "active":false});
    break;
  case openInEnum.NEW_WINDOW:
    browser.windows.create({ "url": url});
    break;
  }
}
