var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
// store the starting position of the coordinate
//var x = 100;
//var y = 100;


// periodically call the function that draws one particle
setInterval(drawParticle, 1000/30);

	// make an empty array for the particles
	var p_array = [];
	// put 50 particles into it, each invoking the particle class
	for(var i = 0; i < 50; i++) {
		// make a particle object and push it into the array
		p_array.push(new Particle());
	}

/** 
  * This class is a blueprint for the particle
  * with its own x and y, velocity, direction, radius (size)
  */
  function Particle() {
 	// random x and y position for each particle
	// subtracting 10 from the velocity will mean it's between -10 and 10
	this.x = Math.random() * 500;
	this.y = Math.random() * 500;
	this.vx = Math.random() * 20 - 10; 
	this.vy = Math.random() * 20 - 10;
	this.radius = Math.random() * 20 + 20;
	// random color using random red, green and random blue
	var r = Math.random() * 255 >> 0;
	var g = Math.random() * 255 >> 0;
	var b = Math.random() * 255 >> 0;
	this.color = "rgba(" + r +"," + g + "," + b +",1)";
  }
/**
 * this method makes a circular particle
 */
 function drawParticle() {
	 ctx.globalCompositeOperation = "source-over";
	 
	// paint the canvas with a black rectangle
	ctx.fillStyle = 'rgba(0,0,0,.5)';
	ctx.fillRect(0, 0, 500, 500);
	
	// blend the particles w background
    ctx.globalCompositeOperation = "lighter";
	
	// loop through all particles in the array, draw and remove each
	for(var t = 0; t < p_array.length; t++) {
		// variable to refer to the current particle the loop is working on
		var p = p_array[t];
		 
		// begin a path that will be a circle
		ctx.beginPath();
		var gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.radius);
		gradient.addColorStop(0, "white"); // center is white
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, p.color);
		gradient.addColorStop(1, "black");
		ctx.fillStyle = gradient;
		// make a circle
		ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
		ctx.fill(); // applies the fill style
		
		// move this particle a little so it seems to move with each redraw
		p.x += p.vx;
		p.y += p.vy;
		// keep them in play. if the particle is off the edge of the canvas
		// reset the x, y to just off the opposite edge
		if(p.x < -50) p.x = 550;
		if(p.x > 550) p.x = -50;
		if(p.y < -50) p.y = 550;
		if(p.y > 550) p.y = -50;		
	}
 }