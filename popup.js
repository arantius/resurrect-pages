document.addEventListener('DOMContentLoaded', function() {
  browser.storage.local.get ("openIn").then(function(res) {
    switch (Number(res.openIn)) {
    case openInEnum.CURRENT_TAB:
      document.querySelector("#current").checked = true;
      break;
    case openInEnum.NEW_TAB:
      document.querySelector("#newtabfg").checked = true;
      break;
    case openInEnum.NEW_BGTAB:
      document.querySelector("#newtabbg").checked = true;
      break;
    case openInEnum.NEW_WINDOW:
      document.querySelector("#newwin").checked = true;
      break;
    default:
      document.querySelector("#current").checked = true;
onError("can't read openIn");
    }
  });

  document.querySelector("#lc").innerHTML  = browser.i18n.getMessage("contextMenuItemResurrectConfigCurrentTab");
  document.querySelector("#ltf").innerHTML = browser.i18n.getMessage("contextMenuItemResurrectConfigNewTab");
  document.querySelector("#ltb").innerHTML = browser.i18n.getMessage("contextMenuItemResurrectConfigNewBackgroundTab");
  document.querySelector("#lw").innerHTML  = browser.i18n.getMessage("contextMenuItemResurrectConfigNewWindow");

  document.querySelector("#current").onchange  = function(){setOpenIn(document.querySelector('input[name="openIn"]:checked').value)};
  document.querySelector("#newtabfg").onchange = function(){setOpenIn(document.querySelector('input[name="openIn"]:checked').value)};
  document.querySelector("#newtabbg").onchange = function(){setOpenIn(document.querySelector('input[name="openIn"]:checked').value)};
  document.querySelector("#newwin").onchange   = function(){setOpenIn(document.querySelector('input[name="openIn"]:checked').value)};

  document.querySelector("#resurrectWithGoogle").value          = browser.i18n.getMessage("contextMenuItemResurrectGoogle");
  document.querySelector("#resurrectWithGoogleText").value      = browser.i18n.getMessage("contextMenuItemResurrectGoogleText");
  document.querySelector("#resurrectWithInternetArchive").value = browser.i18n.getMessage("contextMenuItemResurrectArchive");
  document.querySelector("#resurrectWithArchiveIs").value       = browser.i18n.getMessage("contextMenuItemResurrectArchiveIs");
  document.querySelector("#resurrectWithWebCite").value         = browser.i18n.getMessage("contextMenuItemResurrectWebcitation");

  browser.tabs.query({active:true,currentWindow:true}).then(function(tabObj){
    pageURL = tabObj[0].url;
    document.querySelector("#resurrectWithGoogle").onclick          = function(){goToURL (genGoogleURL    (pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithGoogleText").onclick      = function(){goToURL (genGoogleTextURL(pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithInternetArchive").onclick = function(){goToURL (genIAURL        (pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithArchiveIs").onclick       = function(){goToURL (genArchiveIsURL (pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithWebCite").onclick         = function(){goToURL (genWebCiteURL   (pageURL), openIn);window.close()};
  }, onError);
});
