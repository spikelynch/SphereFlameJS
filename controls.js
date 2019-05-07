// control panels

function makeFractalControls(fractal) {
	for( var i = 0; i < fractal.length; i++ ) {
		fractal[i]['controls'] = makeControlSet('fract' + i, FPARAMS, fractal[i])
	}
}

function makeControlSet(prefix, paramlist, f) {
	var ctrls = {};
	var div = createDiv();
	div.class('controlset');
	var panel = select('#controls');
	div.parent(panel);
	for( var i = 0; i < paramlist.length; i++ ) {
		var p = paramlist[i];
		var id = prefix + p;
		var sdiv = createDiv();
		sdiv.parent(div);
		var label = createElement('label', p);
		label.attribute('for', id);
		label.parent(sdiv);
		ctrls[p] = createSlider(METAPARAMS[p]['min'], METAPARAMS[p]['max'], f[p], METAPARAMS[p]['step']);
		ctrls[p].id(id);
		ctrls[p].parent(sdiv);
	}
	return ctrls;
}

// function makeColourControls(prefix, y0, f) {
// 	var div = createDiv();
// 	div.class("controlset");
// 	var panel = select("#controls");
// 	div.parent(panel);
// }

