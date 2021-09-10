/**
 * injecting the script into twitter's elements, which
 * will filter tweets.
 */
var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');


s.onload = function() {
    this.remove();
};

document.head.appendChild(s);

/**
 * get the list of usernames to filter and store them
 * in local storage for script.js to use.
 */
chrome.storage.sync.get(['userNamesToFilter'], function(result) {
    var usernames = result.userNamesToFilter;

    localStorage.setItem("usernames", usernames);

})