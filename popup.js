var checkDiv = document.createElement("div");
checkDiv.id = "checkDiv";
addNewCatButton();
addApplyButton();
addNewCatAddElements();
document.getElementById("newCatDiv").style.display = "none";





function makeDivForNewCat(catName) {
    // creating checkbox element
    var checkbox1 = document.createElement('input');

    // Assigning the attributes
    // to created checkbox
    checkbox1.type = "checkbox";
    checkbox1.name = "checkbox1";
    checkbox1.value = "checked";
    checkbox1.id = "id1";

    // creating label for checkbox
    var label1 = document.createElement('label');

    // assigning attributes for
    // the created label tag
    label1.htmlFor = "label1";

    // appending the created text to
    // the created label tag
    label1.appendChild(document.createTextNode(catName));

    // appending the checkbox
    // and label to div
    checkDiv.appendChild(checkbox1);
    checkDiv.appendChild(label1);

    document.body.appendChild(checkDiv);
}

function addApplyButton() {
    var button = document.createElement('button');
    button.id = "filterButton";
    var textContent = document.createTextNode("Click to apply");

    button.appendChild(textContent);
    document.body.appendChild(button);
}

function addNewCatButton() {
    var button = document.createElement('button');
    button.id = "newCatButton";
    var textContent = document.createTextNode("Click to add new category");

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
        switchBetweenReg_newCat();
    }
});

document.addEventListener('click', function(e) {

    if (e.target && e.target.id == 'okayButton') {
        var newCatTitle = document.getElementById("newCatName").value;
        var newUsers = document.getElementById("newUsers").value;

        if (newCatTitle.trim() != "") {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { newCat: { newCatTitle, newUsers } }, function(response) {

                });
            });
            makeDivForNewCat(newCatTitle);
            switchBetweenReg_newCat();
        }


    }
});