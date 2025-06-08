chrome.storage.local.get('openIn', res => {
  document.querySelectorAll('input[type=radio]').forEach(el => {
    el.checked = el.value == res.openIn;
  });
});


function onOpenInChange() {
  setOpenIn(document.querySelector('input[name="openIn"]:checked').value);
};
document.querySelectorAll('input[type=radio]').forEach(el => {
  el.addEventListener('click', onOpenInChange, true);
});


function resurrect(gen) {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, tabObj => {
      logLastError();

      var url = processPageUrlEdgeCases(tabObj[0].url);

      if (url != null)
      {
        let archiveUrl = gen(url);
        console.info('Resurrecting via URL', archiveUrl);
        goToUrl(archiveUrl, openIn, tabObj[0].id);
      }

      window.close();
    });
  }
}


document.querySelectorAll('button').forEach(el => {
  el.addEventListener(
      'click', resurrect(window[el.getAttribute('data-gen')]), true);
});
