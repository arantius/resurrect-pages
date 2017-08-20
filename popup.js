updatePopupRadios = function () {
    setOpenIn(document.querySelector('input[name="openIn"]:checked').value)
}
document.addEventListener('DOMContentLoaded', function() {
  browser.storage.local.get ("openIn").then(function(res) {
    switch (Number(res.openIn)) {
    case openInEnum.CURRENT_TAB:
      document.querySelector("#ResurrectInCurrentTab").checked = true;
      break;
    case openInEnum.NEW_TAB:
      document.querySelector("#ResurrectInNewTab").checked = true;
      break;
    case openInEnum.NEW_BGTAB:
      document.querySelector("#ResurrectInNewBGTab").checked = true;
      break;
    case openInEnum.NEW_WINDOW:
      document.querySelector("#ResurrectInNewWindow").checked = true;
      break;
    default:
      document.querySelector("#ResurrectInCurrentTab").checked = true;
      onError("can't read openIn from local storage");
    }
  });

  document.querySelector("#labelGoogle").innerHTML      = browser.i18n.getMessage("ResurrectGoogle");
  document.querySelector("#labelGoogleText").innerHTML  = browser.i18n.getMessage("ResurrectGoogleText");
  document.querySelector("#labelArchive").innerHTML     = browser.i18n.getMessage("ResurrectArchive");
  document.querySelector("#labelArchiveIs").innerHTML   = browser.i18n.getMessage("ResurrectArchiveIs");
  document.querySelector("#labelWebcitation").innerHTML = browser.i18n.getMessage("ResurrectWebcitation");

  document.querySelector("#labelCurrentTab").innerHTML  = browser.i18n.getMessage("ResurrectInCurrentTab");
  document.querySelector("#labelNewTab").innerHTML      = browser.i18n.getMessage("ResurrectInNewTab");
  document.querySelector("#labelNewBGTab").innerHTML    = browser.i18n.getMessage("ResurrectInNewBGTab");
  document.querySelector("#labelNewWindow").innerHTML   = browser.i18n.getMessage("ResurrectInNewWindow");

  document.querySelector("#ResurrectInCurrentTab").onchange = updatePopupRadios
  document.querySelector("#ResurrectInNewTab").onchange     = updatePopupRadios
  document.querySelector("#ResurrectInNewBGTab").onchange   = updatePopupRadios
  document.querySelector("#ResurrectInNewWindow").onchange  = updatePopupRadios

  browser.tabs.query({active:true,currentWindow:true}).then(function(tabObj){
    pageURL = tabObj[0].url;
    document.querySelector("#resurrectWithGoogle").onclick      = function(){goToURL (genGoogleURL     (pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithGoogleText").onclick  = function(){goToURL (genGoogleTextURL (pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithArchive").onclick     = function(){goToURL (genArchiveURL    (pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithArchiveIs").onclick   = function(){goToURL (genArchiveIsURL  (pageURL), openIn);window.close()};
    document.querySelector("#resurrectWithWebcitation").onclick = function(){goToURL (genWebcitationURL(pageURL), openIn);window.close()};
  }, onError);
});
