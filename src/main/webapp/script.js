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

import Bar from '/Bar.js';
import Measure from '/Measure.js';

document.getElementById("playAll").addEventListener("click", playAll);
document.getElementById("newMeasure").addEventListener("click", newMeasure);

// Canvas related code
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

// Measures, Notes, Bars
const bar = new Bar();

function newMeasure() {
    //Create new div and append to GridDiv
    var parentGrid = document.getElementById("grid-container")
    var newDiv = document.createElement("div");
    newDiv.classList.add("grid-item");

    var curId = bar.getMeasureCount() + "_";
    let curMeasure = new Measure(newDiv, curId);
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
