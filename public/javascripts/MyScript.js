
window.addEventListener("load",window_onload,false);

var brick = [];
var ball;
var ballCreatingFlag =0;
var globalId;
var score=0;
var inc=5;
function window_onload(){
	flag =0;
	var iW = window.innerWidth;
	var iH = window.innerHeight;
	var can = document.createElement("canvas");
	can.setAttribute("id","draw");
	can.width = iW;
	can.height = iH;
	var division = 10;
	var doc = document.getElementById("d1");
	doc.appendChild(can);
	var context = can.getContext("2d");
	var leftLimit = iW/2;
	init(iW,iH,division,context,0);
	var animPos=0;

//////////////////////////////////////////////////////////	
//Testing the position. Can be deleted later
/*
var can1 = document.createElement("canvas");
	can1.setAttribute("id","draw1");
	var context1 = can1.getContext("2d");
can1.width = iW;
	can1.height = iH;
can1.style.position="absolute";
can1.style.top="0px";
can1.style.left="0px";
doc.appendChild(can1);
context1.beginPath();
		context1.lineWidth=2;
		context1.strokeStyle="red";
		context1.fillStyle = 'cornflowerblue';
		context1.fillRect(iW/2-2,0,4,iH);*/
///////////////////////////////////////////////////////////



	//creating balls on click event
	can.addEventListener('click',function(e){	
		if(ballCreatingFlag==0){
			ballCreatingFlag=1;
			context.beginPath();
			ball =  iH-106;
    	context.arc(iW/2,ball, 6, 0, 2 * Math.PI, false);
    	context.fillStyle = "red";
    	context.fill();
		}
	})

	function play(){
		animPos = update(leftLimit,animPos,inc);
		paint(leftLimit,context,inc,iW,iH,division,animPos);
		globalId = window.requestAnimationFrame(play);
	}	
	globalId = window.requestAnimationFrame(play);

}

function createBallChkCollision(width,height,context,division){
	if(ballCreatingFlag==1){
		context.clearRect(0, 151,width,height-251);
		context.beginPath();
		ball = ball-5;
  	context.arc(width/2, ball, 6, 0, 2 * Math.PI, false);
	  context.fillStyle = "red";
  	context.fill();
	}
	
	if(ball<0 && ballCreatingFlag==1){
		ballCreatingFlag=0;
		score--;
		context.clearRect(0, height-80,width/4,50);
		context.fillStyle = 'cornflowerblue';
		context.font = "20px Georgia";
		context.fillText("Your Score: "+score, 10,height-50);
	}

	var tempBrick = brick;
	for(var i=0; i<brick.length; i++){
		if(ball >= brick[i].y && ball <= brick[i].y+30 && width/2>=brick[i].x && width/2 <= brick[i].x+width/division && ballCreatingFlag==1){
				tempBrick.splice(i, 1);
				ballCreatingFlag=0;
				brick = tempBrick;
				score++;
				context.clearRect(0, height-80,width/2-100,150);
				context.fillStyle = 'cornflowerblue';
				context.font = "20px Georgia";
				context.fillText("Your Score: "+score, 10,height-50);

				break;
		}

	}
	
}

//updation of position of brick and drawing 
//moto of doing both in same function is to avoid traversing the brick array two times
function paint(lLimit,context,ad,width,height,division,pos)
{
	context.clearRect(0, 0,width,151);
	createBallChkCollision(width,height,context,division);
	if(brick.length>0){
		for(var i=0; i<brick.length; i++){
			var x = brick[i].x;
			var y = brick[i].y;
		
			if(flag==0){
				if(pos>=lLimit){
					x -= ad;
				}
				x += ad;
				brick[i].x = x;
			}
			if(flag==1){
			 	if(pos <= -lLimit){
					x += ad;
				}
			 	x -= ad;
				brick[i].x = x;
			}
			context.beginPath();
			context.lineWidth=2;
			context.strokeStyle="red";
			context.fillStyle = 'cornflowerblue';
			context.rect(brick[i].x,brick[i].y,width/division,30);
			context.fill();
			context.stroke();
		}
	}
	else{
			window.cancelAnimationFrame(globalId);
			globalId=null;
			document.getElementById("d1").removeChild(document.getElementById("draw"));
			inc += 5;
			window_onload();
			alert("Your Score: "+score);
	}
}

function init(width,height,division,context,x){
	score=0;
	var canWid = width/division;
	var canHei = 30;
		context.beginPath();
		context.lineWidth=2;
		context.strokeStyle="red";
		context.fillStyle = 'cornflowerblue';

	//Initial drawing of bricks and storing position of each brick in brick array
		for(var j=0;j<5;j++){	
			for(var i=0;i<division;i++){
				var rnd = Math.round(Math.random());
				var x1=x+i*canWid;
				var y1=j*canHei;
				if(rnd==1){
					context.rect(x1,y1,canWid,canHei);
					context.fill();
					context.stroke();
					obj={x:x1,y:y1}
					brick.push(obj);
				}
			}
		}

		//drawing gun
		var path=new Path2D();
    path.moveTo(width/2,height-100);
    path.lineTo(width/2-10,height-80);
    path.lineTo(width/2-10,height);
		path.lineTo(width/2+10,height);
    path.lineTo(width/2+10,height-80);
		context.fill(path);

		context.font = "20px Georgia";
		context.fillText("Your Score: "+score, 10,height-50);


}



function update(lLimit,anim,inc){
	if(flag==0){
		if(anim>=lLimit){
			flag = 1;
			return anim - inc;
		}
		anim = anim + inc;
		return anim;
	}
	if(flag==1){
		 if(anim <= -lLimit){
			flag=0;
			return anim +inc;
		}
	 	anim = anim - inc;
		return anim;
	}
}

