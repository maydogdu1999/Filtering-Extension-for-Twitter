chrome.runtime.onInstalled.addListener(function(details) {
    var catList = new Array();
    var userNames = new Array();
    var checked = new Array();
    chrome.storage.sync.set({ catTitles: catList }, function() {});
    chrome.storage.sync.set({ 'userNamesToFilter': userNames }, function() {});
    chrome.storage.sync.set({ 'checked': checked }, function() {});


});



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.checked) {
            var checked = request.checked;
            updateUserNames(checked);
        }
        sendResponse({ bgResponse: "Done" });
    }
);


function updateUserNames(checked) {
    var userNames = new Array();
    if (checked.length == 0) {
        chrome.storage.sync.set({ 'userNamesToFilter': userNames }, function() {});
    } else {
        for (const element of checked) {
            chrome.storage.sync.get(element, function(result) {
                var curUsers = result[element];

                for (const user of curUsers) {
                    userNames.push(user);
                }
                chrome.storage.sync.set({ 'userNamesToFilter': userNames }, function() {});
            });

        }
    }

}