const ANSWER = [];
const ANSWERS = [];
var tryCount = 0;

const Answer = () => {
    getRandomAnswerList();
    console.log(ANSWER);
};

const getRandomAnswerList = () => { 
    let answer;
    for (i = 1; i <= 4; i++) {
        answer = randomNumber(1, 9);
        while (isAnswerDuplicate(answer, ANSWER)) {
            answer = randomNumber(1, 9);
        }
        ANSWER.push(answer);
    }
};

const randomNumber = (n, m) => { // n부터 m까지의 랜덤한 숫자를 만드는 난수 발생 함수를 만드세요! return 타입은 INT입니다!



};

const isAnswerDuplicate = (answer, ANSWER) => { // answer라는 랜덤한 숫자가 ANSWER라는 정답 Array에 포함되어있는지 확인하는 함수를 만드세요! return 타입은 Boolean입니다.



};

//-------------------- main code --------------------
Answer();
function result() {
    var ballList = getBallList();
    if (isAllBallExist(ballList)) {
        checkAnswer(ballList);
    }
}
checkAnswer = (ballList) => {
    ball = checkStrikeBall(ballList);
    if (ball.strike == 4) {
        document.getElementById("modal").style.display = "flex";
    }
    let savingBallList = {
        balls: ballList,
        strike: ball.strike,
        ball: ball.ball,
    };

    if (!isBallInANSWERS(savingBallList)) {
        tryCount++;
        document.getElementById("try").innerText = tryCount;
        ANSWERS.push(savingBallList);
        addLog(savingBallList);
        console.log(ANSWERS);
    } else {
        alert("이미 한번 제출하신 볼입니다!");
    }
};
//-------------------- main code --------------------

const getBallList = () => {
    let ballList = [];
    for (i = 1; i <= 4; i++) {
        try {
            ballList.push(
                document
                    .getElementById("list" + i)
                    .childNodes.item(0)
                    .getAttribute("id")
            );
        } catch {
            alert("모든 공을 넣어주세요!");
            break;
        }
    }
    console.log("[getBallList] ", ballList);
    return ballList;
};

const isAllBallExist = (ballList) => { // 드래그를 통해 올린 Ball이 포함되어 있는 ballList라는 Array에서 공 4개가 존재하는 확인하는 함수를 만드세요! return 타입은 Boolean입니다.



};

const checkStrikeBall = (ballList) => {
    let strikeCount = checkStrike(ballList);
    let ballCount = checkBall(ballList, strikeCount);
    console.log("스트라이크: " + strikeCount + ", 볼: " + ballCount);
    return { strike: strikeCount, ball: ballCount };
};

const checkStrike = (ballList) => { // ballList의 제출된 ball들과 ANSWER라는 정답 Array를 비교하여 Strike의 갯수를 찾는 함수를 만드세요! return 타입은 INT 형태입니다.



};

const checkBall = (ballList, strikeCount) => { // ballList의 제출된 ball들과 ANSWER라는 정답 Array, 그리고 strikeCount라는 스트라이크 갯수를 참고하여 볼(야구용어)의 갯수를 찾는 함수를 만드세요! return 타입은 INT 형태입니다.


    
};

const isBallInANSWERS = (savingBallList) => {
    for (i = 0; i < ANSWERS.length; i++) {
        if (
            JSON.stringify(ANSWERS[i]).includes(JSON.stringify(savingBallList))
        ) {
            return true;
        }
    }
    return false;
};

const addLog = (savingBallList) => {
    let addHTML = `<div id="answer">`;
    for (i = 0; i < 4; i++) {
        addHTML += `<div class="answerzone">
        <img
            src="img/`+ savingBallList.balls[i] + `.png"
            id="image"
            width="70"
            height="70"
        />
        </div>`;
    }

    addHTML += `<div><span>스트라이크: ` + savingBallList.strike;
    addHTML +=
        `</span><span>, 볼: ` + savingBallList.ball + `</span></div></div>`;

    document.getElementById("answers").innerHTML = addHTML + document.getElementById("answers").innerHTML;
};