// This Module is responsible for HTML5 canvas rendering
var rendrer = (function() {
	
	return {
		canvas: 0,
		context: 0,
		// Draws a rope from the supplied points coordinates on the context provided
		drawLineWithPoints: function (points) {
			// Clear what's been drawn before this
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			// Begin the path
			this.context.beginPath();
			// Move to the first point of the line
			this.context.moveTo(points[0].position.x, points[0].position.y);
			
			// Start setting the path by iterating on each point of the line and setting it
			for(var i=1; i < points.length; i++) {
				this.context.lineTo(points[i].position.x, points[i].position.y);
			}
		
			// Line Width
			this.context.lineWidth = 1;
			// Line Color
			this.context.strokeStyle = '#000000';
			
			// Draw
			this.context.stroke();
		}
	}
})();

// set requestAnimFrame function in all possible browser cases (fall back to setTimeout)
window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();