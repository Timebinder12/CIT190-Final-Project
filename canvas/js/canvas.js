var myGamePiece;
var myObstacles = [];
var myColors = ["red", "orange", "yellow"];
var myScore;



function startGame() {
    myGamePiece = new component(20, 20, "media/ball.png", 10, 120, "image");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    div : document.getElementById("container"),
    start : function() {
        this.canvas.style.cursor = "none";
        this.canvas.width = 550;
        this.canvas.height = 370;
        this.context = this.canvas.getContext("2d");
        this.div.append(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousemove', function(e){
            const relativeX = e.pageX - myGameArea.canvas.offsetLeft;
            const relativeY = e.pageY - myGameArea.canvas.offsetTop;
           
            if(relativeX > 0 && relativeX < myGameArea.canvas.width){
                myGameArea.x = relativeX;
            }
            if(relativeY > 0 && relativeY < myGameArea.canvas.height){
                myGameArea.y = relativeY;  
            }
        })   
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if(type == "image"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        if(this.type == "image"){
            ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);    
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if(myGameArea.x && myGameArea.y){
        myGamePiece.x = myGameArea.x;
        myGamePiece.y = myGameArea.y;
    }
    if (myGameArea == 1 || everyinterval(50)) {
        
        x = myGameArea.canvas.width;
        maxY = myGameArea.canvas.height;
        yPos = Math.floor(Math.random() * (maxY) + 1);
        colorChoice = Math.floor(Math.random() * (myColors.length));
        myObstacles.push(new component(10, 10, myColors[colorChoice], x, yPos));
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

