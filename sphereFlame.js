
var sphereFrac;
var drawer;

var radius;
var weight;

var PARAMS;
var SETTINGS;
var SLIDERWIDTH;
var XMARGIN;
var VERTSEP;
var SPACING;

function box(depth) {
	push();
	translate(0, 0, radius);
	stroke("blue", 128);
	fill(255, 0, 0, 128);
	box(weight * depth * 0.2);
	pop();
}

function box2(depth) {
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


function makeControls(fractal) {
	var y = 10;
	for( var i = 0; i < fractal.length; i++ ) {
		fractal[i]['controls'] = makeControlSet(y, fractal[i])
		y += PARAMS.length * VERTSEP + SPACING;
	}
}

function makeControlSet(y0, f) {
	var ctrls = {};
	var y = y0;
	for( var i = 0; i < PARAMS.length; i++ ) {
		var p = PARAMS[i];
		ctrls[p] = createSlider(SETTINGS[p]['min'], SETTINGS[p]['max'], f[p], 0);
		ctrls[p].position(XMARGIN, y);
		ctrls[p].style('width', SLIDERWIDTH);
		y += VERTSEP;
	}
	return ctrls;
}


function setup() {

	createCanvas(800,800,WEBGL);

	radius = 400;
	weight = 10;

	SLIDERWIDTH = '200px';
	VERTSEP = 20;
	XMARGIN = 10;
	SPACING = 8;

	PARAMS = ['dip', 'twist', 'scale'];
	SETTINGS = {
		dip: { min: 0, max: PI, value: 0 },
		twist: { min: 0, max: PI, value: 0 },
		scale: { min: 0, max: 2, value: 1 }
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

	makeControls(sphereFrac);

	drawer = box;
}




function draw() {
	background(255);

	sphereFrac.forEach((f) => {
		PARAMS.forEach((p) => {
			f[p] = f.controls[p].value();
		});
	});

	renderFrac(sphereFrac, 8, 1.0);

}