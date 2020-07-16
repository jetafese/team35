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
        innerDrop.appendChild(this.addSong("Piano A", './sound_options/Piano_A.wav'));
        innerDrop.appendChild(this.addSong("Piano B", './sound_options/Piano_B.wav'));
        innerDrop.appendChild(this.addSong("Guitar - Funky", './sound_options/funk_guitar.mp3'));
        innerDrop.appendChild(this.addSong("Piano - Dramatic", './sound_options/dramatic_piano.mp3'));
        innerDrop.appendChild(this.addSong("Drums - Rockstyle", './sound_options/rock_drums.mp3'));
        innerDrop.appendChild(this.addSong("Drums - Electronic", './sound_options/drums.mp3'));


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

    assignNote(noteLink) {
        var newSong = new Note(noteLink);
        this.note = newSong;
        var songPathWithName = newSong.getName();
        var removingSongPath = songPathWithName.substring(16);
        this.songNameLabel.innerText =  'Song: ' + removingSongPath;
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
        //this.note.onended = afterEnd(index);
    }

    addSong(name, source) {
        var sound_option = document.createElement("a");
        sound_option.innerText = name;
        sound_option.href="#";
        sound_option.onclick = () => {this.assignNote(source)};
        sound_option.onmouseover = () => {this.hoverPlay(source)};

        return sound_option;
    }

}
