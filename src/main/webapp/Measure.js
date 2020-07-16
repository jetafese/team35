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

        // sound option 1 : piano A 
        var sound_option_1 = document.createElement("a");
        sound_option_1.innerText = "Piano A";
        sound_option_1.href="#";
        sound_option_1.onclick = () => {this.assignNote('./sound_options/Piano_A.wav')};
        sound_option_1.onmouseover = () => {this.hoverPlay('./sound_options/Piano_A.wav')};
        
        // sound option 2 : piano B
        var sound_option_2 = document.createElement("a");
        sound_option_2.innerText = "Piano B";
        sound_option_2.href="#";
        sound_option_2.onclick = () => {this.assignNote('./sound_options/Piano_B.wav')};
        sound_option_2.onmouseover = () => {this.hoverPlay('./sound_options/Piano_B.wav')};

        // sound option 3: funky guitar 
        var sound_option_3 = document.createElement("a");
        sound_option_3.innerText = "Guitar - Funky";
        sound_option_3.href="#";
        sound_option_3.onclick = () => {this.assignNote('./sound_options/funk_guitar.mp3')};
        sound_option_3.onmouseover = () => {this.hoverPlay('./sound_options/funk_guitar.mp3')};

        // sound option 4: dramatic piano 
        var sound_option_4 = document.createElement("a");
        sound_option_4.innerText = "Piano - Dramatic";
        sound_option_4.href="#";
        sound_option_4.onclick = () => {this.assignNote('./sound_options/dramatic_piano.mp3')};
        sound_option_4.onmouseover = () => {this.hoverPlay('./sound_options/dramatic_piano.mp3')};
       
        // sound option 5: rock drums
        var sound_option_5 = document.createElement("a");
        sound_option_5.innerText = "Drums - Rockstyle";
        sound_option_5.href="#";
        sound_option_5.onclick = () => {this.assignNote('./sound_options/rock_drums.mp3')};
        sound_option_5.onmouseover = () => {this.hoverPlay('./sound_options/rock_drums.mp3')};

         // sound option 6:
        var sound_option_6 = document.createElement("a");
        sound_option_6.innerText = "Drums - Electronic";
        sound_option_6.href="#";
        sound_option_6.onclick = () => {this.assignNote('./sound_options/drums.mp3')};
        sound_option_6.onmouseover = () => {this.hoverPlay('./sound_options/drums.mp3')};
       
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
        innerDrop.appendChild(sound_option_1);
        innerDrop.appendChild(sound_option_2);
        innerDrop.appendChild(sound_option_3);
        innerDrop.appendChild(sound_option_4);
        innerDrop.appendChild(sound_option_5);
        innerDrop.appendChild(sound_option_6);


        // maintain play measure music button 
        parentDiv.appendChild(buttonMusic);

        // add canvas in the center of the page
        parentDiv.appendChild(canvasObj.canvas);

        // song label to be at the bottom of page 
        parentDiv.appendChild(songLabel);

    }

    hoverPlay(songLink) {
        new Audio(songLink).play();
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

    }

}
