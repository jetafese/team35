
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