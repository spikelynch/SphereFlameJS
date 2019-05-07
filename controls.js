// control panels

function makeControls(y0, fractal) {
	var y = y0;
	for( var i = 0; i < fractal.length; i++ ) {
		fractal[i]['controls'] = makeControlSet('fract' + i, FPARAMS, y, fractal[i])
		y += FPARAMS.length * VERTSEP + SPACING;
	}
}

function makeControlSet(prefix, paramlist, y0, f) {
	var ctrls = {};
	var y = 0;
	var div = createDiv();
	div.class('controlset');
	//div.position(XMARGIN, y0);
	var panel = select('#controls');
	div.parent(panel);
	for( var i = 0; i < paramlist.length; i++ ) {
		var p = paramlist[i];
		var id = prefix + p;
		var sdiv = createDiv();
		sdiv.parent(div);
		// sdiv.position(0, y);
		var label = createElement('label', p);
		label.attribute('for', id);
		label.parent(sdiv);
		ctrls[p] = createSlider(METAPARAMS[p]['min'], METAPARAMS[p]['max'], f[p], METAPARAMS[p]['step']);
		ctrls[p].id(id);
		ctrls[p].parent(sdiv);
//		ctrls[p].style('width', SLIDERWIDTH);
		y += VERTSEP;
	}
	return ctrls;
}

