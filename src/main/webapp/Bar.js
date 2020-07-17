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
        // this helps make recursive calls later
        let self = this;

        if(index == (this.measures.length - 1)) {
            this.measures[index].playSong();
        } else {
            this.measures[index].playSong().onended = function() {
                self.play(index + 1);
            }
        }
    }

    //Returns the number of measures
    getMeasureCount() {
        return this.measures.length;
    }
}
