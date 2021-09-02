console.log("from popup: popup opened");
var checkDiv = document.createElement("div");
checkDiv.id = "checkDiv";
addNewCatButton();
document.body.appendChild(checkDiv);
addApplyButton();
addNewCatAddElements();
document.getElementById("newCatDiv").style.display = "none";
var curChecked;
chrome.storage.sync.get(['checked'], function(result) {
    curChecked = result.checked;
    addExistingCats();
});

function addExistingCats() {
    chrome.storage.sync.get(['catTitles'], function(result) {
        var curList = new Array();
        console.log("curChedk: " + curChecked);
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

function addApplyButton() {
    var button = document.createElement('button');
    button.id = "filterButton";
    var textContent = document.createTextNode("Apply selected categories");

    button.appendChild(textContent);
    document.body.appendChild(button);
}

function addNewCatButton() {
    var button = document.createElement('button');
    button.id = "newCatButton";
    var textContent = document.createTextNode("Add a new category");

    button.appendChild(textContent);
    document.body.appendChild(button);
}

function addNewCatAddElements() {
    var newCatDiv = document.createElement("div");
    newCatDiv.id = "newCatDiv";


    //Cat Name
    var input1 = document.createElement("INPUT");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "newCatName");
    input1.setAttribute("name", "newCatName");

    var label1 = document.createElement('label');
    label1.setAttribute("for", "newCatName");
    label1.innerHTML = "Category Name: ";

    newCatDiv.appendChild(label1);
    newCatDiv.appendChild(input1);

    //usernames
    var input2 = document.createElement("INPUT");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "newUsers");
    input2.setAttribute("name", "newUsers");

    var label2 = document.createElement('label');
    label2.setAttribute("for", "newUsers");
    label2.innerHTML = "Add usernames: ";


    newCatDiv.appendChild(label2);
    newCatDiv.appendChild(input2);

    //okay button
    var button = document.createElement('button');
    button.id = "okayButton";
    var textContent = document.createTextNode("Okay!");

    button.appendChild(textContent);
    newCatDiv.appendChild(button);

    document.body.appendChild(newCatDiv);

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
                chrome.storage.sync.set({ catTitles: existingCatList }, function() {
                    console.log("updated catTitles" + existingCatList);
                });
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

            chrome.storage.sync.set({ "checked": checked }, function() {
                console.log("checked: " + checked);
            });
        });




    }
});