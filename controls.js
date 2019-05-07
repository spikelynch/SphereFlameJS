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

function makeColourControlSet(prefix, paramlist, f) {
	var ctrls = {};
	var div = controlSetDiv();
	paramlist.forEach((p) => {
		ctrls[p] = createColorPicker(f[p]);
		addControl(div, prefix, p, ctrls[p]);
	});
	return ctrls;
}

function makeOptionsControl(prefix, label, options, callback) {
	var div = controlSetDiv();
	var ctrl = createSelect();
	Object.keys(options).forEach((o) => { ctrl.option(o) });
	ctrl.changed(() => {
		var v = ctrl.value();
		callback(options[v])
	});
	addControl(div, prefix, label, ctrl);
}

