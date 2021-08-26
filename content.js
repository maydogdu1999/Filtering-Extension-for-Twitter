var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');

s.onload = function() {
    this.remove();
};

document.head.appendChild(s);

var catList = new Array();
chrome.storage.sync.set({ catTitles: catList }, function() {});

/** 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (!request.newCat) {
            return true;
        }
        var newCatTitle = request.newCat.newCatTitle;
        var newUsers = request.newCat.newUsers;
        var newUsersList = newUsers.split();

        //updating catTitles
        chrome.storage.sync.get(['catTitles'], function(result) {
            var existingCatList = new Array();
            existingCatList = result.catTitles;
            existingCatList.push(newCatTitle);
            chrome.storage.sync.set({ catTitles: existingCatList }, function() {});

        });

        //adding newCatTitle with newUsersAsArray
        chrome.storage.sync.set({
            [newCatTitle]: newUsersList
        }, function() {
            console.log(newCatTitle + " is set to " + newUsers);
        });

        //just checking if works


        return true;
    }
); */



/** 

//var port = chrome.runtime.connect();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (!request.detail) {
            return true;
        }


        var userNames = request.detail;
        console.log("from content: " + userNames);
        //port.postMessage("userNames");

        return true;
    }
); */