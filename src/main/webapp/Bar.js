/*
This class represents a full song (sorry if I
got the name wrong). It starts with an empty list
of measures (which will be a song unit). Then, you can
add measures in sequence and play the full song.
*/

class Bar {
    constructor() {
        this.measures = []
    }

    //Appends a new measure to the end of the list
    addMeasure(newMeasure) {
        this.measures.push(newMeasure)
    }

    //Plays the full song
    play() {
        for(i = 0; i < this.measures.length; i++) {
            this.measures[i].play();
        }
    }
}