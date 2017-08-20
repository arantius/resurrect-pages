openInEnum = {
	CURRENT_TAB : 0,
	NEW_TAB     : 1,
	NEW_BGTAB   : 2,
	NEW_WINDOW  : 3
}
let openIn = openInEnum.CURRENT_TAB;


chrome.storage.local.get('openIn', item => {
  if (item.openIn) {
    openIn = item.openIn;
  }
});


function onError(error) {
  if (chrome.runtime.lastError) {
    console.error('Resurrect error: ', chrome.runtime.lastError);
  }
}


function genGoogleUrl(url) {
  return 'https://www.google.com/search?q=cache:'+encodeURIComponent(url);
}

function genGoogleTextUrl(url) {
  return 'https://www.google.com/search?strip=1&q=cache:'+encodeURIComponent(url);
}

function genIaUrl(url) {
  let dateStr =(new Date()).toISOString().replace(/-|T|:|\..*/g, '');
  return 'https://web.archive.org/web/'+dateStr+'/'+url;
}

function genArchiveIsUrl(url) {
  return 'https://archive.is/'+url;
}

function genWebCiteUrl(url) {
  return 'http://webcitation.org/query.php?url='+encodeURIComponent(url);
}


function setOpenIn(where) {
  openIn = where;
  chrome.storage.local.set({openIn: openIn}, onError);
  updateContextRadios();
}


function updateContextRadios() {
  ['page', 'link'].forEach(context => {
    chrome.contextMenus.update(
        'resurrect-current-tab-' + context,
        {checked: openIn == openInEnum.CURRENT_TAB});
    chrome.contextMenus.update(
        'resurrect-new-tab-' + context,
        {checked: openIn == openInEnum.NEW_TAB});
    chrome.contextMenus.update(
        'resurrect-new-bg-tab-' + context,
        {checked: openIn == openInEnum.NEW_BGTAB});
    chrome.contextMenus.update(
        'resurrect-new-window-' + context,
        {checked: openIn == openInEnum.NEW_WINDOW});
  });
}


function goToUrl(url, where) {
  switch(Number(where)) {
    case openInEnum.CURRENT_TAB:
      chrome.tabs.update({'url': url});
      break;
    case openInEnum.NEW_TAB:
      chrome.tabs.create({'url': url});
      break;
    case openInEnum.NEW_BGTAB:
      chrome.tabs.create({'url': url, 'active': false});
      break;
    case openInEnum.NEW_WINDOW:
      chrome.windows.create({'url': url});
      break;
  }
}
