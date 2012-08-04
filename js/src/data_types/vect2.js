// 2D Vector representation
var vect2 = {
	x: 0,
	y: 0,

	initWithCoordinates : function(x, y) {
		this.x = x;
		this.y = y;

		return this;
	},
	initWithVect: function(vect) {
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
		if(scalar === 0) { return 0; }

		this.x /= scalar;
		this.y /= scalar;

		return this;
	},
	sumWithCoordinates: function(x, y)
	{
		this.x += x;
		this.y += y;

		return this;
	},
	sumWithVect: function(vect)
	{
		this.x += vect.x;
		this.y += vect.y;

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
	logCoordinates : function() { console.log("x: " + this.x + " y: " + this.y); }
};