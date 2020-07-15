export default class Canvas {
    constructor(measureParentID){
        const canvas = document.createElement("canvas");
        canvas.classList.add("paint");
        canvas.id = measureParentID + "canvas";

        document.addEventListener("DOMContentLoaded", this.ready(canvas));
        this.canvas = canvas;
    }
    
    // Canvas related code
    ready(canvas) {
        const ctx = canvas.getContext('2d');

        // dimensions of music staff
        canvas.width = 200;
        canvas.height = 200;

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
        for (var i = dividor; i < canvas.height; i += dividor){
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
}