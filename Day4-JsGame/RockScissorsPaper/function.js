const img = document.querySelector("#answer");

const select = [undefined]; // select라는 배열에는 [undefined] or [-1] or [0] or [1]만 들어가게 된다. 
const scissorAnswer = -1; // -1은 가위를 의미
const rockAnswer = 0; // 0은 바위를 의미
const paperAnswer = 1; // 1은 보자기를 의미

const rotate = () => { // 상대방의 카드를 뒤집는다.
    let elem = document.querySelector("#counter");
    if (elem.style.transform == "rotateY(180deg)") {
        elem.style.transform = "rotateY(0deg)";
    } else {
        elem.style.transform = "rotateY(180deg)";
    }
}

const scissor = document.querySelector("#가위");
const rock = document.querySelector("#바위");
const paper = document.querySelector("#보");
const countdown = document.querySelector(".countdown");

const scissorSelect = () => {
    rock.style.width = "170px";
    rock.style.height = "255px";
    scissor.style.width = "204px";
    scissor.style.height = "306px";
    paper.style.width = "170px";
    paper.style.height = "255px";
    select[0] = scissorAnswer; // 0번째 인덱스에 scissorAnswer, 즉 -1을 대입 -> select = [-1]
}

const rockSelect = ()  =>{
    rock.style.width = "204px";
    rock.style.height = "306px";
    scissor.style.width = "170px";
    scissor.style.height = "255px";
    paper.style.width = "170px";
    paper.style.height = "255px";
    select[0] = rockAnswer; // 0번째 인덱스에 rockAnswer, 즉 0을 대입 -> select = [0]
}

const paperSelect = () => {
    rock.style.width = "170px";
    rock.style.height = "255px";
    scissor.style.width = "170px";
    scissor.style.height = "255px";
    paper.style.width = "204px";
    paper.style.height = "306px";
    select[0] = paperAnswer; // 0번째 인덱스에 paperAnswer, 즉 1을 대입 -> select = [1]
}

const countdownSubmit = () => {
    if (countdown.innerHTML == "Ready" && !(select[0] == undefined)) { // 만약 텍스트가 Ready로 되어있으며, select 배열이 [undenified]가 아니라면 실행
        countdown.innerHTML = "3";
        setTimeout(() => { // 1초 후 Ready 위치에 있는 text를 2로 변경
            countdown.innerHTML = "2";
        }, 1000);
        setTimeout(() => { // 2초 후 Ready 위치에 있는 text를 1로 변경
            countdown.innerHTML = "1";
        }, 2000);
        setTimeout(() => { // 3초 후 Ready 위치에 있는 text를 0으로 변경
            countdown.innerHTML = "0";
        }, 3000);
        setTimeout(() => { // 4초 후 Ready 위치에 있는 text를 Win, Draw, Lose 중 하나로 변경
            rotate(); // 상대편의 카드를 뒤집는 함수 실행
            countdown.innerHTML = start();
        }, 4000);
        setTimeout(() => { // 9초 후 원상복귀
            rotate(); // 상대편의 카드를 뒤집는 함수 실행(원상복귀)
            countdown.innerHTML = "Ready"; // 다시 Ready로 변경
        }, 9000);
    } else if(select[0] == undefined) { // 가위바위보가 선택되지 않으면 select 배열은 초기 설정대로 [undefined]일 것, 따라서 가위바위보를 선택하지 않은 것이므로 알림을 띄워주며, 가위바위보 승패 판단을 하지 않는다.
        alert("가위바위보를 선택하세요!")
    }
}

scissor.addEventListener("click", scissorSelect); // 가위 카드 클릭시 scissorSelect 함수 실행하는 이벤트 등록
rock.addEventListener("click", rockSelect); // 바위 카드 클릭시 scissorSelect 함수 실행하는 이벤트 등록
paper.addEventListener("click", paperSelect); // 보자기 카드 클릭시 scissorSelect 함수 실행하는 이벤트 등록
countdown.addEventListener("click", countdownSubmit); // Ready text 클릭시 countdownSubmit 함수 실행하는 이벤트 등록 

const numToDetail = (num) => { // -1, 0, 1을 가위, 바위, 보자기로 변환해주는 함수
    return num == -1 ? "가위"
         : num == 0 ? "바위"
         : num == 1 ? "보자기"
         : "error : " + num;
}

const start = () => { // 메인함수로, 상대방의 패를 결정하고,
    let answer = randomNumber(-1, 1);
    changeIMG(answer);
    console.log("상대방 :", numToDetail(answer))
    let submit = select[0];
    console.log("사용자 :", numToDetail(submit))
    return judge(answer, submit);
};

const changeIMG = (answer) => { // randomNumber로부터 정해진 answer, 즉 상대편의 패에 따라 이미지를 변경한다. // -1 -> 가위, 0 -> 바위, 1 -> 보자기
    if (answer == -1) {
        img.src = "img/가위.png";
    } else if (answer == 0) {
        img.src = "img/주먹.png";
    } else {
        img.src = "img/보자기.png";
    }
};

const randomNumber = (n, m) => { // n부터 m까지의 랜덤한 숫자를 만드는 난수 발생 함수를 만드세요! return 타입은 INT입니다!
    return parseInt(Math.random() * (m - n + 1)) + n;
};

const judge = (answer, submit) => { // 결과를 "Draw", "Lose", "Win" 형태로 도출하여 String의 형태로 return하세요!
    if (submit == answer) {
        return "Draw";
    } else if (submit * answer == 0) {
        if (submit < answer){
            return "Lose";
        } else {
            return "Win"
        }
    } else {
        if (answer < submit){
            return "Lose";
        } else {
            return "Win"
        }
    }
};