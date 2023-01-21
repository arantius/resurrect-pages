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
      
      var og_url = tabObj[0].url;
      if (og_url.startsWith('about:reader?url=')) {
        og_url = decodeURIComponent(og_url.replace('about:reader?url=', ''));
      }
      let url = gen(og_url);

      console.info('Resurrecting via URL', url);
      goToUrl(url, openIn, tabObj[0].id);
      window.close();
    });
  }
}


document.querySelectorAll('button').forEach(el => {
  el.addEventListener(
      'click', resurrect(window[el.getAttribute('data-gen')]), true);
});
