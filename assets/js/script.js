let myGamePiece,redGamePiece,yellowGamePiece;
let myObstacles = [];
let myScore;
let myBackground;

function startGame() {
	myGameArea.start();
	myGamePiece = new component(50, 50, "assets/js/flappy_bird.png", 250, 300, "image");
	myBackground = new component(1920, 960, "assets/js/sky.jpg",0, 0, "image");
	myScore = new component("50px", "Comic Sans", "white", 280, 40, "text");
	myGameArea.start();
	// myObstacle = new component(30, 300, "green", 500, 350);
	// redGamePiece = new component(50, 50, "red", 10, 80);
	// yellowGamePiece = new component(50, 50, "yellow", 10, 260);
}

let myGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = 1000;
		this.canvas.height = 620;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 30);
		window.addEventListener('keydown', function (e){
			myGameArea.key = e.keyCode;
		})
		window.addEventListener('keyup', function (e){
			myGameArea.key = false;
		})
	},
	clear: function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function(){
		clearInterval(this.interval);
	}
}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 ==0) {return true;}
	return false;
}

function component(width, height, color, x, y, type) {
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	// this.gravity = 0.05;
	// this.gravitySpeed = 0;
	this.x = x;
	this.y = y;
	this.update = function(){
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} 
		if (type == "image"){
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width,
				this.height);
		}else {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this. height);
		}
	}
	this.newPos = function(){
		// this.gravitySpeed += this.gravity;
		this.x += this.speedX;
		this.y += this.speedY;
		this.hitBottom();
		this.hitRight();
	}
	this.hitBottom = function() {
		let rockbottom = myGameArea.canvas.height - this.height;
		if (this.y > rockbottom){
			this.y = rockbottom;
		}
	}
	this.hitRight = function(){
		let rightwall = myGameArea.canvas.width - this.width;
		if (this.x > rightwall){
			this.x = rightwall;
		}
	}
	this.crashWith = function(otherobj) {
		let myleft = this.x;
		let myright = this.x + (this.width);
		let mytop = this.y;
		let mybottom = this.y + (this.height);
		let otherleft = otherobj.x;
		let otherright = otherobj.x + (otherobj.width);
		let othertop = otherobj.y;
		let otherbottom = otherobj.y + (otherobj.height);
		let crash = true;
		if ((mybottom < othertop) || 
			(mytop > otherbottom) || 
			(myright < otherleft) ||
			(myleft > otherright)) {
				crash = false;
		}
		return crash;
		
		// alert("Game Over!");
	}
}

function updateGameArea(){
	let x, y;
	for (i=0;i<myObstacles.length; i += 1){
	if (myGamePiece.crashWith(myObstacles[i])) {
		myGameArea.stop();
		alert("Game Over!");
		} 
	}
	myGameArea.clear();
	myScore.text = "Score: " + myGameArea.frameNo;
	myGameArea.frameNo += 1;
		
	if(myGameArea.frameNo == 1 || everyinterval (250)) {
		x = myGameArea.canvas.width;
		minHeight = 50;
		maxHeight = 300;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		minGap = 100;
		maxGap = 300;
		gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		myObstacles.push(new component(30, height, "black", x, 0));
		myObstacles.push(new component(30, x - height - gap, "red", x, height + gap));
		// y = myGameArea.canvas.height - 200
		// myObstacles.push(new component(30, 300, "green", x, y));
	}
	for (i = 0;i < myObstacles.length; i += 1){
		myObstacles[i].update();
		myObstacles[i].x += -1;
	}
	myScore.update();
	 	// myBackground.update();
	 	// myBackground.newPos();
	myGamePiece.newPos();
	myGamePiece.update();
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	// myObstacle.update();
	// myObstacle.x += -1;
	if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3;}
	if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3;}
	if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3;}
	if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3;}
	if (myGameArea.key && myGameArea.key == 65) {myGamePiece.speedX = -3;}
	if (myGameArea.key && myGameArea.key == 68) {myGamePiece.speedX = 3;}
	if (myGameArea.key && myGameArea.key == 87) {myGamePiece.speedY = -3;}
	if (myGameArea.key && myGameArea.key == 83) {myGamePiece.speedY = 3;}
	myGamePiece.x += 1;
	myGamePiece.y += 1;
	// redGamePiece.x += 1;
	// yellowGamePiece.x += 1;
		// redGamePiece.update();
		// yellowGamePiece.update();

	
}
