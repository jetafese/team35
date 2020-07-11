package com.google.sps.data;
public class Note {

    private static int note_count = 0; 

    // note_id will help in structuring the order of the notes (identifiers)
    private int note_id;    
    private String audioFile;	 
    private String imageFile;  

    public Note(String name, String audioFile, String imageFile) {
        this.note_id = note_count;
        this.audioFile = audioFile;
        this.imageFile = imageFile;

        // incrementing note count whenever we create a new note 
        note_count++; 
    }

    public void setAudioFile(String audioFileName){
        this.audioFile = audioFile;
    }

    public void setNoteImage(String imageFileName){
        this.imageFile = imageFileName;
    }

}