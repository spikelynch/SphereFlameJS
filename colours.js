
var colours;
var lighting;

var DIRLIGHTX;
var DIRLIGHTY;
var DIRLIGHTZ;	

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


function fgLerp(k) {
	var c = lerpColor(color(colours.fg1), color(colours.fg2), k);
	c.setAlpha(lighting.alpha);
	return c;
}

