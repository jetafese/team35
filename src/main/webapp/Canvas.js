/*
This class represents a Canvas that allows for a drawable measure
*/

export default class Canvas {
    constructor(measureParentID){
        const canvas = document.createElement("canvas");
        canvas.classList.add("paint");
        canvas.id = measureParentID + "canvas";

        this.ready(canvas);
        this.canvas = canvas;
    }
    
    // Canvas related code
    ready(canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = 400;
        canvas.height = 400;

        // settings for drawing
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        var mouse = {x: 0, y: 0};

        // Draws the music staff's 3 lines and bars (dividing each measure)
        this.drawLines(ctx, canvas);

        // Adds event listeners for the user's drawing (drawing is impossible without this)
        this.addListeners(canvas, ctx, mouse);
    }

    drawLines(ctx, canvas){
        ctx.beginPath();

        // Draw lines
        var dividor = canvas.height / 4;
        var minHeight = dividor;
        var maxHeight = dividor * 3;
        var interval = dividor / 2;

        for (var i = minHeight; i <= maxHeight; i += interval){
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
        }

        ctx.stroke();
    }

    addListeners(canvas, ctx, mouse) {

        // Mouse capturing work
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        canvas.addEventListener('mousedown', function(e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);

            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
    }
    drawNote(songPath){
        var ctx = this.canvas.getContext("2d");

        // Overwrite canvas by clearing content
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLines(ctx, this.canvas);

        // Get note letter from song path
        var noteLetter = songPath.match("(?<=Piano_)(.*)(?=4.mp3)")[0];

        // Determine the position of the notehead with respect to the note letter
        var ellipseY = {
            "C": 350,
            "D": 325,
            "E": 300,
            "F": 275,
            "G": 250,
            "A": 225,
            "B": 200,
        };

        // y1 for notehead, y2 for the stem, y3 for the flag
        var y1 = ellipseY[noteLetter];
        var y2 = y1 - 105;
        var y3 = y1 - 55;

        // Draw notehead
        ctx.beginPath();
        ctx.ellipse(200, y1, 25, 35, Math.PI / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Draw stem
        ctx.beginPath();
        ctx.rect(220, y2, 15, 100);
        ctx.fill();

        // Draw flag
        ctx.beginPath();
        ctx.arc(225, y3, 50, 0, 3 * Math.PI / 2, 1);
        ctx.arc(225, y3, 50, 0, 3 * Math.PI / 2, 1);
        ctx.fill();

        // If middle C, draw horizontal dash between notehead
        if (noteLetter == "C"){
            ctx.beginPath();
            ctx.rect(150, 350, 105, 5);
            ctx.fill();
        }

        ctx.stroke();
    }
}
