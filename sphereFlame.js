function setup() {

	createCanvas(windowWidth,windowHeight,WEBGL);

}

function draw() {
	background(255);

	  box(30);
  translate(100,100,-100);
  rotate(PI/4, [1,1,0]);
  box(30);

}