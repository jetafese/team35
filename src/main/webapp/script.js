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

document.addEventListener("DOMContentLoaded", ready);

function ready() {
	const canvas = document.getElementById('paint');
    const ctx = canvas.getContext('2d');

    // dimensions of music staff
    canvas.width = 2000;
    canvas.height = 400;

    // settings for drawing
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    var mouse = {x: 0, y: 0};

    // Draws the music staff's 3 lines and bars (dividing each measure)
    drawLines(ctx, canvas);

    // Adds event listeners for the user's drawing (drawing is impossible without this)
    addListeners(canvas, ctx, mouse);
}

function drawLines(ctx, canvas){
    ctx.beginPath();

	// Draw lines
    var dividor = canvas.height / 4;
    for (var i = dividor; i < canvas.height; i += dividor){
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    
    // Draw bars
    dividor = canvas.width / 4;
    for (var j = dividor; j < canvas.width; j += dividor){
        ctx.moveTo(j, 0);
        ctx.lineTo(j, canvas.height);
    }
    
    ctx.stroke();
}

function addListeners(canvas, ctx, mouse) {
    
    // Mouse capturing work
    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);

    canvas.addEventListener('mousedown', function(e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);

        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };
}

function clearAll(){
	const canvas = document.getElementById('paint');
    const ctx = canvas.getContext('2d');
    const measure = document.getElementById("measures").value;

    // Mathematical formulas for getting the x-coords of measure 1, 2, 3, 4, or entire staff
    const x_0 = (measure == 4) ? 0 : canvas.width/4 * measure;
    const x_1 = (measure == 4) ? canvas.width : canvas.width/4;
    
    // Clears the measure(s) chosen by the user
    ctx.clearRect(x_0, 0, x_1, canvas.height);
    
    // Re-draw staff lines and bars
    drawLines(ctx, canvas);
}

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