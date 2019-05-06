
var sphereFrac;
var drawer;

var radius;
var weight;


function box(depth) {
	push();
	translate(0, 0, radius);
	noStroke();
	fill(255, 0, 0, 128);
	box(weight * depth * 0.2);
	pop();
}

function renderFrac(frac, depth, scale) {
	drawer(depth, radius);
	if( depth > 0 ) {
		frac.forEach((trans) => {
			push();
			rotateX(scale * trans.twist);
			rotateY(scale * trans.dip);
			renderFrac(frac, depth - 1, trans.scale * scale);
			pop();
		})
	}
}


function setup() {

	createCanvas(windowWidth,windowHeight,WEBGL);

	radius = 400;
	weight = 10;

	sphereFrac = [
		{
			dip: PI * .3,
			twist: PI * .1,
			scale: 0.8
		},
		{
			dip: PI * -.2,
			twist: PI * .15,
			scale: 1.4
		}
	];

	drawer = box;
}




function draw() {
	background(255);

	renderFrac(sphereFrac, 8, 1.0);

}