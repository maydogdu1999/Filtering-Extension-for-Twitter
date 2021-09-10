/** When the extension is installed, initialize three arrays to store 
 *  (i) the category titles, 
 *  (ii) usernames that are currently being applied and will be filtered, 
 *  (iii) and the category titles whose checkboxes are checkhed by the user.
 */
chrome.runtime.onInstalled.addListener(function(details) {
    var catList = new Array();
    var userNames = new Array();
    var checked = new Array();
    chrome.storage.sync.set({ catTitles: catList }, function() {});
    chrome.storage.sync.set({ 'userNamesToFilter': userNames }, function() {});
    chrome.storage.sync.set({ 'checked': checked }, function() {});


});

/** Message listener for a change from popup.js in checked categories.
 * Calls a function to update the usernames to be filtered.
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.checked) {
            var checked = request.checked;
            updateUserNames(checked);
        }
        sendResponse({ bgResponse: "Done" });
    }
);

/**
 * Update the usernames to be filtered based on given category names in checked.
 * 
 * @param {*} checked : a list containing category names that are currently checked.
 */

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