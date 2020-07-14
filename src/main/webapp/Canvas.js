export default class Canvas {
    constructor(parentDiv, measureParentID){
        var x = document.createElement("CANVAS");
        x.id = "paint";
        parentDiv.appendChild(x);
        document.addEventListener("DOMContentLoaded", this.ready());

    }
    
    // Canvas related code
    ready() {
        const canvas = document.getElementById('paint');
        const ctx = canvas.getContext('2d');

        // dimensions of music staff
        canvas.width = 2000;
        canvas.height = 400;

        // settings for drawing
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        var mouse = {x: 0, y: 0};

        // Draws the music staff's 3 lines and bars (dividing each measure)
        drawLines(ctx, canvas);

        // Adds event listeners for the user's drawing (drawing is impossible without this)
        addListeners(canvas, ctx, mouse);
    }

 drawLines(ctx, canvas){
    ctx.beginPath();

	// Draw lines
    var dividor = canvas.height / 4;
    for (var i = dividor; i < canvas.height; i += dividor){
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    
    // Draw bars
    dividor = canvas.width / 4;
    for (var j = dividor; j < canvas.width; j += dividor){
        ctx.moveTo(j, 0);
        ctx.lineTo(j, canvas.height);
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

 clearAll(){
	const canvas = document.getElementById('paint');
    const ctx = canvas.getContext('2d');
    const measure = document.getElementById("measures").value;

    // Mathematical formulas for getting the x-coords of measure 1, 2, 3, 4, or entire staff
    const x_0 = (measure == 4) ? 0 : canvas.width/4 * measure;
    const x_1 = (measure == 4) ? canvas.width : canvas.width/4;
    
    // Clears the measure(s) chosen by the user
    ctx.clearRect(x_0, 0, x_1, canvas.height);
    
    // Re-draw staff lines and bars
    drawLines(ctx, canvas);
}
}