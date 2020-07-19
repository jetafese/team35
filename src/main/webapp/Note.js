/*
This class represents a Note. It has a path to the note 
as well as an 'undefined' initial state
*/

export default class Note {
    constructor(songPath, canvas = null) {
        this.song = songPath;
        this.note;

        if(this.song != "undefined") {
            this.note = new Audio(this.song);
            if (canvas != null){
                canvas.drawNote(this.song);
            }
        }
    }

    play() {
        if(this.song == "undefined") {
            // alert("No song defined");
            console.log("No song defined");  // might be better to avoid alerts in the case that there are multiple undefined songs
            return;
        }
        this.note.play();
    }

    pause() {
        if(this.song != "undefined") {
            this.note.pause();
        }
    }

    getNote() {
        return this.note;
    }

    getName() {
        return this.song;
    }
}
