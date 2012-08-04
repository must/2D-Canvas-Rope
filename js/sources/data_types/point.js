// A punctual mass
var point = {
	// A 2D vect representing the point's position in the canvas coordinates system
	position: {},
	// A 2D vect representing the point's velocity
	velocity: {},
	// A 2D vect representing the total force applied to the point
	force: {},

	init: function() {
		this.position = Object.create(vect2).initWithCoordinates(0, 0);
		this.velocity = Object.create(vect2).initWithCoordinates(0, 0);
		this.force = Object.create(vect2).initWithCoordinates(0, 0);

		return this;
	},
	initWithCoordinates : function(x, y)
	{
		this.position.initWithCoordinates(x,y);

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
		this.force.initWithCoordinates(0, 0);

		return this;
	},
	simulate: function(dt, m)
	{
		//velocity += force * (dt/ masse)
		var forcetmp = Object.create(vect2).initWithVect(this.force);
		this.velocity.sumWithVect(forcetmp.multiplyByScalar(dt/m));

		//position += velocity * dt;
		var velocitytmp = Object.create(vect2).initWithVect(this.velocity);
		this.position.sumWithVect(velocitytmp.multiplyByScalar(dt));

		return this;
	},
};