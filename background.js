var openIn = openInEnum.CURRENT_TAB;
browser.storage.local.get ("openIn").then (function (item) {
  if (item.openIn) {openIn = item.openIn}
  /*
  Create all the context menu items.
  */
  // top level {{{
  browser.contextMenus.create({
    id: "ResurrectPage",
    title: browser.i18n.getMessage("ResurrectPage"),
    contexts: ["page"]
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLink",
    title: browser.i18n.getMessage("ResurrectLink"),
    contexts: ["link"]
  }, onCreated);
  //}}}
  
  // resurrect page {{{
  browser.contextMenus.create({
    id: "ResurrectPageGoogle",
    title: browser.i18n.getMessage("ResurrectGoogle"),
    icons: { 16: "icons/cacheicons/google.png" },
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageGoogleText",
    title: browser.i18n.getMessage("ResurrectGoogleText"),
    icons: { 16: "icons/cacheicons/google.png" },
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageArchive",
    title: browser.i18n.getMessage("ResurrectArchive"),
    icons: { 16: "icons/cacheicons/waybackmachine.png" },
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageArchiveIs",
    title: browser.i18n.getMessage("ResurrectArchiveIs"),
    icons: { 16: "icons/cacheicons/archiveis.png" },
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageWebcitation",
    title: browser.i18n.getMessage("ResurrectWebcitation"),
    icons: { 16: "icons/cacheicons/webcitation.png" },
    parentId: "ResurrectPage"
  }, onCreated);
  //}}}
  
  // resurrect link {{{
  browser.contextMenus.create({
    id: "ResurrectLinkGoogle",
    title: browser.i18n.getMessage("ResurrectGoogle"),
    icons: { 16: "icons/cacheicons/google.png" },
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkGoogleText",
    title: browser.i18n.getMessage("ResurrectGoogleText"),
    icons: { 16: "icons/cacheicons/google.png" },
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkArchive",
    title: browser.i18n.getMessage("ResurrectArchive"),
    icons: { 16: "icons/cacheicons/waybackmachine.png" },
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkArchiveIs",
    title: browser.i18n.getMessage("ResurrectArchiveIs"),
    icons: { 16: "icons/cacheicons/archiveis.png" },
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkWebcitation",
    title: browser.i18n.getMessage("ResurrectWebcitation"),
    icons: { 16: "icons/cacheicons/webcitation.png" },
    parentId: "ResurrectLink"
  }, onCreated);
  //}}}
  
  //config page {{{
  browser.contextMenus.create({
    id: "separator-1",
    type: "separator",
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageInCurrentTab",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInCurrentTab"),
    checked: openIn==openInEnum.CURRENT_TAB,
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageInNewTab",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInNewTab"),
    checked: openIn==openInEnum.NEW_TAB,
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageInNewBGTab",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInNewBGTab"),
    checked: openIn==openInEnum.NEW_BGTAB,
    parentId: "ResurrectPage"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectPageInNewWindow",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInNewWindow"),
    checked: openIn==openInEnum.NEW_WINDOW,
    parentId: "ResurrectPage"
  }, onCreated);
  //}}}
  
  //config link {{{
  browser.contextMenus.create({
    id: "separator-2",
    type: "separator",
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkInCurrentTab",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInCurrentTab"),
    checked: openIn==openInEnum.CURRENT_TAB,
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkInNewTab",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInNewTab"),
    checked: openIn==openInEnum.NEW_TAB,
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkInNewBGTab",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInNewBGTab"),
    checked: openIn==openInEnum.NEW_BGTAB,
    parentId: "ResurrectLink"
  }, onCreated);
  
  browser.contextMenus.create({
    id: "ResurrectLinkInNewWindow",
    type: "radio",
    title: browser.i18n.getMessage("ResurrectInNewWindow"),
    checked: openIn==openInEnum.NEW_WINDOW,
    parentId: "ResurrectLink"
  }, onCreated);
  //}}}
  
  
}, onError);

function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log('Error: '+browser.runtime.lastError);
  }
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "ResurrectPageGoogle":      goToURL (genGoogleURL(info.pageUrl), openIn); break;
    case "ResurrectLinkGoogle":      goToURL (genGoogleURL(info.linkUrl), openIn); break;

    case "ResurrectPageGoogleText":  goToURL (genGoogleTextURL(info.pageUrl), openIn); break;
    case "ResurrectLinkGoogleText":  goToURL (genGoogleTextURL(info.linkUrl), openIn); break;

    case "ResurrectPageArchive":     goToURL (genArchiveURL(info.pageUrl), openIn); break;
    case "ResurrectLinkArchive":     goToURL (genArchiveURL(info.linkUrl), openIn); break;

    case "ResurrectPageArchiveIs":   goToURL (genArchiveIsURL(info.pageUrl), openIn); break;
    case "ResurrectLinkArchiveIs":   goToURL (genArchiveIsURL(info.linkUrl), openIn); break;

    case "ResurrectPageWebcitation": goToURL (genWebcitationURL(info.pageUrl), openIn); break;
    case "ResurrectLinkWebcitation": goToURL (genWebcitationURL(info.linkUrl), openIn); break;

    case "ResurrectPageInCurrentTab":
    case "ResurrectLinkInCurrentTab":
      setOpenIn (openInEnum.CURRENT_TAB);
      return;
    case "ResurrectPageInNewTab":
    case "ResurrectLinkInNewTab":
      setOpenIn (openInEnum.NEW_TAB);
      return;
    case "ResurrectPageInNewBGTab":
    case "ResurrectLinkInNewBGTab":
      setOpenIn (openInEnum.NEW_BGTAB);
      return;
    case "ResurrectPageInNewWindow":
    case "ResurrectLinkInNewWindow":
      setOpenIn (openInEnum.NEW_WINDOW);
      return;
  }
});
