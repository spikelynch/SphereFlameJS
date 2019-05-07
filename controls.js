// control panels

function makeFractalControls(fractal) {
	for( var i = 0; i < fractal.length; i++ ) {
		fractal[i]['controls'] = makeSliderControlSet('fract' + i, FPARAMS, fractal[i])
	}

}

function controlSetDiv() {
	var div = createDiv();
	div.class('controlset');
	var panel = select('#controls');
	div.parent(panel);
	return div;
}

function addControl(container, prefix, p, control) {
	var sdiv = createDiv();
	sdiv.parent(container);
	var id = prefix + p;
	var label = createElement('label', p);
	label.attribute('for', id);
	label.parent(sdiv);
	control.id(id);
	control.parent(sdiv);
}

function makeSliderControlSet(prefix, paramlist, f) {
	var ctrls = {};
	var div = controlSetDiv();
	for( var i = 0; i < paramlist.length; i++ ) {
		var p = paramlist[i];
		ctrls[p] = createSlider(METAPARAMS[p]['min'], METAPARAMS[p]['max'], f[p], METAPARAMS[p]['step']);
		addControl(div, prefix, p, ctrls[p]);		
	}
	return ctrls;
}

// function makeColourControls(prefix, y0, f) {
// 	var div = controlSetDiv();
// 	var cnames = [ 'bg', 'start', 'end' ];
// 	cnames.forEach((c) => {

// 	})

