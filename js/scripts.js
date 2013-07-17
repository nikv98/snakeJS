var stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
        listening: true
});
      
var layer = new Kinetic.Layer();

var leftArrow = 37;
var upArrow = 38; 
var rightArrow = 39;
var downArrow = 40; 

// var w = 87;
// var a = 65;
// var s = 83;
// var d = 68;

function doKeyDown(e) {

	console.log(e.keyCode);

	switch(e.keyCode)
	{
		case leftArrow:
		{
			console.log("left");
			break;	
		}
		case rightArrow:
		{
			console.log("right");
			break;	
		}
		case upArrow:
		{
			console.log("up");
			break;	
		}
		case downArrow:
		{
			console.log("down");
			break;	
		}
	}

}

var container = document.getElementById('container');
window.addEventListener( "keydown", doKeyDown, true);