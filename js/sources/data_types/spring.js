var SPRING_CONSTANT = 0.3;
var FRICTION_CONSTANT = 0.2;

// A spring is a connection beween to punctual masses
var spring = {
	point1: {},
	point2: {},

	initWithPoints: function(point1, point2) {
		this.point1 = point1;
		this.point2 = point2;

		return this;
	},
	_calculate: function() {
		this.force = Object.create(vect2).initWithCoordinates(0, 0);

		// V[i-1] - V[i] = + V[i] * (-1) + V[i-1]
		var springVector = Object.create(vect2).initWithVect(this.point2.position).multiplyByScalar(-1).sumWithVect(this.point1.position);
		var r = springVector.length();

		var force = springVector.devideByScalar(r).multiplyByScalar(-(r - 1) * SPRING_CONSTANT);


		var velocitytmp1 = Object.create(vect2).initWithVect(this.point1.velocity);
		var velocitytmp2 = Object.create(vect2).initWithVect(this.point2.velocity);

		var springVelocity = velocitytmp1.sumWithVect(velocitytmp2.multiplyByScalar(-1));
		var springVelocityResistance = springVelocity.multiplyByScalar(-FRICTION_CONSTANT);

		return force.sumWithVect( springVelocityResistance );

	},
	applyForces: function() {
		var force = this._calculate();

		this.point1.addForceFromVect(force);
		this.point2.addForceFromVect(force.multiplyByScalar(-1));

		return this;
	}
};