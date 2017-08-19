openInEnum = {
	CURRENT_TAB : 0,
	NEW_TAB     : 1,
	NEW_BGTAB   : 2,
	NEW_WINDOW  : 3
}

var openIn = openInEnum.CURRENT_TAB;
browser.storage.local.get ("openIn").then (function (item) {if (item.openIn) {openIn = item.openIn}}, onError);

function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  }
}

function onRemoved() { }

function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
// top level {{{
browser.contextMenus.create({
  id: "resurrect-page",
  title: browser.i18n.getMessage("contextMenuItemResurrectPage"),
  contexts: ["page"]
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link",
  title: browser.i18n.getMessage("contextMenuItemResurrectLink"),
  contexts: ["link"]
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection",
  title: browser.i18n.getMessage("contextMenuItemResurrectSelection"),
  contexts: ["selection"]
}, onCreated);
//}}}

// resurrect page {{{
browser.contextMenus.create({
  id: "resurrect-page-google",
  title: browser.i18n.getMessage("contextMenuItemResurrectGoogle"),
  icons: { 16: "icons/cacheicons/google.png" },
  contexts: ["all"],
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-googletext",
  title: browser.i18n.getMessage("contextMenuItemResurrectGoogleText"),
  icons: { 16: "icons/cacheicons/google.png" },
  contexts: ["all"],
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-archive",
  title: browser.i18n.getMessage("contextMenuItemResurrectArchive"),
  icons: { 16: "icons/cacheicons/waybackmachine.png" },
  contexts: ["all"],
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-archiveis",
  title: browser.i18n.getMessage("contextMenuItemResurrectArchiveIs"),
  icons: { 16: "icons/cacheicons/archiveis.png" },
  contexts: ["all"],
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-webcitation",
  title: browser.i18n.getMessage("contextMenuItemResurrectWebcitation"),
  icons: { 16: "icons/cacheicons/webcitation.png" },
  contexts: ["all"],
  parentId: "resurrect-page"
}, onCreated);
//}}}

// resurrect link {{{
browser.contextMenus.create({
  id: "resurrect-link-google",
  title: browser.i18n.getMessage("contextMenuItemResurrectGoogle"),
  icons: { 16: "icons/cacheicons/google.png" },
  contexts: ["all"],
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-googletext",
  title: browser.i18n.getMessage("contextMenuItemResurrectGoogleText"),
  icons: { 16: "icons/cacheicons/google.png" },
  contexts: ["all"],
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-archive",
  title: browser.i18n.getMessage("contextMenuItemResurrectArchive"),
  icons: { 16: "icons/cacheicons/waybackmachine.png" },
  contexts: ["all"],
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-archiveis",
  title: browser.i18n.getMessage("contextMenuItemResurrectArchiveIs"),
  icons: { 16: "icons/cacheicons/archiveis.png" },
  contexts: ["all"],
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-webcitation",
  title: browser.i18n.getMessage("contextMenuItemResurrectWebcitation"),
  icons: { 16: "icons/cacheicons/webcitation.png" },
  contexts: ["all"],
  parentId: "resurrect-link"
}, onCreated);
//}}}

// resurrect selection {{{
browser.contextMenus.create({
  id: "resurrect-selection-google",
  title: browser.i18n.getMessage("contextMenuItemResurrectGoogle"),
  icons: { 16: "icons/cacheicons/google.png" },
  contexts: ["all"],
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-googletext",
  title: browser.i18n.getMessage("contextMenuItemResurrectGoogleText"),
  icons: { 16: "icons/cacheicons/google.png" },
  contexts: ["all"],
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-archive",
  title: browser.i18n.getMessage("contextMenuItemResurrectArchive"),
  icons: { 16: "icons/cacheicons/waybackmachine.png" },
  contexts: ["all"],
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-archiveis",
  title: browser.i18n.getMessage("contextMenuItemResurrectArchiveIs"),
  icons: { 16: "icons/cacheicons/archiveis.png" },
  contexts: ["all"],
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-webcitation",
  title: browser.i18n.getMessage("contextMenuItemResurrectWebcitation"),
  icons: { 16: "icons/cacheicons/webcitation.png" },
  contexts: ["all"],
  parentId: "resurrect-selection"
}, onCreated);
//}}}

//config page {{{
browser.contextMenus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"],
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-current-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigCurrentTab"),
  contexts: ["all"],
  checked: true,
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-new-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewTab"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-new-background-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewBackgroundTab"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-page"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-page-new-window",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewWindow"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-page"
}, onCreated);
//}}}

//config link {{{
browser.contextMenus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["all"],
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-current-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigCurrentTab"),
  contexts: ["all"],
  checked: true,
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-new-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewTab"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-new-background-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewBackgroundTab"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-link"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-link-new-window",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewWindow"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-link"
}, onCreated);
//}}}

