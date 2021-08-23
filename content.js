var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');

s.onload = function() {
    this.remove();
};

document.head.appendChild(s);


var catList = new Array();
chrome.storage.sync.set({ catTitles: catList }, function() {});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        var newCatTitle = request.newCat.newCatTitle;
        var newUsers = request.newCat.newUsers;


        //updating catTitles
        chrome.storage.sync.get(['catTitles'], function(result) {
            var existingCatList = new Array();
            existingCatList = result.catTitles;
            existingCatList.push(newCatTitle);
            chrome.storage.sync.set({ catTitles: existingCatList }, function() {});

        });

        //adding newCatTitle with newUsersAsArray
        chrome.storage.sync.set({
            [newCatTitle]: newUsers
        }, function() {
            console.log(newCatTitle + " is set to " + newUsers);
        });

        //just checking if works
        chrome.storage.sync.get(newCatTitle, function(result) {
            console.log(newCatTitle + " is set to " + result[newCatTitle])
        });

        return true;
    }
);