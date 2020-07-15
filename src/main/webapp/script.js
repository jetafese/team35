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