//config selection {{{
browser.contextMenus.create({
  id: "separator-3",
  type: "separator",
  contexts: ["all"],
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-current-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigCurrentTab"),
  contexts: ["all"],
  checked: true,
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-new-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewTab"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-new-background-tab",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewBackgroundTab"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-selection"
}, onCreated);

browser.contextMenus.create({
  id: "resurrect-selection-new-window",
  type: "radio",
  title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewWindow"),
  contexts: ["all"],
  checked: false,
  parentId: "resurrect-selection"
}, onCreated);
//}}}


browser.contextMenus.onClicked.addListener(function(info, tab) {
  var gotoUrl=null;

  var rawUrl = info.pageUrl;

  switch (info.menuItemId) {
    case "resurrect-page-google":
      gotoUrl='https://www.google.com/search?q=cache:'+encodeURIComponent(info.pageUrl);
      break;
    case "resurrect-link-google":
      gotoUrl='https://www.google.com/search?q=cache:'+encodeURIComponent(info.linkUrl);
      break;
    case "resurrect-selection-google":
      gotoUrl='https://www.google.com/search?q=cache:'+encodeURIComponent(info.selectionText);
      break;

    case "resurrect-page-googletext":
      gotoUrl='https://www.google.com/search?strip=1&q=cache:'+encodeURIComponent(info.pageUrl);
      break;
    case "resurrect-link-googletext":
      gotoUrl='https://www.google.com/search?strip=1&q=cache:'+encodeURIComponent(info.linkUrl);
      break;
    case "resurrect-selection-googletext":
      gotoUrl='https://www.google.com/search?strip=1&q=cache:'+encodeURIComponent(info.selectionText);
      break;

    case "resurrect-page-archive":
      var dateStr = (new Date()).toISOString().replace(/-|T|:|\..*/g, '');
      gotoUrl='https://web.archive.org/web/'+dateStr+'/'+info.pageUrl
      break;
    case "resurrect-link-archive":
      var dateStr = (new Date()).toISOString().replace(/-|T|:|\..*/g, '');
      gotoUrl='https://web.archive.org/web/'+dateStr+'/'+info.linkUrl
      break;
    case "resurrect-selection-archive":
      var dateStr = (new Date()).toISOString().replace(/-|T|:|\..*/g, '');
      gotoUrl='https://web.archive.org/web/'+dateStr+'/'+info.selectionText
      break;

    case "resurrect-page-archiveis":
      gotoUrl='https://archive.is/'+info.pageUrl;
      break;
    case "resurrect-link-archiveis":
      gotoUrl='https://archive.is/'+info.linkUrl;
      break;
    case "resurrect-selection-archiveis":
      gotoUrl='https://archive.is/'+info.selectionText;
      break;

    case "resurrect-page-webcitation":
      gotoUrl='http://webcitation.org/query.php?url='+encodeURIComponent(info.pageUrl);
      break;
    case "resurrect-link-webcitation":
      gotoUrl='http://webcitation.org/query.php?url='+encodeURIComponent(info.linkUrl);
      break;
    case "resurrect-selection-webcitation":
      gotoUrl='http://webcitation.org/query.php?url='+encodeURIComponent(info.selectionText);
      break;

    case "resurrect-page-current-tab":
    case "resurrect-link-current-tab":
    case "resurrect-selection-current-tab":
      openIn = openInEnum.CURRENT_TAB;
      browser.storage.local.set({openIn: openIn});
      return;
    case "resurrect-page-new-tab":
    case "resurrect-link-new-tab":
    case "resurrect-selection-new-tab":
      openIn = openInEnum.NEW_TAB;
      browser.storage.local.set({openIn: openIn});
      return;
    case "resurrect-page-new-background-tab":
    case "resurrect-link-new-background-tab":
    case "resurrect-selection-new-background-tab":
      openIn = openInEnum.NEW_BGTAB;
      browser.storage.local.set({openIn: openIn});
      return;
    case "resurrect-page-new-window":
    case "resurrect-link-new-window":
    case "resurrect-selection-new-window":
      openIn = openInEnum.NEW_WINDOW;
      browser.storage.local.set({openIn: openIn});
      return;
  }

  if (gotoUrl) {
    console.log ("would've gone to " + gotoUrl + " opened in " + openIn);
    switch (openIn) {
    case openInEnum.CURRENT_TAB:
      browser.tabs.update({ "url": gotoUrl});
      break;
    case openInEnum.NEW_TAB:
      browser.tabs.create({ "url": gotoUrl});
      break;
    case openInEnum.NEW_BGTAB:
      browser.tabs.create({ "url": gotoUrl, "active":false});
      break;
    case openInEnum.NEW_WINDOW:
      browser.windows.create({ "url": gotoUrl});
      break;
    }
  }
});


