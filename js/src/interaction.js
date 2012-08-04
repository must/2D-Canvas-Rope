var interactionEngine = (function() {
	// Constant tolerance range for user clicks (relative to point)
	var TOLERANCE_RANGE = Object.create(vect2).initWithCoordinates(10, 20);
	
	// Offset positions
	var pos = {
		x: 0,
		y: 0,
	};
	
	// Weather or not user is clicking on canvas
	var clicked = 0;
	
	// Pointer type depending on position
	var pointer = 0;
	
	// Initiates offset position for the canvas
	function _initPosWithCanvas($canvas)
	{
		pos.x = $canvas.offset().left;
		pos.y = $canvas.offset().top;
	}
	
	return {
		$canvas: null,
		setCanvas: function($canvas) {
			this.$canvas = $canvas;

			// Init our canvas offset positions (since we now have a refrence to it)
			_initPosWithCanvas($canvas);
		},
		startInteractions: function() {
			this.$canvas.mousemove(function(e){
				var hoverCoordinates = Object.create(vect2).initWithCoordinates(e.pageX - pos.x, e.pageY - pos.y)
				var $this = $(this);
				
				if(!clicked)
					if(hoverCoordinates.isInRangeOf(engine.getPoints()[0].position, TOLERANCE_RANGE))
					{
						if(!pointer)
						{
							$this.css('cursor', 'pointer');
							pointer = 1;
						}
					} else {
						if(pointer)
						{
							$this.css('cursor', 'default');
							pointer = 0;
						}
					}
				else {
				//engine.getPoints().length-1
					engine.getPoints()[0].position.initWithVect(hoverCoordinates);
					
					if(!engine.animating) { engine.animating = 1; }
				}
			});
			
			// Detect clicks and act accordignly
			this.$canvas.mousedown(function(e) {
				var clickCoordinates = Object.create(vect2).initWithCoordinates(e.pageX - pos.x, e.pageY - pos.y)

				if(clickCoordinates.isInRangeOf(engine.getPoints()[0].position, TOLERANCE_RANGE))
				{
					clicked = 1;
				}
			}).mouseup(function() {
				clicked = 0;
			});
		}
	};
})();