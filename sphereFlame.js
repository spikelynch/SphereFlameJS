
var sphereFrac;
var renderer;

var globals;
var colours;

var radius;
var weight;


var FPARAMS;
var GPARAMS;
var CPARAMS;
var METAPARAMS;
var SLIDERWIDTH;
var XMARGIN;
var VERTSEP;
var SPACING;
var DIRLIGHTX;
var DIRLIGHTY;
var DIRLIGHTZ;	


// OK so I get it now - the original version of this function
// wasn't getting called at all because you can't override
// the graphic primitive (box)
 

function cubes(depth, radius) {
	push();
	noStroke();
	translate(0, 0, globals.radius);
	fgAlpha();
	box(depthSize(depth));
	pop();
}

function crystals(depth, radius) {
	fgAlpha();
	box(depth * globals.weight * .1, radius * 1.414);
}

function spheres(depth, radius) {
	push();
	noStroke();
	translate(0, 0, globals.radius);
	fgAlpha();
	sphere(depthSize(depth));
	pop();
}

function depthSize(depth) {
	return globals.weight * sqrt(depth);
}

function fgAlpha() {
	var c = color(colours.fg);
	c.setAlpha(lighting.alpha);
	fill(c);
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
	weight = 10;

	DIRLIGHTX = -1;
	DIRLIGHTY = 1;
	DIRLIGHTZ = -1;

	SLIDERWIDTH = '200px';
	VERTSEP = 20;
	XMARGIN = 10;
	SPACING = 8;

	FPARAMS = ['dip', 'twist', 'scale'];
 	GPARAMS = ['depth', 'radius', 'weight'];
 	LPARAMS = ['balance', 'alpha'];
 	CPARAMS = ['bg', 'fg', 'light'];

	METAPARAMS = {
		dip: { min: 0, max: PI, value: 0, step: 0 },
		twist: { min: 0, max: PI, value: 0, step: 0 },
		scale: { min: 0, max: 2, value: 1, step: 0 },
		depth: { min: 1, max: 12, value: 8, step: 1 },
		radius: { min: 0, max: 480, value: 240, step: 1 },
		weight: { min: 0, max: 80, value: 20, step: 0 },
		alpha: { min: 0, max: 255, value: 255, step: 1},
		balance: { min: 0, max: 1, value: 0, step: 0 }
	};

	globals = {
		depth: 8,
		radius: 240,
		weight: 20
	};

	lighting = {
		alpha: 80,
		balance: 0
	};

	colours = {
		'bg': color('#eeeeee'),
		'fg': color('#e9b7b7'),
		'light': color('#ffffff')
	};

	var renderers = {
		'crystals': crystals,
		'cubes': cubes,
		'spheres': spheres
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

	strokeWeight(1);
	stroke(0,0,0);
	fill(255,255,255);


}

function doLighting() {
	var c = color(colours.light);
	var r = red(c);
	var g = green(c);
	var b = blue(c);
	var d = lighting.balance;
	var a = 1 - d;
	ambientLight(r * a, g * a, b * a);
	directionalLight(r * d, g * d, b * d, DIRLIGHTX, DIRLIGHTY, DIRLIGHTZ); 
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

	background(colours.bg);
	doLighting();
	orbitControl();
	renderFrac(sphereFrac, globals.depth, 1.0);
}