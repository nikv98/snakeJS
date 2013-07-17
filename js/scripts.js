function getRandomXCorr(shapeSize){
	return Math.floor(Math.random()*(stage.getWidth()-shapeSize));
}

function getRandomYCorr(shapeSize){
	return Math.floor(Math.random()*(stage.getHeight()-shapeSize));
}

var stage = new Kinetic.Stage({
        container: 'container',
        width: 800,
        height: 500,
        fill: '#7FFF00',
        listening: true
});
      
var layer = new Kinetic.Layer();

var lastKeyPressed = null;
var currentKey = null;

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
			//-= deltaX
			snakePoints[0] -= snakeStroke + 15;
			break;
		}
		case leftArrow:
		{
			//+= deltaX
			snakePoints[2] += snakeStroke + 15;
			break;
		}

	}
}

function move(key){
	if(lastKeyPressed == null){
		lastKeyPressed = currentKey;
	}
	//only change direction if the key isn't the same, and not the opposite key up vs down, left vs right
	if(currentKey != lastKeyPressed && Math.abs(lastKeyPressed-currentKey) != 2){
		//lets create a container to hold the turning point
		var turns = new Array();
		var turnPoint = null;

		if(lastKeyPressed == leftArrow || currentKey == leftArrow) //from left, going up or down
		{
			turnPoint = {x: snakePoints[0], y: snakePoints[1], direction: currentKey};
		}else if(lastKeyPressed == rightArrow || currentKey == rightArrow)
		{
			turnPoint = {x: snakePoints[2], y: snakePoints[3], direction: currentKey};
		}

		if(turnPoint != null){
			turns.push(turnPoint);
		}
	}else{
		
	}
	snake.setPoints(newLoc);
	drawGame();
}

function arrowKeyPressed(key)
{
	switch(key)
	{
		case leftArrow:
		{
			currentKey = leftArrow;
			move(currentKey);
			break;	
		}
		case rightArrow:
		{
			currentKey = rightArrow;
			move(currentKey);
			break;	
		}
		case upArrow:
		{
			currentKey = upArrow;
			move(currentKey);
			break;	
		}
		case downArrow:
		{
			currentKey = downArrow;
			move(currentKey);
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
   var x1 = snakePoints[0];
   var y1 = snakePoints[1];
   var x2 = snakePoints[2];
   var y2 = snakePoints[3];
   if(snakeFood.intersects([x1, y1]) || snakeFood.intersects([(x2-x1)/2, (y2-y1)/2]) || snakeFood.intersects([x2, y2]))
   {
   		console.log("Collided!!");
   		food.setPosition(getRandomXCorr(foodSize), getRandomYCorr(foodSize));
   		growSnake();
   		drawGame();
   }
}

function timeStep()
{
	if(currentKey != null) //a key has been pressed
	{
		arrowKeyPressed(currentKey);
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