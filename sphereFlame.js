
var sphereFrac;
var renderer;

var globals;

var radius;
var depthSize;


var FPARAMS;
var GPARAMS;
var CPARAMS;
var METAPARAMS;
var SLIDERWIDTH;
var XMARGIN;
var VERTSEP;
var SPACING;


// OK so I get it now - the original version of this function
// wasn't getting called at all because you can't override
// the graphic primitive (box)
 


function crystals(depth, radius) {
	stroke(0,0,0);
	strokeWeight(1);
	fill(fgLerp(depth / globals.depth));
	box(depth * globals.weight * .1, radius * 1.414);
}

function points(depth, radius) {
	push();
	translate(0, 0, globals.radius);
	strokeWeight(depthSize(depth) * 2);
	stroke(fgLerp(depth / globals.depth));
	point(0, 0, 0);
	pop();
}

function rays(depth, radius) {
	strokeWeight(depthSize(depth) * 2);
	stroke(fgLerp(depth / globals.depth));
	line(0, 0, 0, 0, 0, globals.radius);
}


function cubes(depth, radius) {
	push();
	noStroke();
	translate(0, 0, globals.radius);
	fill(fgLerp(depth / globals.depth));
	box(depthSize(depth));
	pop();
}

function spheres(depth, radius) {
	push();
	noStroke();
	translate(0, 0, globals.radius);
	fill(fgLerp(depth / globals.depth));
	sphere(depthSize(depth));
	pop();
}

function discs(depth, radius) {
	push();
	noStroke();
	translate(0, 0, globals.radius);
	fill(fgLerp(depth / globals.depth));
	circle(0, 0, depthSize(depth) * 2);
	pop();
}




function renderFrac(frac, depth, scale) {
	renderer(depth, globals.radius);
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
	w0 = 20;

	DIRLIGHTX = -1;
	DIRLIGHTY = 1;
	DIRLIGHTZ = -1;

	SLIDERWIDTH = '200px';
	VERTSEP = 20;
	XMARGIN = 10;
	SPACING = 8;

	FPARAMS = ['dip', 'twist', 'scale'];
 	GPARAMS = ['depth', 'radius', 'points', 'weight'];
 	LPARAMS = ['balance', 'alpha'];
 	CPARAMS = ['bg', 'fg1', 'fg2' ];

	METAPARAMS = {
		dip: { min: 0, max: PI, value: 0, step: 0 },
		twist: { min: 0, max: PI, value: 0, step: 0 },
		scale: { min: 0, max: 1.2, value: 1, step: 0 },
		depth: { min: 1, max: 16, value: 8, step: 1 },
		radius: { min: 0, max: 480, value: 240, step: 1 },
		points: { min: 0, max: .2, value: .05, step: 0 },
		weight: { min: -1, max: 1, value: 0, step: 0 },
		alpha: { min: 0, max: 255, value: 255, step: 1},
		balance: { min: 0, max: 1, value: 0, step: 0 }
	};

	globals = {
		depth: 8,
		radius: 240,
		points: .1,
		weight: 0
	};

	lighting = {
		alpha: 80,
		balance: 0
	};

	colours = {
		'bg': color('#eeeeee'),
		'fg1': color('#e9b7b7'),
		'fg2': color('#b7e9b7'),
		'light': color('#ffffff')
	};

	var renderers = {
		'crystals': crystals,
		'points': points,
		'rays': rays,
		'cubes': cubes,
		'spheres': spheres,
		'discs': discs
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


	renderer = crystals;

	globals['controls'] = makeSliderControlSet('global', GPARAMS, globals);
	colours['controls'] = makeColourControlSet('colours', CPARAMS, colours);
	lighting['controls'] = makeSliderControlSet('lighting', LPARAMS, lighting);
	makeOptionsControl('renderer', 'look', renderers, (v) => { renderer = v });
	makeFractalControls(sphereFrac);

	//colorMode(HSB);

	strokeWeight(1);
	stroke(0,0,0);
	fill(255,255,255);


}



function applyControls(params, obj) {
	params.forEach((p) => {
		obj[p] = obj.controls[p].value();
	})
}

function applyColourControls(params, obj) {
	params.forEach((p) => {
		obj[p] = obj.controls[p].color();
	})
}


function draw() {
	applyControls(GPARAMS, globals);
	applyControls(LPARAMS, lighting);
	applyColourControls(CPARAMS, colours);
	sphereFrac.forEach((f) => { applyControls(FPARAMS, f); });

	var s0 = globals.points * globals.radius;

	depthSize = (d) => {
		return s0 + globals.weight * s0 * (d - globals.depth / 2) / globals.depth;
	};
 

	background(colours.bg);
	doLighting();
	orbitControl();
	renderFrac(sphereFrac, globals.depth, 1.0);
}