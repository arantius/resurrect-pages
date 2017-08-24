chrome.storage.local.get('openIn', res => {
  document.querySelectorAll('input[type=radio]').forEach(el => {
    el.checked = el.value === res.openIn;
  });
});


document.querySelectorAll('*[data-locale]').forEach(el => {
  el.appendChild(document.createTextNode(
      ' ' + chrome.i18n.getMessage(el.getAttribute('data-locale'))
      ));
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
      goToUrl(gen(tabObj[0].url), openIn);
      window.close();
    });
  }
}
document.querySelectorAll('button').forEach(el => {
  el.addEventListener(
      'click', resurrect(window[el.getAttribute('data-gen')]), true);
});
