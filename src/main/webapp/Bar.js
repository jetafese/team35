/*
This class represents a full song (sorry if I
got the name wrong). It starts with an empty list
of measures (which will be a song unit). Then, you can
add measures in sequence and play the full song.
*/

export default class Bar {
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
        console.log(index);
        if(index == (this.measures.length - 1)) {
            console.log("Hahaha");
            this.measures[index].playSong();
        } else {
            console.log("lolol");
            this.measures[index].playSong();
            this.measures[index].note.note.onended = function(){console.log('ended'); this.play(index + 1); };
             
        }
    }

    //Returns the number of measures
    getMeasureCount() {
        return this.measures.length;
    }
}
