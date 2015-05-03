# Documentation

Dead pages, broken links, the scourge of the internet.
Powerhouse sites like Slashdot and Digg can bring a server to its knees.
What do we do when a page is dead but we still want to see it?
Call in the clerics, and perform a resurrection ceremony!
Or, the easier route, use this extension.

## Features 

 * Searches through seven page cache/mirrors:
   * [CoralCDN](http://www.coralcdn.org/)
   * [Google Cache](http://www.google.com/) (plus text-only version)
   * [Yahoo! Cache](http://search.yahoo.com/)
   * [The Internet Archive](http://web.archive.org/)
   * [MSN Cache](http://search.msn.com/)
   * [Gigablast Cache](http://www.gigablast.com/)
   * [WebCite](http://www.webcitation.org/)
   * [Down for everyone?](http://www.isup.me/)

Of course, not every page can be in every cache.
When a page is unavailable, you'll generally see that site's error page.
Hit back and try another one!

 * Accessible:
   * In the context (right-click) menu for the current page, and for all links.
   * In the toolbar, just customize it to drag the button in.
   * With the keyboard: press `Ctrl-Shift-U`
   * Directly in the net error ("Firefox could not load this page...") page.

# Changelog

 * Version 2.1 (Sep 19, 2013)
   * Firefox 22+ compatibility
   * Added isup.me provider
 * Version 2.0.7 (Jun 26, 2011)
   * Firefox 5.0 compatibility.
   * Updated translations from babelzilla.org.
 * Version 2.0.6 (Jan 17, 2011)
   * Firefox 4 compatibility. (#444, #453)
   * Rework `netError.xhtml` modifications to interact better with other extensions.
   * Add translations: cs-CZ, da, de, fr, nl, sr, sv-SE, tr-TR, zh-CN
   * Update translations: ca-AD, el-GR, en-US, es-AR, es-CL, es-ES, fi-FI, hr-HR, it-IT, ja-JP, ko-KR, pl-PL, pt-BR, pt-PT, ru-RU, sl-SI, uk-UA, zh-TW
 * Version 2.0.5 (Nov 12, 2009)
   * Replace "MSN" with "Bing" engine.
   * Firefox 3.6 compatibility flag.
 * Version 2.0.4 (Apr 30, 2009)
   * Compatibility with Firefox 3.5.
   * Visual tweak to the net error page.
   * Remove port number from CoralCDN URLs.
   * Remember the last target (window/tab) and use it as the default next time.
 * Version 2.0.3 (June 27, 2008)
   * Increase the space available for the resurrect UI in the net error page.
   * Use the built-in openUILinkIn method to create a new tab.
 * Version 2.0.2 (May 31, 2008)
   * Various translation updates.
   * Add ja-JP locale.
   * Do not show resurrect buttons in the "net error" page when it doesn't make sense.
 * Version 2.0.1
   * Firefox 3.0 RC1 compatibility.
 * Version 2.0.0
   * Firefox 3.0 beta compatibility.
   * New interface incorporating graphics and more intuitive buttons.
 * Version 1.0.8 (Mar 28, 2007)
   * Disable the cache-selection interface while a synchronous API call is being made.
   * Add translations: ko-KR, fi-FI, ca-AD.
   * Update translations: hr-HR, es-CL.
 * Version 1.0.7 (Feb 19, 2007)
   * Add translations: da-DK, hr-HR, uk-UA, sl-SI, el-GR
 * Version 1.0.6
   * Clerical error, missing?
 * Version 1.0.5
   * Internal fix for locale translations.
 * Version 1.0.4
   * Locale updates.
 * Version 1.0.3
   * Fix a foolish bug that left the in-error-page control broken in the last bugfix.
 * Version 1.0.2
   * Fix bug when using "Resurrect this link" function.
 * Version 1.0.1
   * Fix bug case
   * When a page that couldn't load shows the error page in a background tab, the interface would not work.
 * Version 1.0:
   * Select current tab, new tab, new window for new page.
   * Translations for 9 languages, thanks to BabelZilla.org.
   * Minor code tweaks and improvements.
 * Version 0.6:
   * Switch to using the MSN Search API, instead of screen scraping.
   * Integrate into the net error page.
 * Version 0.5.1
   * Bugfix, broken shortcut key.

# License

Resurrect Pages is released under the MIT license.
