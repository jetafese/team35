/*
This class represents a Note. It has a path to the note 
as well as an 'undefined' initial state
*/

export default class Note {
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
