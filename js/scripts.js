var stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
        listening: true
});
      
var layer = new Kinetic.Layer();

var lastKeyPressed;

var leftArrow = 37;
var upArrow = 38; 
var rightArrow = 39;
var downArrow = 40; 

//shapes
var snakePoints = new Array();

var snakeStroke = 10;

//lets place the snake in the middle of the screen
//snake x
snakePoints.push(stage.getWidth()/2);
//snake y
snakePoints.push(stage.getHeight()/2);

//snake x2
snakePoints.push(stage.getWidth()/2 + snakeStroke);
//snake y2
snakePoints.push(stage.getHeight()/2);

console.log(snakePoints);

var snake = new Kinetic.Line({
        points: snakePoints,
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'round',
        lineJoin: 'round',
        /*
         * line segments with a length of 33px
         * with a gap of 10px
         */
        dashArray: [22, 15],
        listening: true
      });

//move logic

var moveRate = 7;

// var w = 87;
// var a = 65;
// var s = 83;
// var d = 68;

function move(deltaX, deltaY){
	var newLoc = snakePoints;
	for(var index = 0; index < newLoc.length; index+=2){
		//x
		newLoc[index] += deltaX;
		//y
		newLoc[index+1] += deltaY;
	}
	snake.setPoints(newLoc);
	layer.clear();
	snake.draw();
}

function arrowKeyPressed(key)
{
	console.log(key);

	switch(key)
	{
		case leftArrow:
		{
			console.log("left");
			lastKeyPressed = leftArrow;
			move(-moveRate, 0);
			break;	
		}
		case rightArrow:
		{
			console.log("right");
			lastKeyPressed = rightArrow;
			move(moveRate, 0);
			break;	
		}
		case upArrow:
		{
			console.log("up");
			lastKeyPressed = upArrow;
			move(0, -moveRate);
			break;	
		}
		case downArrow:
		{
			console.log("down");
			lastKeyPressed = downArrow;
			move(0, moveRate);
			break;	
		}
	}
}

function doKeyDown(e) {
	arrowKeyPressed(e.keyCode);
}

function timeStep()
{
	console.log("Game Loop Running");
	if(lastKeyPressed != null) //a key has been pressed
	{
		arrowKeyPressed(lastKeyPressed);
	}
}

layer.add(snake);
stage.add(layer);

//add listeners after painting complete
window.addEventListener( "keydown", doKeyDown, true);
//lets make the snake continuiously move
var gameTimer=setInterval(function(){timeStep()},100);