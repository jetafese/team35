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

        //Create the links
        var Piano_A = document.createElement("a");
        Piano_A.innerText = "Piano A";
        Piano_A.href="#";
        Piano_A.onclick = this.pianoA;

        var Piano_B = document.createElement("a");
        Piano_B.innerText = "Piano B";
        Piano_B.href="#";
        Piano_B.onclick = this.pianoB;

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
        innerDrop.appendChild(Piano_A);
        innerDrop.appendChild(Piano_B);
        dropDownDiv.appendChild(buttonMusic);

    }

    pianoA() {
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