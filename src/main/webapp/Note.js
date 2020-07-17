/*
This class represents a Note. It has a path to the note 
as well as an 'undefined' initial state
*/

export default class Note {
    constructor(songPath) {
        this.song = songPath;
        this.note;

        if(this.song != "undefined") {
            this.note = new Audio(this.song);
        }
    }

    play() {
        if(this.song == "undefined") {
            alert("Song undefined");
            return;
        }
        this.note.play();
    }

    pause() {
        if(this.song == "undefined") {
            alert("Song undefined");
            return;
        }
        this.note.pause();
    }

    getNote() {
        return this.note;
    }

    getName() {
        return this.song;
    }
}
