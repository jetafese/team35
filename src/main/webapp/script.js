// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
class Note {
    constructor(songPath) {
        this.song = songPath;
    }

    play() {
        new Audio(this.song).play();
    }
}


class Measure {
    constructor(parentDiv, curId) {
        //Initate note as null
        var curNote = null;
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
        buttonDrop.onclick = this.showDropMenu;
        this.button = buttonDrop;


        // Sound Options Drop Down Creation: [from free mp3 downloaders online]
            
        // Option 1: Piano Dramatic   
        var sound_option_1 = document.createElement("b");
        sound_option_1.innerText = "option 1";
        sound_option_1.href="#";

        // creating audio controls to bind to this sound option 
        var sound_1      = document.createElement('audio');
        sound_1.id       = 'piano_drama_sound';
        sound_1.controls = 'controls';
        sound_1.src      = 'sounds/piano_dramatic.mp3';
        sound_1.type     = 'audio/mpeg';
        sound_option_1.appendChild(sound_1);

        // creating onlick connection to send through the corresponding song 
        sound_option_1.onclick = this.pianoA(sound_1);

        // Option 2: Piano_A.wav   
        var sound_option_2 = document.createElement("b");
        sound_option_2.innerText = "option 2";
        sound_option_2.href="#";

        // creating audio controls to bind to this sound option 
        var sound_2      = document.createElement('audio');
        sound_2.id       = 'piano_a_wav';
        sound_2.controls = 'controls';
        sound_2.src      = 'sounds/Piano_A.wav';
        sound_2.type     = 'audio/wav';
        sound_option_2.appendChild(sound_2);

        // creating onlick connection to send through the corresponding song 
        sound_option_2.onclick = this.pianoA(sound_2);

        // Option 3: guitar_riff.mp3   
        var sound_option_3 = document.createElement("b");
        sound_option_3.innerText = "option 3";
        sound_option_3.href="#";

        // creating audio controls to bind to this sound option 
        var sound_3      = document.createElement('audio');
        sound_3.id       = 'guitar_riff';
        sound_3.controls = 'controls';
        sound_3.src      = 'sounds/guitar_riff.mp3';
        sound_3.type     = 'audio/mp3';
        sound_option_3.appendChild(sound_3);

        // creating onlick connection to send through the corresponding song 
        sound_option_3.onclick = this.pianoA(sound_3);

        // Option 4: drums_1.mp3   
        var sound_option_4 = document.createElement("b");
        sound_option_4.innerText = "option 4";
        sound_option_4.href="#";

        // creating audio controls to bind to this sound option 
        var sound_4      = document.createElement('audio');
        sound_4.id       = 'drums_1';
        sound_4.controls = 'controls';
        sound_4.src      = 'sounds/drums_1.mp3';
        sound_4.type     = 'audio/mp3';
        sound_option_4.appendChild(sound_4);

        // creating onlick connection to send through the corresponding song 
        sound_option_4.onclick = this.pianoA(sound_4);

       // Option 5: drums_2.mp3   
        var sound_option_5 = document.createElement("b");
        sound_option_5.innerText = "option 5";
        sound_option_5.href="#";

        // creating audio controls to bind to this sound option 
        var sound_5      = document.createElement('audio');
        sound_5.id       = 'drums_2';
        sound_5.controls = 'controls';
        sound_5.src      = 'sounds/drums_2.mp3';
        sound_5.type     = 'audio/mp3';
        sound_option_5.appendChild(sound_5);

        // creating onlick connection to send through the corresponding song 
        sound_option_5.onclick = this.pianoA(sound_5);

        //Create music button
        var buttonMusic = document.createElement("BUTTON");
        buttonMusic.classList.add("musicButton");
        buttonMusic.id = curId + "buttonMusic";
        buttonMusic.innerText = ">";
        buttonMusic.onclick = this.playSong;
        this.buttonMusic = buttonMusic;

        parentDiv.appendChild(dropDownDiv);
        dropDownDiv.appendChild(buttonDrop);
        dropDownDiv.appendChild(innerDrop);

        // adding the sound options we created to the drop down
        innerDrop.appendChild(sound_option_1);
        innerDrop.appendChild(sound_option_2);
        innerDrop.appendChild(sound_option_3);
        innerDrop.appendChild(sound_option_4);
        innerDrop.appendChild(sound_option_5);
        dropDownDiv.appendChild(buttonMusic);

    }

    // TODO: edit the pianoA and pianoB method to set the sound chosen as the sound for current note 
    pianoA(file) {
        console.log(file);
        var newSong = new Note("Piano_A.wav");
        this.song = newSong;
    }

    pianoB() {
        var newSong = new Note("Piano_A.wav");
        this.song = newSong;
    }
    showDropMenu() {
        document.getElementById("0_innerDrop").classList.toggle("show");
    }

    playSong() {
        //if(this.song == null) {
        //    alert("No song defined");
        //    return;
        //}
        new Audio("Piano_A.wav").play();
    }
}

class Bar {
    constructor() {
        this.measures = [];
        this.measureCount = 0;
    }

    //Appends a new measure to the end of the list
    addMeasure(newMeasure) {
        this.measures.push(newMeasure);
        this.measureCount = this.measureCount + 1;
    }

    //Plays the full song
    play() {
        for(var i = 0; i < this.measures.length; i++) {
            this.measures[i].playSong();
        }
    }

    //Returns the number of measures
    getMeasureCount() {
        return this.measureCount;
    }
}


const bar = new Bar();

function newMeasure() {
    //Create new div and append to GridDiv
    var parentGrid = document.getElementById("grid-container")
    var newDiv = document.createElement("div");
    newDiv.classList.add("grid-item");

    var curId = bar.getMeasureCount() + "_";
    newMeasure = new Measure(newDiv, curId);
    parentGrid.appendChild(newDiv);
    bar.addMeasure(newMeasure);
}

function playAll() {
    bar.play();
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropButton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}