document.getElementById("newCatDiv").style.display = "none";

var curChecked;
chrome.storage.sync.get(['checked'], function(result) {
    curChecked = result.checked;
    addExistingCats();
});

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

function makeDivForNewCat(catName) {
    // creating checkbox element
    var checkbox1 = document.createElement('input');

    // Assigning the attributes
    // to created checkbox
    checkbox1.type = "checkbox";
    checkbox1.name = "checkbox1";
    checkbox1.value = "checked";
    checkbox1.id = catName;

    // creating label for checkbox
    var label1 = document.createElement('label');

    // assigning attributes for
    // the created label tag
    label1.htmlFor = "label1";

    // appending the created text to
    // the created label tag
    label1.appendChild(document.createTextNode(catName));

    var linebreak = document.createElement('br');
    checkDiv.appendChild(linebreak);

    // appending the checkbox
    // and label to div
    checkDiv.appendChild(checkbox1);
    checkDiv.appendChild(label1);


}

function switchBetweenReg_newCat() {
    if (document.getElementById("newCatDiv").style.display == "block") {
        document.getElementById("newCatDiv").style.display = "none";
        document.getElementById("filterButton").style.display = "block";
        document.getElementById("newCatButton").style.display = "block";
        checkDiv.style.display = "block";
    } else {
        document.getElementById("newCatDiv").style.display = "block";
        document.getElementById("filterButton").style.display = "none";
        document.getElementById("newCatButton").style.display = "none";
        checkDiv.style.display = "none";

    }

}

//listeners below

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == "newCatButton") {
        console.log("new cat waiting");
        switchBetweenReg_newCat();
    }
});

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
        }
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == "filterButton") {

        var currentList = new Array();

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