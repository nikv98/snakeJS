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

var turns = new Array();

function move(key){
	//head is always at snakePoints[2] and snakePoints[3] respectivly
	if(snakePoints.length == 2){
		switch(key)
		{
			case leftArrow:
			{
				snakePoints.push(snakePoints[0] - moveRate);
				snakePoints.push(snakePoints[1]);
				break;	
			}
			case rightArrow:
			{
				snakePoints.push(snakePoints[0] + moveRate);
				snakePoints.push(snakePoints[1]);
				break;	
			}
			case upArrow:
			{
				snakePoints.push(snakePoints[0]);
				snakePoints.push(snakePoints[1] - moveRate);
				break;	
			}
			case downArrow:
			{
				snakePoints.push(snakePoints[0]);
				snakePoints.push(snakePoints[1] + moveRate);
				break;	
			}
		}
		return;
	}
	var turnPoint = null;
	var direction = 1;
	var m = NaN;
	switch(key){
		case leftArrow:
		{
			m = (snakePoints[3]-snakePoints[1])/((snakePoints[2] - moveRate) - snakePoints[0]);
			break;
		}
		case upArrow:
		{
			m = ((snakePoints[3] - moveRate)-snakePoints[1])/(snakePoints[2] - snakePoints[0]);
			break;
		}
		case rightArrow:
		{
			m = (snakePoints[3]-snakePoints[1])/((snakePoints[2] + moveRate) - snakePoints[0]);
			break;
		}
		case downArrow:
		{
			m = ((snakePoints[3] - moveRate)-snakePoints[1])/(snakePoints[2] - snakePoints[0]);
			break;
		}
	}
	console.log("m: " + m);
	if(m != 0){
		turnPoint = {"x": snakePoints[2], "y": snakePoints[3]};
		turns.push(turnPoint);
		console.log(turns);
	}

	var newLine = new Array();

	newLine.push(snakePoints[0]);
	newLine.push(snakePoints[1]);
	
	for(var index = 0; index < turns.length; index++){
		var turn = turns[index];
		newLine.push(Number(turn.x));
		newLine.push(Number(turn.y));
	}

	//lets have the tail follow the head
	switch(key){
		case leftArrow:
		{
			snakePoints[2] -= moveRate;
			break;
		}
		case upArrow:
		{
			snakePoints[3] -= moveRate;
			break;
		}
		case rightArrow:
		{
			snakePoints[2] += moveRate;
			break;
		}
		case downArrow:
		{
			snakePoints[3] += moveRate;
			break;
		}
	}
	newLine.push(snakePoints[2]);
	newLine.push(snakePoints[3]);

	for(var index = newLine.length - 1; index >= 3; index-=2){
		// var delta = Math.sqrt(Math.pow(newLine[index + 3] - newLine[index + 1], 2) + Math.pow(newLine[index + 2] - newLine[index], 2));
		
		// var deltaY = newLine[index] - newLine[index - 2];
		// var deltaX = newLine[index -1] - newLine[index - 3];
		// console.log("deltaX: " + deltaX);
		// console.log("deltaY: " + deltaY);
		// newLine[index] += deltaY;
		// newLine[index-1] += deltaX;
		// var nextY = newLine[index];
		// var nextX = newLine[index - 1];
		// if(nextX > newLine[index-3]){
		// 	newLine[index-3] += moveRate;
		// }else if(nextX < newLine[index-3]){
		// 	newLine[index-3] -= moveRate;
		// }

		// if(nextY > newLine[index -2]){
		// 	newLine[index -2] += moveRate;
		// }else if(nextY < newLine[index -2]){
		// 	newLine[index -2] -= moveRate;
		// }
	}

	console.log(newLine);

	lastKeyPressed = currentKey;
	snake.setPoints(newLine);
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
   if(snakeFood.intersects([x1, y1]) || snakeFood.intersects([x2, y2]))
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