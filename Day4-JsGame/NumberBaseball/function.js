const ANSWER = []; // 정답 
const ANSWERSHEET = [];
var tryCount = 0;

const makeAnswer = () => {
    getRandomAnswerList();
    console.log(ANSWER);
};

const getRandomAnswerList = () => { // 정답을 만드는 함수로 [6, 3, 1, 9]과 같은 형식으로 정답을 만들게 된다. 
    let answer;
    for (i = 1; i <= 4; i++) {
        answer = randomNumber(1, 9);
        while (isAnswerDuplicate(answer, ANSWER)) {// 중복을 검사하여 만약에 중복이면 다시 랜덤을 돌려서 중복이 아닌 수가 나올때까지 반복한다.
            answer = randomNumber(1, 9);
        }
        ANSWER.push(answer); // 중복이 아닌 난수를 ANSWER 배열에 추가한다.
    }
};

const randomNumber = (n, m) => {
    return parseInt(Math.random() * (m - n + 1)) + n;
};

const isAnswerDuplicate = (answer, ANSWER) => {
    return ANSWER.includes(answer);
};

//-------------------- main code --------------------
makeAnswer(); // 정답을 만드는 함수 불러오기

function result() { // 답안 제출할 때마다 실행되는 main 함수
    var ballList = getBallList();
    if (isAllBallExist(ballList)) {
        checkAnswer(ballList);
    }
}

const checkAnswer = (ballList) => { // 정답 확인하는 함수
    ball = checkStrikeBall(ballList); // strike와 ball의 갯수를 확인하는 함수로 {strike: 3, ball: 1}와 같은 형식을 리턴한다.

    if (ball.strike == 4) { // strike가 되면, 모달 창을 띄운다
        document.getElementById("modal").style.display = "flex";
    }

    let savingBallList = {
        balls: ballList,
        strike: ball.strike,
        ball: ball.ball,
    };

    if (!isBallInANSWERSHEET(savingBallList)) { // 답안지에 있던 공들의 조합인지 확인하여 없던 조합이면 실행
        tryCount++; // 시도 횟수에 1회 추가
        document.getElementById("try").innerText = tryCount; // 모달 창에 시도횟수 갯수 추가
        ANSWERSHEET.push(savingBallList); // 답안지에 추가
        addLog(savingBallList); // 로그에 추가
        console.log(ANSWERSHEET);
    } else {
        alert("이미 한번 제출하신 볼입니다!");
    }
};
//-------------------- main code --------------------

const getBallList = () => { // 어떤 공들이 제출되었나 확인하는 함수
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

const isAllBallExist = (ballList) => {
    if (ballList.length == 4) {
        return true;
    } else {
        return false;
    }
};

const checkStrikeBall = (ballList) => { // 제출된 볼들에서 Strike와 Ball의 갯수를 Object타입으로 리턴하는 함수
    let strikeCount = checkStrike(ballList);
    let ballCount = checkBall(ballList, strikeCount);
    console.log("스트라이크: " + strikeCount + ", 볼: " + ballCount);
    return { strike: strikeCount, ball: ballCount };
};

const checkStrike = (ballList) => {
    let strikeCount = 0;
    for (i = 0; i < 4; i++) {
        if (ANSWER[i] == ballList[i]) {
            strikeCount++;
        }
    }
    return strikeCount;
};

const checkBall = (ballList, strikeCount) => {
    let setBallList = new Set(ballList);
    let ballCount = 0;
    for (i = 0; i < 4; i++) {
        if (setBallList.has(String(ANSWER[i]))) {
            ballCount++;
        }
    }
    return ballCount - strikeCount;
};

const isBallInANSWERSHEET = (savingBallList) => { // 공들이 이전에 있었던 조합으로 제출되었나 확인하는 함수
    for (i = 0; i < ANSWERSHEET.length; i++) {
        if (
            JSON.stringify(ANSWERSHEET[i]).includes(JSON.stringify(savingBallList))
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
