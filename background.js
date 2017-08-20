function onCreated(n) {
}


chrome.storage.local.get('openIn', item => {
  if (item.openIn) {
    openIn = item.openIn;
  }

  function addResurrectItem(context, i18n, id, icon) {
    chrome.contextMenus.create({
      id: 'resurrect-' + id + '-' + context,
      title: chrome.i18n.getMessage('resurrect' + i18n),
      icons: {16: 'icons/cacheicons/' + icon + '.png'},
      contexts: [context],
      parentId: 'resurrect-' + context
    }, onCreated);
  }

  function addConfigItem(context, i18n, where, checked) {
    chrome.contextMenus.create({
      id: 'resurrect-' + where + '-' + context,
      type: 'radio',
      title: chrome.i18n.getMessage('resurrectConfig' + i18n),
      contexts: [context],
      checked: checked,
      parentId: 'resurrect-' + context
    }, onCreated);
  }

  ['page', 'link'].forEach(context => {
    chrome.contextMenus.create({
      id: 'resurrect-' + context,
      title: chrome.i18n.getMessage('resurrect_' + context),
      contexts: [context]
    }, onCreated);

    addResurrectItem(context, 'Google', 'google', 'google');
    addResurrectItem(context, 'GoogleText', 'google-text', 'google');
    addResurrectItem(context, 'Archive', 'archive', 'waybackmachine');
    addResurrectItem(context, 'ArchiveIs', 'archiveis', 'archiveis');
    addResurrectItem(context, 'Webcitation', 'webcitation', 'webcitation');

    chrome.contextMenus.create({
      id: 'resurrect-separator-config-' + context,
      type: 'separator',
      contexts: [context],
      parentId: 'resurrect-' + context
    }, onCreated);

    addConfigItem(
        context, 'CurrentTab', 'current-tab', openIn == openInEnum.CURRENT_TAB);
    addConfigItem(
        context, 'NewTab', 'new-tab', openIn == openInEnum.NEW_TAB);
    addConfigItem(
        context, 'BgTab', 'bg-tab', openIn == openInEnum.BG_TAB);
    addConfigItem(
        context, 'NewWindow', 'new-window', openIn == openInEnum.NEW_WINDOW);
  });
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  let id = info.menuItemId;
  let url = null;
  if (id.endsWith('-page')) {
    url = info.pageUrl;
  } else if (id.endsWith('-link')) {
    url = info.linkUrl;
  }

  if (id.startsWith('resurrect-google-')) {
    goToUrl(genGoogleUrl(url), openIn);
  } else if (id.startsWith('resurrect-googletext-')) {
    goToUrl(genGoogleTextUrl(url), openIn);
  } else if (id.startsWith('resurrect-archive-')) {
    goToUrl(genIaUrl(url), openIn);
  } else if (id.startsWith('resurrect-archiveis-')) {
    goToUrl(genArchiveIsUrl(url), openIn);
  } else if (id.startsWith('resurrect-webcitation-')) {
    goToUrl(genWebCiteUrl(url), openIn);
  } else if (id.startsWith('resurrect-current-tab-')) {
    setOpenIn(openInEnum.CURRENT_TAB);
  } else if (id.startsWith('resurrect-new-tab-')) {
    setOpenIn(openInEnum.NEW_TAB);
  } else if (id.startsWith('resurrect-bg-tab-')) {
    setOpenIn(openInEnum.NEW_BGTAB);
  } else if (id.startsWith('resurrect-new-window-')) {
    setOpenIn(openInEnum.NEW_WINDOW);
  }
});
