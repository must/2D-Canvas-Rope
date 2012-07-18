$(document).ready(function () {
	// Data types
	var vect2 = {
    	x: 0,
    	y: 0,
    	setCoordinates : function(x, y){
	    	this.x = x;
	    	this.y = y;
	    	
	    	return this;
    	},
    	setCoordinatesFromVect: function(vect){
    		this.x = vect.x;
    		this.y = vect.y;
    		
    		return this;
    	},
    	multiplyByScalar: function(scalar){
	    	this.x *= scalar;
	    	this.y *= scalar;	
	    	
	    	return this;
    	},
    	devideByScalar: function(scalar){
    		if(scalar == 0) return 0;
    		
	    	this.x /= scalar;
	    	this.y /= scalar;	
	    	
	    	return this;
    	},
    	sumWithVect: function(vect)
    	{
	    	this.x += vect.x;
	    	this.y += vect.y;
	    	
	    	return this;
    	},
    	sumWithCoordinates: function(x, y)
    	{
	    	this.x += x;
	    	this.y += y;
	    	
	    	return this;
    	},
    	length: function()
    	{
	    	return Math.sqrt(Math.pow(this.x,2)+ Math.pow(this.y,2));	
    	},
    	isInRangeOf: function(vect, range)
    	{
	    	return (this.x < (vect.x + range.x)) && (this.x > (vect.x - range.x)) && (this.y < (vect.y + range.y)) && (this.y > (vect.y - range.y));
    	},
    	// Debuging method
    	logCoordinates : function() { console.log("x: " + this.x + " y: " + this.y) }
    };
	
	var point = {
		position: {},
		velocity: {},
		force: {},
		init: function() {
			this.position = Object.create(vect2).setCoordinates(0, 0);
			this.velocity = Object.create(vect2).setCoordinates(0, 0);
			this.force = Object.create(vect2).setCoordinates(0, 0);
			
			return this;
		},
		setCoordinates : function(x, y)
		{
			this.position.setCoordinates(x,y);
			
			return this;
		},
		addForce: function(x, y)
		{
			this.force.sumWithCoordinates(x, y);
			
			return this;
		},
		addForceFromVect: function(vect)
		{
			this.force.sumWithVect(vect);
			
			return this;
		},
		removeForces: function()
		{
			this.force.setCoordinates(0, 0);	
			
			return this;
		},
		simulate: function(dt, m)
		{
			//velocity += (force / masse) * dt
			var forcetmp = Object.create(vect2).setCoordinatesFromVect(this.force);
			this.velocity.sumWithVect(forcetmp.devideByScalar(m).multiplyByScalar(dt));
			
			//position += velocity * dt;
			var velocitytmp = Object.create(vect2).setCoordinatesFromVect(this.velocity);
			this.position.sumWithVect(velocitytmp.multiplyByScalar(dt));
			
			return this;
		},
		test: function()
		{
			console.log(this);
		}
    };
    
    var spring = {
	    point1: {},
	    point2: {},
	    force: {},
	    initWithPoints: function(point1, point2) {
		    this.point1 = point1;
		    this.point2 = point2;
		    
		    return this;
	    },
	    calculate: function() {
	    	this.force = Object.create(vect2).setCoordinates(0, 0);
	    		    	
	    	var springConstant = 0.0000000000000009;
	    	//var frictionConstant = 0.000007;
	    	
		    // V[i-1] - V[i] = + V[i] * (-1) + V[i-1]
		    var springVector = Object.create(vect2).setCoordinatesFromVect(this.point2.position).multiplyByScalar(-1).sumWithVect(this.point1.position);
		    var r = springVector.length();
		    
		    this.force = springVector.devideByScalar(r).multiplyByScalar(-(r - 1) * springConstant);

		    
		    var velocitytmp1 = Object.create(vect2).setCoordinatesFromVect(this.point1.velocity);
		    var velocitytmp2 = Object.create(vect2).setCoordinatesFromVect(this.point2.velocity);
		    
		    //var springVelocity = velocitytmp1.sumWithVect(velocitytmp2.multiplyByScalar(-1));
		    
		    //this.force.sumWithVect( springVelocity.multiplyByScalar(-frictionConstant) );
		    
		    return this;
	    },
	    applyForces: function() {
		    this.point1.addForceFromVect(this.force);
		    this.point2.addForceFromVect(this.force.multiplyByScalar(-1));
		    
		    return this;
	    }
    };

	// Initiates an array with the coordinates of each points of the rope
	function initiateLineWithPoints(numberOfPoints)
	{
		numberOfPoints = typeof numberOfPoints !== 'undefined' ? numberOfPoints : 40;

		var points = new Array();
		
		// Create 50 distinct points
		for(var i=0; i < numberOfPoints; i++)
		{
			var newPoint = Object.create(point).init().setCoordinates(500, 25+i);

			points.push(newPoint);
		}

		return points;
	}
	
	// Draws a rope from the supplied points coordinates on the context provided
	function drawLineWithPoints(context, points)
	{
		context.beginPath();
		context.moveTo(points[0].position.x, points[0].position.y);
		
		for(var i=1; i < points.length; i++)
			context.lineTo(points[i].position.x, points[i].position.y);

		context.lineWidth = 1;
		context.strokeStyle = '#000000';
		context.stroke();
	}
	
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
    
    var slowMotionRatio = 0.5;
    var timer = new Date().getTime();
    
    var animating = 1;
    
    var m = .0025; // Mass in Kg of a point of the Rope assuming the whole mass is 1kg
    
	function animate(){
		// This is to ensure that this instructions don't execute when the animation is done (it's a waste of time in that case)
		if(animating)
		{
		    var maxPossible_dt = 0.002;	    // This Is Needed To Prevent Passing Over A Non-Precise dt Value	
			var dt = new Date().getTime() - timer;
			timer = new Date().getTime();
			var dts, numOfIterations;
			
			dt /= slowMotionRatio;
		  	
		  	dts = dt / 1000;
			numOfIterations = parseInt(dts / maxPossible_dt) + 1;               // Calculate Number Of Iterations To Be Made At This Update Depending On maxPossible_dt And dt
	
			if (numOfIterations != 0) // This shouldn't be zero anyways, that would be a miracle or a JS bug --"
			   	dts = dts / numOfIterations;                      // dt Should Be Updated According To numOfIterations
	
	    	for (var a = 0; a < numOfIterations; a++)
	    	{
			    // update
	 		  	// User is clicking on the end of the rope
	 		  	if( clicked ) {//clicked
		 		  	for(var i=1; i < points.length; i++)
				    {					
				    	points[i].removeForces().addForceFromVect(Object.create(vect2).setCoordinates(0, 9.8).multiplyByScalar(m));
					    
				    	var spring_connection = Object.create(spring);
				    	spring_connection.initWithPoints(points[i-1], points[i]).calculate().applyForces();
			
				    	points[i].simulate(dts, m);
			    	}
	 		  	} else {
				    for(var i=1; i < points.length; i++)
				    {					
				    	points[i].removeForces().addForceFromVect(Object.create(vect2).setCoordinates(0, 9.8).multiplyByScalar(m));
					    
				    	var spring_connection = Object.create(spring);
				    	spring_connection.initWithPoints(points[i-1], points[i]).calculate().applyForces();
			
				    	points[i].simulate(dts, m);
			    	}
			    }
		    }
	
		    // clear
		    context.clearRect(0, 0, canvas.width, canvas.height);
		    
		    points[0].removeForces();
		    
		    // draw
		    drawLineWithPoints(context, points);
		}
	    
	    if(!clicked && Math.abs(points[points.length-1].velocity.x) < 0.01 && Math.abs(points[points.length-1].velocity.y) < 0.01)
		{
			animating = 0;
		}
	
		// request new frame
		requestAnimFrame(function(){
		    animate();
		});
    };
    
	var canvas = document.getElementById("RopeCanvas");
	
	// Make sure we don't execute when canvas isn't supported
	if (canvas.getContext)
	{
		var NUMBER_OF_POINTS = 2;
		
		// Use getContext to use the canvas for drawing
		var context = canvas.getContext('2d');
		
		var points = initiateLineWithPoints(NUMBER_OF_POINTS);
		
		drawLineWithPoints(context, points);
		
		// Canvas interactions
		$canvas = $(canvas);
		var posX = $canvas.offset().left, posY = $canvas.offset().top;
		
		// Pointer type depending on position
		var clicked = 0;
		var pointer = 0;
		$canvas.mousemove(function(e){
			var hoverCoordinates = Object.create(vect2).setCoordinates(e.pageX - posX, e.pageY - posY)
			var toleranceRange = Object.create(vect2).setCoordinates(10, 20);
			
			if(!clicked)
				if(hoverCoordinates.isInRangeOf(points[0].position, toleranceRange))
				{
					if(!pointer)
					{
						$canvas.css('cursor', 'pointer');
						pointer = 1;
					}
				} else {
					if(pointer)
					{
						$canvas.css('cursor', 'default');
						pointer = 0;
					}
				}
			else {
			//points.length-1
				points[0].position.setCoordinatesFromVect(hoverCoordinates);
				
				if(!animating) { animating = 1; }
			}
		});
		
		$canvas.mousedown(function(e) {
			var clickCoordinates = Object.create(vect2).setCoordinates(e.pageX - posX, e.pageY - posY)
			var toleranceRange = Object.create(vect2).setCoordinates(10, 20);
			if(clickCoordinates.isInRangeOf(points[0].position, toleranceRange))
			{
				clicked = 1;
			}
	    }).mouseup(function() {
	    	clicked = 0;
	    });

	    // Start animation
		animate();
		animating = 1;
	}
	else
	{
		alert('You need a browser that supports canvas');
	}

});