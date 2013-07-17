function getRandomXCorr(shapeSize){
	return Math.floor(Math.random()*(stage.getWidth()-shapeSize));
}

function getRandomYCorr(shapeSize){
	return Math.floor(Math.random()*(stage.getHeight()-shapeSize));
}

var stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
        listening: true
});
      
var layer = new Kinetic.Layer();

var lastKeyPressed = null;

var leftArrow = 37;
var upArrow = 38; 
var rightArrow = 39;
var downArrow = 40; 

//shapes
var snakePoints = new Array();

var snakeStroke = 22;

//lets place the snake in the middle of the screen
//snake x
snakePoints.push(stage.getWidth()/2);
//snake y
snakePoints.push(stage.getHeight()/2);

//snake x2
snakePoints.push(stage.getWidth()/2 + snakeStroke);
//snake y2
snakePoints.push(stage.getHeight()/2);

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

var foodSize = 35; 
var food = new Kinetic.Rect({
        x: getRandomXCorr(foodSize),
        y: getRandomYCorr(foodSize),
        width: foodSize,
        height: foodSize,
        fill: 'yellow',
        strokeWidth: 4
      });

//move logic

var moveRate = 7;

// var w = 87;
// var a = 65;
// var s = 83;
// var d = 68;

function drawGame(){
	layer.clear();
	snake.draw();
	food.draw();
}

function growSnake(){
	
	console.log("GROWING SNAKE: " + lastKeyPressed);
	switch(lastKeyPressed){
		case rightArrow:
		{
			var Xn = snakePoints[snakePoints.length-2];
			var Yn = snakePoints[snakePoints.length-1];
			var newX = Xn - snakeStroke;
			snakePoints.push(newX, Yn, newX - snakeStroke, Yn);
			console.log|("Right push");
			break;
		}
		case leftArrow:
		{
			//the old largest values
			var X0 = snakePoints[0];
			var Y0 = snakePoints[1];
			var newX = X0 + snakeStroke;
			snakePoints.unshift(newX, Y0, newX + snakeStroke, Y0);
			console.log|("Left Unshift");
			break;
		}

	}
	snake.setPoints(snakePoints);
	console.log(snakePoints);
}

function move(deltaX, deltaY){
	var newLoc = snakePoints;
	for(var index = 0; index < newLoc.length; index+=2){
		//x
		newLoc[index] += deltaX;
		//y
		newLoc[index+1] += deltaY;
	}
	snakePoints = newLoc;
	snake.setPoints(newLoc);
	drawGame();
}

function arrowKeyPressed(key)
{
	switch(key)
	{
		case leftArrow:
		{
			lastKeyPressed = leftArrow;
			move(-moveRate, 0);
			break;	
		}
		case rightArrow:
		{
			lastKeyPressed = rightArrow;
			move(moveRate, 0);
			break;	
		}
		case upArrow:
		{
			lastKeyPressed = upArrow;
			move(0, -moveRate);
			break;	
		}
		case downArrow:
		{
			lastKeyPressed = downArrow;
			move(0, moveRate);
			break;	
		}
	}
}

function doKeyDown(e) {
	arrowKeyPressed(e.keyCode);
}

function  snakeEats(snakeFood){ // a and b are your objects
   //snakePoints[0] is X1 as well as thew largest X of the snake
   //snakePoints[1] is Y1 as well as the largest Y of the snake

   //snakePoints[n-2] is Xn as well as the smallest ||X of the snake
   //snakePoints[n-1] is Yn, the last cell in the array, and the smallest Y of the snake

   //to compute if snakeFood intersects the snake, we start the range at the largest pair (x1, y1) and the smallest pair (Xn-2, Yn-2)
   //these facts are possible because the head of the snake is always at the "front" or beginning of the array. A snake's length at Xn-2 and Yn-1 get ever closer to 0,0 as the snake eats and grows

   if(snakeFood.getX() + snakeFood.getWidth() >= snakePoints[snakePoints.length-2] && snakeFood.getX() <= snakePoints[0] &&
   	  snakeFood.getY() + snakeFood.getHeight() >= snakePoints[snakePoints.length-1] && snakeFood.getY() <= snakePoints[1])
   {
   		console.log("Collided!!");
   		food.setPosition(getRandomXCorr(foodSize), getRandomYCorr(foodSize));
   		growSnake();
   		drawGame();
   }
}

function timeStep()
{
	if(lastKeyPressed != null) //a key has been pressed
	{
		arrowKeyPressed(lastKeyPressed);
		snakeEats(food);
	}
}

layer.add(food);
layer.add(snake);
stage.add(layer);

//add listeners after painting complete
window.addEventListener( "keydown", doKeyDown, true);
//lets make the snake continuiously move
var gameTimer=setInterval(function(){timeStep()},100);