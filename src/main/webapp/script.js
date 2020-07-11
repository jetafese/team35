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

function showMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

class Measure {
    constructor(parentDiv) {
        //Initate song as empty
        var initSong = "empty";
        this.song = initSong;
        alert(this.song);

        //Create big dropdown div
        var dropDownDiv = document.createElement("div");
        dropDownDiv.classList.add("dropdown");
        this.outerDrop = dropDownDiv;
        parentDiv.appendChild(dropDownDiv);

        //Create button
        var buttonDrop = document.createElement("BUTTON");
        buttonDrop.classList.add("dropButton");
        buttonDrop.innerText = "Notes";
        buttonDrop.onclick = this.showDropMenu;
        this.button = buttonDrop;
        dropDownDiv.appendChild(buttonDrop);

        //Create inner dropdown
        var innerDrop = document.createElement("div");
        innerDrop.classList.add("dropdown-content");
        innerDrop.id = "myDropdown";
        this.innerDropMenu = innerDrop;
        dropDownDiv.appendChild(innerDrop);

        //Create the links
        var aOne = document.createElement("a");
        aOne.innerText = "One";
        aOne.href="#";
        aOne.onclick = this.alertOne;

        var aTwo = document.createElement("a");
        aTwo.innerText = "Two";
        aTwo.href="#";
        aTwo.onclick = this.alertTwo;

        innerDrop.appendChild(aTwo);
        innerDrop.appendChild(aOne);

        //Create music button
        var buttonMusic = document.createElement("BUTTON");
        buttonMusic.classList.add("musicButton");
        buttonMusic.innerText = "Music";
        buttonMusic.onclick = this.playSong;
        this.buttonMusic = buttonMusic;
        dropDownDiv.appendChild(buttonMusic);
    }

    alertTwo() {
        var newSong = "Piano_A.wav";
        this.song = newSong;
        alert(this.song);
    }

    alertOne() {
        alert(this.song);
        var newSong = "Piano_A.wav";
        this.song = newSong;
    }
    showDropMenu() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    //Plays the measure's note
    playSong() {
        alert(this.song);
        //new Audio(musicToPlay).play();
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
        for(i = 0; i < this.measures.length; i++) {
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

    newMeasure = new Measure(newDiv);
    parentGrid.appendChild(newDiv);
    bar.addMeasure(newMeasure);
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