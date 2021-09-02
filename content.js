var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');


s.onload = function() {
    this.remove();
};

document.head.appendChild(s);


chrome.storage.sync.get(['userNamesToFilter'], function(result) {
    var usernames = result.userNamesToFilter;

    localStorage.setItem("usernames", usernames);

})