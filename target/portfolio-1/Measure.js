/*
This is the measure class, which represents a 
music unit. You have to create it with a Note
and you can play this note.


<div class="grid-item">
    <div class="dropdown">
        <button onclick="showMenu()" class="dropButton">Notes</button>
        <div id="myDropdown" class="dropdown-content">
            <a href="#one">One</a>
            <a href="#two">Two</a>
            <a href="#three">Three</a>
        </div>
    </div>
</div>

*/

class Measure {
    constructor(parentDiv) {
        //Create big dropdown div
        var dropDownDiv = document.createElement("div");
        dropDownDiv.classList.add("dropdown");
        this.outerDrop = dropDownDiv;

        //Create button
        var buttonDrop = document.createElement("BUTTON");
        buttonDrop.classList.add("dropButton");
        buttonDrop.innerText = "Notes"; 
        buttonDrop.onclick = this.showDropMenu;
        this.button = buttonDrop;

        //Create inner dropdown
        var innerDrop = document.createElement("div");
        innerDrop.classList.add("dropdown-content");
        this.innerDrop = innerDrop;

        //Create the links
        var aOne = document.createElement('a');
        aOne.title = "One";
        aOne.href="#";
        aOne.onclick = this.alertOne;

        var aTwo = document.createElement('a');
        aTwo.title = "Two";
        aTwo.href="#";
        aTwo.onclick = this.alertTwo;

        innerDrop.appendChild(aTwo);
        innerDrop.appendChild(aOne);
        dropDownDiv.appendChild(innerDrop);
        dropDownDiv.appendChild(buttonDrop);
        parentDiv.appendChild(dropDownDiv);
    }

    alertTwo() {
        alert("Two");
    }

    alertOne() {
        alert("One!!");
    }
    showDropMenu() {
        this.innerDrop.classList.toggle("show");
    }

    //Plays the measure's note
    play() {
        this.note.play()
    }
}