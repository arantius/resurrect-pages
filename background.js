var openIn = openInEnum.CURRENT_TAB;
browser.storage.local.get ("openIn").then (function (item) {
  if (item.openIn) {openIn = item.openIn}
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
    id: "resurrect-slct-google",
    title: browser.i18n.getMessage("contextMenuItemResurrectGoogle"),
    icons: { 16: "icons/cacheicons/google.png" },
    contexts: ["all"],
    parentId: "resurrect-selection"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-slct-googletext",
    title: browser.i18n.getMessage("contextMenuItemResurrectGoogleText"),
    icons: { 16: "icons/cacheicons/google.png" },
    contexts: ["all"],
    parentId: "resurrect-selection"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-slct-archive",
    title: browser.i18n.getMessage("contextMenuItemResurrectArchive"),
    icons: { 16: "icons/cacheicons/waybackmachine.png" },
    contexts: ["all"],
    parentId: "resurrect-selection"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-slct-archiveis",
    title: browser.i18n.getMessage("contextMenuItemResurrectArchiveIs"),
    icons: { 16: "icons/cacheicons/archiveis.png" },
    contexts: ["all"],
    parentId: "resurrect-selection"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-slct-webcitation",
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
    checked: openIn==openInEnum.CURRENT_TAB,
    parentId: "resurrect-page"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-page-new-tab",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewTab"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_TAB,
    parentId: "resurrect-page"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-page-new-background-tab",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewBackgroundTab"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_BGTAB,
    parentId: "resurrect-page"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-page-new-window",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewWindow"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_WINDOW,
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
    checked: openIn==openInEnum.CURRENT_TAB,
    parentId: "resurrect-link"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-link-new-tab",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewTab"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_TAB,
    parentId: "resurrect-link"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-link-new-background-tab",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewBackgroundTab"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_BGTAB,
    parentId: "resurrect-link"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-link-new-window",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewWindow"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_WINDOW,
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
    id: "resurrect-slct-current-tab",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigCurrentTab"),
    contexts: ["all"],
    checked: openIn==openInEnum.CURRENT_TAB,
    parentId: "resurrect-selection"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-slct-new-tab",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewTab"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_TAB,
    parentId: "resurrect-selection"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-slct-new-background-tab",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewBackgroundTab"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_BGTAB,
    parentId: "resurrect-selection"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "resurrect-slct-new-window",
    type: "radio",
    title: browser.i18n.getMessage("contextMenuItemResurrectConfigNewWindow"),
    contexts: ["all"],
    checked: openIn==openInEnum.NEW_WINDOW,
    parentId: "resurrect-selection"
  }, onCreated);
  //}}}
  
}, onError);

function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log('Error: '+browser.runtime.lastError);
  }
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
  var gotoUrl=null;

  var rawUrl = info.pageUrl;

  switch (info.menuItemId) {
    case "resurrect-page-google":      goToURL (genGoogleURL(info.pageUrl), openIn); break;
    case "resurrect-link-google":      goToURL (genGoogleURL(info.linkUrl), openIn); break;
    case "resurrect-slct-google":      goToURL (genGoogleURL(info.selectionText), openIn); break;

    case "resurrect-page-googletext":  goToURL (genGoogleTextURL(info.pageUrl), openIn); break;
    case "resurrect-link-googletext":  goToURL (genGoogleTextURL(info.linkUrl), openIn); break;
    case "resurrect-slct-googletext":  goToURL (genGoogleTextURL(info.selectionText), openIn); break;

    case "resurrect-page-archive":     goToURL (genIAURL(info.pageUrl), openIn); break;
    case "resurrect-link-archive":     goToURL (genIAURL(info.linkUrl), openIn); break;
    case "resurrect-slct-archive":     goToURL (genIAURL(info.selectionText), openIn); break;

    case "resurrect-page-archiveis":   goToURL (genArchiveIsURL(info.pageUrl), openIn); break;
    case "resurrect-link-archiveis":   goToURL (genArchiveIsURL(info.linkUrl), openIn); break;
    case "resurrect-slct-archiveis":   goToURL (genArchiveIsURL(info.selectionText), openIn); break;

    case "resurrect-page-webcitation": goToURL (genWebCiteURL(info.pageUrl), openIn); break;
    case "resurrect-link-webcitation": goToURL (genWebCiteURL(info.linkUrl), openIn); break;
    case "resurrect-slct-webcitation": goToURL (genWebCiteURL(info.selectionText), openIn); break;

    case "resurrect-page-current-tab":
    case "resurrect-link-current-tab":
    case "resurrect-slct-current-tab":
      setOpenIn (openInEnum.CURRENT_TAB);
      return;
    case "resurrect-page-new-tab":
    case "resurrect-link-new-tab":
    case "resurrect-slct-new-tab":
      setOpenIn (openInEnum.NEW_TAB);
      return;
    case "resurrect-page-new-background-tab":
    case "resurrect-link-new-background-tab":
    case "resurrect-slct-new-background-tab":
      setOpenIn (openInEnum.NEW_BGTAB);
      return;
    case "resurrect-page-new-window":
    case "resurrect-link-new-window":
    case "resurrect-slct-new-window":
      setOpenIn (openInEnum.NEW_WINDOW);
      return;
  }
});
