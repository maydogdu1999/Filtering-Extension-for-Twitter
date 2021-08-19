var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');

s.onload = function() {
    this.remove();
};

document.head.appendChild(s);


var catList = new Array();
chrome.storage.local.set({ catTitles: catList }, function() {

});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        var newCatTitle = request.newCat.newCatTitle;
        var newUsers = request.newCat.newUsers;
        var newUsersAsArray = newUsers.split();
        var existingCatList = new Array();
        chrome.storage.local.get(['catTitles'], function(result) {
            existingCatList = result.catTitles;

        });

        existingCatList.push("newCatTitle");

        chrome.storage.local.set({ newCatTitle: newUsersAsArray }, function() {
            console.log(newCatTitle + " is set to " + newUsersAsArray);
        });
    }
);