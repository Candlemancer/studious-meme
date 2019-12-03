// Final Project
// CS 5890 - Data Visualization
// Suzie Rhodes, Jonathan Petersen

function updateCollapsibles(button, displayStyle = "block") {

    let content = button.nextElementSibling;

    // Toggle Visibility
    content.style.display = (button.classList.contains("active")) ?
        displayStyle :
        "none";
}

function assignHandler(element, displayStyle) {

    // Add the handler
    element.addEventListener("click", function () {
        this.classList.toggle("active");
        updateCollapsibles(this, displayStyle);
    });
}

function visitCollapsible(action) {

    // Visit each element
    for (element of document.getElementsByClassName("collapsible")) {
        action(element)
    }
}

visitCollapsible(assignHandler);
visitCollapsible(updateCollapsibles);