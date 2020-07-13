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
        if(this.song == "undefined") {
            alert("Song undefined");
            return;
        }
        new Audio(this.song).play();
    }

    getName() {
        return this.song;
    }
}

class Measure {
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

        parentDiv.appendChild(dropDownDiv);
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

class Bar {
    constructor() {
        this.measures = [];
    }

    //Appends a new measure to the end of the list
    addMeasure(newMeasure) {
        this.measures.push(newMeasure);
    }

    //Plays the full song
    play(index) {
        if(this.measures.length == 0) {
            return;
        }

        if(index == (this.measures.length - 1)) {
            this.measures[index].playSong();
        } else {
            this.measures[index].playSong();
            setTimeout(() => { this.play(index + 1); }, 1000);
        }
    }

    //Returns the number of measures
    getMeasureCount() {
        return this.measures.length;
    }
}

const bar = new Bar();

function newMeasure() {
    //Create new div and append to GridDiv
    var parentGrid = document.getElementById("grid-container")
    var newDiv = document.createElement("div");
    newDiv.classList.add("grid-item");

    var curId = bar.getMeasureCount() + "_";
    curMeasure = new Measure(newDiv, curId);
    parentGrid.appendChild(newDiv);
    bar.addMeasure(curMeasure);
}

function playAll() {
    bar.play(0);
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