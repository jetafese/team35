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

import Note from '/Note.js';
import Canvas from '/Canvas.js';


export default class Measure {
    constructor(parentDiv, curId) {
        //Initate note as null
        var curNote = new Note("undefined");
        this.note = curNote;

        //Create big dropdown div
        var dropDownDiv = document.createElement("div");
        dropDownDiv.classList.add("dropdown");
        dropDownDiv.id = curId + "dropDownDiv";
        this.outerDrop = dropDownDiv;

        //Create inner dropdown
        var innerDrop = document.createElement("div");
        innerDrop.classList.add("dropdown-content");
        innerDrop.id = curId + "innerDrop";
        this.innerDropMenu = innerDrop;

        //Create button
        var buttonDrop = document.createElement("BUTTON");
        buttonDrop.classList.add("dropButton");
        buttonDrop.id = curId + "buttonDrop";
        buttonDrop.innerHTML = "&equiv;";
        buttonDrop.onclick = () => {this.showDropMenu()};
        this.button = buttonDrop;

        //Create the links
        var Piano_A = document.createElement("a");
        Piano_A.innerText = "Piano A";
        Piano_A.href="#";
        Piano_A.onclick = () => {this.assignNote("Piano_A.wav")};
        Piano_A.onmouseover = () => {this.hoverPlay("Piano_A.wav")};

        var Piano_B = document.createElement("a");
        Piano_B.innerText = "Piano B";
        Piano_B.href="#";
        Piano_B.onclick = () => {this.assignNote("Piano_B.wav")};
        Piano_B.onmouseover = () => {this.hoverPlay("Piano_B.wav")};

        //Create music button
        var buttonMusic = document.createElement("BUTTON");
        buttonMusic.classList.add("musicButton");
        buttonMusic.id = curId + "buttonMusic";
        buttonMusic.innerText = ">";
        buttonMusic.onclick = () => {this.playSong()};
        this.buttonMusic = buttonMusic;

        //Create song label
        var songLabel = document.createElement("BUTTON");
        songLabel.classList.add("songLabel");
        songLabel.innerText = 'Song: ' + this.note.getName();
        this.songNameLabel = songLabel;

        // create canvas 
        var canvasObj = new Canvas(curId);

        parentDiv.appendChild(dropDownDiv);
        parentDiv.appendChild(canvasObj.canvas);
        
        dropDownDiv.appendChild(buttonDrop);
        dropDownDiv.appendChild(innerDrop);
        innerDrop.appendChild(Piano_A);
        innerDrop.appendChild(Piano_B);
        dropDownDiv.appendChild(buttonMusic);
        dropDownDiv.appendChild(songLabel);
        

    }

    hoverPlay(songLink) {
        new Audio(songLink).play();
    }

    assignNote(noteLink) {
        var newSong = new Note(noteLink);
        this.note = newSong;
        this.songNameLabel.innerText =  'Song: ' + newSong.getName();
    }

    showDropMenu() {
        this.innerDropMenu.classList.toggle("show");
    }

    playSong() {
        if(this.note == null) {
            alert("No song defined");
            return;
        }
        this.note.play();
    }

}
