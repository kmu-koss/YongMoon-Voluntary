/*
원리
1. 아직 간 적 없는 위치에 들어왔을 경우 흰색을 칠해주고 방문했음을 변수로 남김.

2. 막다른 골목에 도달했을 경우는 막다르지 않은 지점까지 백트랙킹을 함. 
이 때, 여태껏 걸어온 경로를 스택에 저장해두면 역으로 꺼내면서 되돌아가는 게 가능.
헨델과 그레텔 빵조각떨구기 생각하면 이해하기 쉽다.

3. 새 길을 만들 때마다 스택에 저장하고, 다시 백트랙킹 할 때마다 스택에서 빼면서 진행하면 
자동으로 전 구역을 스캔한 후 최초 지점으로 돌아오고 스택은 제로가 되며 알고리즘이 종료됨.

! x, y 좌표가 모두 홀수인 칸에서 오른쪽 혹은 아래 둘 중 하나를 뚫는 알고리즘 !

*/


var tc = 21; // tile count (무조건 홀수)
var gs = 20; // 미로 사이즈 grid size
var field; // 미로 벽에 대해 값이 0인 맵 위치 배열
var px = py = 1; // 0 < =  px,py < tc
var xv = yv = 0;
var tracker;
var stack;
var stucked;

var cx, cy; 

window.onload = function(){
	canv = document.getElementById("maze");	// 미로 캔버스
	ctx = canv.getContext("2d"); // 2d 그래픽의 컨텍스트 타입 지정
	document.addEventListener("keydown", keyPush); // 키를 누르면 발생하는 keydown 타입의 이벤트
	initialize(); // 게임 시작하기 위한 함수
	
}

// enter 키를 눌렀다가 땠을 때 이벤트
function enterkey() {
    if (window.event.keyCode == 13) { // enter 키의 아스키 코드 : 13, 엔터를 누르면

        /*
         * mazesize라는 ID에 의해 구분되는 element의 값을 가져오는 sizeInput변수 생성
         * 미로 사이즈가 짝수면 "Please enter an odd number." 경고 메시지 생성
         * 미로 사이즈가 홀수면 미로의 사이즈를 타일의 갯수 변수에 저장, 게임 시작   
         */     
    	
    }
}


function initialize(){
	document.getElementById("mazeSize").value = tc;
	make2DArray();
	
	ctx.fillStyle = "black"; // 캔버스의 스타일 지정
	canv.width = canv.height = tc*gs; // 캔버스 크기 지정

	// fillRect(x, y, width, height), 시작점이 (x, y)이고 크기 width, height
	ctx.fillRect(0, 0, canv.width, canv.height); // 캔버스 시작점과 지정한 크기만큼의 사각형 생성


	makeWay(0, 1);
	makeWay(tc - 1, tc - 2);
	
	px = py = 1;
	// tracker initial position
	tracker = {x: px, y: py};
	stack = [];
	stack.push(tracker);
	stucked = false;
	randomMazeGenerator();
	
	cx = 0; cy = 1;
	ctx.fillStyle = "red";
	ctx.fillRect(cx*gs, cy*gs, gs, gs); // 빨간 점 위치 상시 바뀜
	
}

function makeWay(xx,yy){
	field[yy][xx]++;
	ctx.fillStyle="white";
	ctx.fillRect(xx*gs, yy*gs, gs, gs);
}

// 방향 키 이벤트
function keyPush(evt){

    /*
     * 방향 키에 따른 좌표 값 변경 (왼쪽 화살표 키, 위쪽 화살표 키, 오른쪽 화살표 키, 아래쪽 화살표 키)
     * ! 아스키 코드 !
     * left : 37
     * up : 38
     * right : 39
     * down : 40
     */


	cx += xv;
	cy += yv;
	if(cx < 0 || cx > tc-1 || cy < 0 || cy > tc-1 || field[cy][cx] == 0){
		cx -= xv;
		cy -= yv;
		return;
	} else{
		ctx.fillStyle="red";
		ctx.fillRect(cx*gs, cy*gs, gs, gs);
		ctx.fillStyle="white";
		ctx.fillRect((cx-xv)*gs, (cy-yv)*gs, gs, gs);
		document.getElementById("text").innerHTML = "cx: " + cx + " cy: " + cy; // element 안의 HTML이나 XML 가져옴

        /* 
         * 도착 지점에 도달했을 때, "You Win!"이라는 경고 메시지 생성, 게임 리셋
         */
	}
		
}

function make2DArray(){
	console.log("tc: " + tc);
	field = new Array(parseInt(tc)); // 배열 생성
	for(var i=0; i<field.length; i++){
		field[i] = new Array(parseInt(tc));
	}
	console.log("field length: " + field.length);
	for(var i = 0; i < field.length; i++){
		for(var j = 0; j < field[i].length; j++){
			field[i][j] = 0; // 값 0은 방문하지 않은 경우, 1은 방문한 경우, 2는 backtracking 경우
		}
	}
	console.log("field: " + field);
}

function randomMazeGenerator(){

    /*
     * 길이 막혔을 때, 안 막혔을 때의 함수 호출
     */

    // while(stack.length > 0) {}

		
}


// tracking : 객체 탐지, 추적
function tracking(){
	
	/* 
     * 0부터 3까지의 정수를 랜덤으로 생성하는 key 변수 생성
     */
	
	switch(key){
	case 0: // left move
		xv =- 2; yv = 0;
		break;
	case 1: // up move
		xv = 0; yv =- 2;
		break;
	case 2: // right move
		xv = 2; yv = 0;
		break;
	case 3: // down move
		xv = 0; yv = 2;
		break;
	}
	
	px += xv;
	py += yv;
	if(px < 0 || px > tc-1 || py < 0 || py > tc-1){
		px -= xv;
		py -= yv;
		return;
	} 
	if(field[py][px] < 1){
		makeWay(px - xv / 2, py - yv /2);
		makeWay(px, py);
		tracker = {x: px, y: py};
		stack.push(tracker);
		blockCheck();	
	}else{
		px -= xv;
		py -= yv;
		return;
	}

}

function blockCheck(){
	var blockCount = 0;
	if(py+2 > tc-1 || field[py+2][px] != 0)
		blockCount++;
	if(py-2 < 0 || field[py-2][px] != 0)
		blockCount++;
	if(px+2 > tc-1 || field[py][px+2] != 0)
		blockCount++;
	if(px-2 < 0 || field[py][px-2] != 0)
		blockCount++;
	if(blockCount >= 4)
		stucked = true;
	else
		stucked = false;
}


// 백트래킹 : 해를 찾는 도중 해가 아니어서 막히면, 되돌아가서 다시 해를 찾아가는 기법
function backtracking(){
	var backtracker = stack.pop(); //stack 배열의 마지막 요소를 제거한 후, 제거한 요소를 반환
	px = backtracker.x;
	py = backtracker.y;
	blockCheck();	
}
