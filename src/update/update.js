(function() {

    /*
     * Track pageview
     */
    chrome.runtime.sendMessage({
        action:	'trackPageview',
        page:	'update.html'
    });

    /*
     * Locale
     */
    var elements = document.getElementsByTagName('*');
    for (var i=0, ilen=elements.length; i<ilen; i++) {
        var element = elements[i];
        if (element && element.dataset && element.dataset.message) {
            element.innerHTML = chrome.i18n.getMessage(element.dataset.message);
        }
    }

    /*
     * Links
     */
    var links = document.getElementsByTagName('a');
    for (var i= 0, ilen=links.length; i<ilen; i++) {
        var link = links[i];
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href);
            // track link click
            chrome.runtime.sendMessage(
                {
                    action:	'trackEvent',
                    args:	['Link', 'click', this.href]
                }
            );
        }, false);
    }

    /*
     * Header
     */
	var h1 = document.querySelector('h1');
	var headerText = '';

	if (location.hash === '#install') {
		headerText = chrome.i18n.getMessage('updatePageHeaderInstall');
	}
	else {
    	headerText = chrome.i18n.getMessage('updatePageHeader', chrome.runtime.getManifest().version);
	}

	h1.innerHTML = headerText;

})();