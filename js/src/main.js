var NUMBER_OF_POINTS = 200;

$(document).ready(function () {
	// Set the rendrer for the canvas
	rendrer.canvas = document.getElementById("RopeCanvas");
	
	// Make sure we don't execute when canvas isn't supported
	if (rendrer.canvas.getContext)
	{	
		// Use getContext to use the canvas for drawing
		rendrer.context = rendrer.canvas.getContext('2d');	
		
		
		// Initialize the points in the engine object
		engine.initiateLineWithPoints(NUMBER_OF_POINTS);
		
		// Get initial drwaing on screen
		rendrer.drawLineWithPoints(engine.getPoints());
		
		// Set the jQuery refrence to canvas to the interactionEngine
		interactionEngine.setCanvas( $(rendrer.canvas) );
		// Start watching for user interactions
		interactionEngine.startInteractions();

	    // Start animation
		engine.startAnimating();
	}
	else
	{
		alert('You need a browser that supports canvas');
	}

});