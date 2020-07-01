//const animeRegion = 'html/popup.html'.querySelector('.region');
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({favorites: []});
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'goyabu.com'},
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

