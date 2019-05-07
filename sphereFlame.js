
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


// OK so I get it now - the original version of this function
// wasn't getting called at all because you can't override
// the graphic primitive (box)
 

function cubes(depth, radius) {
	push();
	translate(0, 0, globals.radius);
	fill(colours.fg);
	box(globals.weight * depth * 0.2);
	pop();
}

function crystals(depth, radius) {
	fill(colours.fg);
	box(depth * globals.weight, radius);
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


	SLIDERWIDTH = '200px';
	VERTSEP = 20;
	XMARGIN = 10;
	SPACING = 8;

	FPARAMS = ['dip', 'twist', 'scale'];
 	GPARAMS = ['depth', 'radius', 'weight', 'alpha' ];
 	CPARAMS = ['bg', 'fg'];

	METAPARAMS = {
		dip: { min: -PI, max: PI, value: 0, step: 0 },
		twist: { min: -PI, max: PI, value: 0, step: 0 },
		scale: { min: 0, max: 2, value: 1, step: 0 },
		depth: { min: 1, max: 12, value: 8, step: 1 },
		radius: { min: 0, max: 800, value: 400, step: 1 },
		weight: { min: 0, max: 1.5, value: 1, step: 0 },
		alpha: { min: 0, max: 255, value: 255, step: 1}
	};

	globals = {
		depth: 8,
		radius: 360,
		weight: 10,
		alpha: 255
	};

	colours = {
		'bg': color('white'),
		'fg': color('white'),
		'end': color('red')
	};

	var renderers = {
		'crystals': crystals,
		'cubes': cubes
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
	makeOptionsControl('renderer', 'look', renderers, (v) => { renderer = v });
	makeFractalControls(sphereFrac);

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
	applyColourControls(CPARAMS, colours);
	sphereFrac.forEach((f) => { applyControls(FPARAMS, f); });

	background(colours.bg);

	orbitControl();
	renderFrac(sphereFrac, globals.depth, 1.0);
}