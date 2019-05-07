
var sphereFrac;
var drawer;

var globals;

var radius;
var weight;


var FPARAMS;
var METAPARAMS;
var SLIDERWIDTH;
var XMARGIN;
var VERTSEP;
var SPACING;

function box(depth) {
	push();
	translate(0, 0, globals.radius);
	stroke(50,50,0, 128);
	strokeWidth(10 * depth);
	//fill(255, 0, 0, 128);
	//box(weight * depth * 0.2);
	sphere(globals.weight * depth * 0.2);
	pop();
}

function box2(depth) {
	push();
	translate(0, 0, globals.radius);
	noStroke();
	fill(255, 0, 0, 128);
	box(globals.weight * depth * 0.2);
	pop();
}


function renderFrac(frac, depth, scale) {
	drawer(depth, globals.radius);
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

	createCanvas(720,640,WEBGL);

	radius = 400;
	weight = 10;


	SLIDERWIDTH = '200px';
	VERTSEP = 20;
	XMARGIN = 10;
	SPACING = 8;

	FPARAMS = ['dip', 'twist', 'scale'];
 
 	GPARAMS = ['depth', 'radius' ];

	METAPARAMS = {
		dip: { min: -PI, max: PI, value: 0, step: 0 },
		twist: { min: -PI, max: PI, value: 0, step: 0 },
		scale: { min: 0, max: 2, value: 1, step: 0 },
		depth: { min: 1, max: 12, value: 8, step: 1 },
		radius: { min: 0, max: 800, value: 400, step: 1 },
		weight: { min: 1, max: 20, value: 10, step: 1}
	};

	globals = {
		depth: 8,
		radius: 360,
		weight: 10
	};

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

	globals['controls'] = makeControlSet('global', GPARAMS, 10, globals)
	makeControls(10 + GPARAMS.length * VERTSEP + SPACING, sphereFrac);

	drawer = box;
}


function applyControls(params, obj) {
	params.forEach((p) => {
		obj[p] = obj.controls[p].value();
	})
}



function draw() {
	background(255);

	orbitControl();

	applyControls(GPARAMS, globals);
	sphereFrac.forEach((f) => { applyControls(FPARAMS, f); });

	renderFrac(sphereFrac, globals.depth, 1.0);

}