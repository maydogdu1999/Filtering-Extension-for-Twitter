/**
 * The general picture of what's going is that there are two sets of elements.
 * One set is the default popup page elements. The other one is hidden as default and
 * only shows up when a new category is being added.
 */


document.getElementById("newCatDiv").style.display = "none"; //when popup is cliked, hide newCatDiv

var curChecked; //a list to store currently checked categories
chrome.storage.sync.get(['checked'], function(result) {
    //get checked and call function to add the cats to popup
    curChecked = result.checked;
    addExistingCats();
});

/**
 * Adds the existing cats to popup and checks them if they were previously checked by the user.
 */
function addExistingCats() {
    chrome.storage.sync.get(['catTitles'], function(result) {
        var curList = new Array();
        curList = result.catTitles;
        for (const element of curList) {
            makeDivForNewCat(element);
            if (curChecked != null && curChecked.includes(element)) {
                document.getElementById(element).checked = true;
            }
        }
    });
}

/**
 * Given a catName, creates a checkbox and a label for it.
 * @param {*} catName 
 */
function makeDivForNewCat(catName) {
    // creating checkbox element
    var checkbox1 = document.createElement('input');

    // Assigning the attributes
    // to created checkbox
    checkbox1.type = "checkbox";
    checkbox1.value = "checked";
    checkbox1.id = catName;

    // creating label for checkbox
    var label1 = document.createElement('label');
    label1.id = catName + "label";
    // assigning attributes for
    // the created label tag
    label1.htmlFor = "label1";

    // appending the created text to
    // the created label tag
    label1.appendChild(document.createTextNode(catName));

    if (checkDiv.hasChildNodes()) {
        var linebreak = document.createElement('br');
        checkDiv.appendChild(linebreak);
    }


    // appending the checkbox
    // and label to div
    checkDiv.appendChild(checkbox1);
    checkDiv.appendChild(label1);

}

/**
 * When called, switches between the default popup page and 
 * the page for adding a new cat.
 */
function switchBetweenReg_newCat() {
    if (document.getElementById("newCatDiv").style.display == "block") {
        document.body.style = "height: 120px";
        document.getElementById("newCatDiv").style.display = "none";
        document.getElementById("defaultDiv").style.display = "block";
    } else {
        document.body.style = "height: 150px";
        document.getElementById("newCatDiv").style.display = "block";
        document.getElementById("defaultDiv").style.display = "none";
    }

}

//listeners below

/**
 * When newCatButton is clicked, switch to the elements for adding a new cat.
 */
document.addEventListener('click', function(e) {
    if (e.target && e.target.id == "newCatButton") {
        switchBetweenReg_newCat();
    }
});

/**
 * When a new cat is added (okayButton is clicked), store the new cat along
 * with its inputted usernames in chrome storage.
 * Update the "catTitles"
 * Add it to categories in the default popup page.
 * Switch to the default page elements.
 * 
 */
document.addEventListener('click', function(e) {

    if (e.target && e.target.id == 'okayButton') {
        var newCatTitle = document.getElementById("newCatName").value;
        var newUsers = document.getElementById("newUsers").value;
        var newUsersList = newUsers.split(/\s+/);

        if (newCatTitle.trim() != "") {

            chrome.storage.sync.set({
                [newCatTitle]: newUsersList
            }, function() {

                console.log(newCatTitle + " is set to " + newUsersList);
            });

            chrome.storage.sync.get(['catTitles'], function(result) {
                var existingCatList = new Array();
                existingCatList = result.catTitles;
                existingCatList.push(newCatTitle);
                chrome.storage.sync.set({ catTitles: existingCatList }, function() {});
            });

            makeDivForNewCat(newCatTitle);
            switchBetweenReg_newCat();
        } else {
            switchBetweenReg_newCat();

        }
    }
});

/**
 * When the selected categories are applied, go through all cat titles,
 * see which ones are selected. Send the list of checked titles to background.js.
 * Also, update "checked" accordingly.
 */
document.addEventListener('click', function(e) {
    if (e.target && e.target.id == "filterButton") {

        chrome.storage.sync.get(['catTitles'], function(result) {
            current = result.catTitles;
            var checked = new Array();
            for (const element of current) {
                if (document.getElementById(element).checked) {
                    checked.push(element);
                }
            }

            chrome.runtime.sendMessage({ "checked": checked }, function(response) {
                console.log(response.bgResponse);
            });

            chrome.storage.sync.set({ "checked": checked }, function() {});
        });


    }
});

/**
 * When the selected categories are removed, go through all cat titles,
 * see which ones are selected. Hide the checked titles from the page. 
 * Update "catTitles" with a new list that doesn't included removed cats. .
 */
document.addEventListener('click', function(e) {
    if (e.target && e.target.id == "removeButton") {

        chrome.storage.sync.get(['catTitles'], function(result) {
            current = result.catTitles;
            newList = new Array();
            for (const element of current) {
                if (!document.getElementById(element).checked) {
                    newList.push(element);
                } else {
                    checkDiv = document.getElementById("checkDiv");
                    checkDiv.removeChild(document.getElementById(element));
                    checkDiv.removeChild(document.getElementById(element + "label"));
                }
            }

            chrome.storage.sync.set({ 'catTitles': newList }, function() {});
        });


    }
});