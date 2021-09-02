var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');


s.onload = function() {
    this.remove();
};

document.head.appendChild(s);


chrome.storage.sync.get(['userNamesToFilter'], function(result) {
    console.log("final usernames received in content: " + result.userNamesToFilter);
    var usernames = result.userNamesToFilter;

    localStorage.setItem("usernames", usernames);

})