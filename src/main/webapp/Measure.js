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
        var curNote = new Note("undefined", null);
        this.note = curNote;
        this.currentHoverSong = []; 

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
        
        parentDiv.appendChild(buttonDrop);
        parentDiv.appendChild(innerDrop);
        innerDrop.appendChild(this.addSong("Piano C4", './sound_options/Piano_C4.mp3', canvasObj));
        innerDrop.appendChild(this.addSong("Piano D4", './sound_options/Piano_D4.mp3', canvasObj));
        innerDrop.appendChild(this.addSong("Piano E4", './sound_options/Piano_E4.mp3', canvasObj));
        innerDrop.appendChild(this.addSong("Piano F4", './sound_options/Piano_F4.mp3', canvasObj));
        innerDrop.appendChild(this.addSong("Piano G4", './sound_options/Piano_G4.mp3', canvasObj));
        innerDrop.appendChild(this.addSong("Piano A4", './sound_options/Piano_A4.mp3', canvasObj));
        innerDrop.appendChild(this.addSong("Piano B4", './sound_options/Piano_B4.mp3', canvasObj));


        // maintain play measure music button 
        parentDiv.appendChild(buttonMusic);

        // add canvas in the center of the page
        parentDiv.appendChild(canvasObj.canvas);

        // song label to be at the bottom of page 
        parentDiv.appendChild(songLabel);

    }

    hoverPlay(songLink) {
        let song = new Audio(songLink);
        if(this.currentHoverSong.length != 0) {
            this.currentHoverSong.pop().pause();
        }
        this.currentHoverSong.push(song);
        song.play();
    }

    assignNote(noteLink, canvas) {
        var newSong = new Note(noteLink, canvas);
        this.note = newSong;
        var songPathWithName = newSong.getName();
        var removingSongPath = songPathWithName.substring(16);
        this.songNameLabel.innerText =  'Song: ' + removingSongPath;
    }

    showDropMenu() {
        this.innerDropMenu.classList.toggle("show");
    }

    playSong() {
        this.note.play();
    }

    getCurNote() {
        return this.note.getNote();
    }

    addSong(name, source, canvas) {
        var sound_option = document.createElement("a");
        sound_option.innerText = name;
        sound_option.href="#";
        sound_option.onclick = () => {this.assignNote(source, canvas)};
        sound_option.onmouseover = () => {this.hoverPlay(source)};

        return sound_option;
    }

}
