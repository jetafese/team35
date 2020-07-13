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

// create empty note to render on the page 
document.addEventListener("DOMContentLoaded", resetNoteCreation);

// note class in the script file because when individual file could not call NOte constructor 
class Note {
    constructor(audioFile, imageFile) {
        this.audioFile = audioFile;
        this.imageFile = imageFile;
    }

    set note_audio(audioFile){
        return this.audioFile;
    }

    set note_image(imageFile){
        this.imageFile = imageFile;
    }
     
    get note_image() {
        return this.imageFile;
    }

    get note_audio() {
        return this.audioFile;
    }
}

function noteCreation(){
    let current_note = new Note(null, "/images/musical_note.png");
    document.getElementById("note_being_created").src = current_note.imageFile;
    document.getElementById("note_being_created").style.width = '100px';
    document.getElementById("note_being_created").style.height = '100px';

    // making the sound selection visible 
    document.getElementById("sound_options").style.display = "normal";
    console.log("just changed the display to be :normal");
    // have method that shows the possible audio files to choose from 

    // then thew file we do click we attach call the setter for the note object inorder to set it 

}

/* method that is called when web page loads in order to take care 
    of ensuring everything is ready to be loaded. currently that is 
    making sure that when the page loads we do not get access to sounds until 
    we create a new note 
*/
function resetNoteCreation(){
    // document.getElementById("sound_options").style.display = "none";  
    console.log("came into the reset method")
}