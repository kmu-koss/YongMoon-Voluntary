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

const randomNumber = (n, m) => { // n부터 m까지의 랜덤한 숫자를 만드는 난수 발생 함수를 만드세요! return 타입은 INT입니다!
    /* 
     * n에는 시작 값이 들어오고, m에는 끝 값이 들어오게 되며
     * n~m까지의 난수를 발생시키는 random 함수를 만드세요!
     * return 타입은 정수 타입인 INT입니다!
     */
};

const isAnswerDuplicate = (answer, ANSWER) => { // answer라는 랜덤한 숫자가 ANSWER라는 정답 Array에 포함되어있는지 확인하는 함수를 만드세요! return 타입은 Boolean입니다.
	/* 
     * answer에는 난수로 발생된 1~9사이의 랜덤한 숫자가, ANSWER는 지금까지 만들어진 답안 [9, 3, 2] or [] or [1, 6]과 같은 형식이 들어오게 된다.
     * ANSWER에 answer가 포함되어있는지 확인하는 함수를 만드세요!
     * return 타입은 true나 false의 형태인 Boolean타입으로 리턴해야합니다! 
     */
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

const isAllBallExist = (ballList) => { // 드래그를 통해 올린 Ball이 포함되어 있는 ballList라는 Array에서 공 4개가 존재하는 확인하는 함수를 만드세요! return 타입은 Boolean입니다.
    /* 
     * ballList는 [9, 3, 2, 1]과 같이 제출된 공들의 배열로 전달되게 됩니다.
     * 모든 공들, 즉 4개의 공이 ballList에 들어가있는지 확인하는 함수를 만드세요!
     * return 타입은 true나 false의 형태인 Boolean타입으로 리턴해야합니다! 
     */
};

const checkStrikeBall = (ballList) => { // 제출된 볼들에서 Strike와 Ball의 갯수를 Object타입으로 리턴하는 함수
    let strikeCount = checkStrike(ballList);
    let ballCount = checkBall(ballList, strikeCount);
    console.log("스트라이크: " + strikeCount + ", 볼: " + ballCount);
    return { strike: strikeCount, ball: ballCount };
};

const checkStrike = (ballList) => { // ballList의 제출된 ball들과 ANSWER라는 정답 Array를 비교하여 Strike의 갯수를 찾는 함수를 만드세요! return 타입은 INT 형태입니다.
    /* 
     * ballList는 [9, 3, 2, 1]과 같이 제출된 공들의 배열로 전달되게 됩니다.
     * 우리에게 주어진 ANSWER라는 배열과 ballList를 비교하여 위치와 숫자까지 모두 같으면 스트라이크라고 취급합니다. [1, 5, 2, 7]과 [6, 5, 7, 2]라면 1스트라이크, [1, 5, 2, 7]과 [1, 5, 7, 2]라면 2스트라이크입니다.
     * 이렇게 몇 스트라이크인지 구하는 함수를 만드세요!
     * return 타입은 정수형인 INT 타입입니다! 스트라이크가 몇개인지 리턴하세요! 
     */
};

const checkBall = (ballList, strikeCount) => { // ballList의 제출된 ball들과 ANSWER라는 정답 Array, 그리고 strikeCount라는 스트라이크 갯수를 참고하여 볼(야구용어)의 갯수를 찾는 함수를 만드세요! return 타입은 INT 형태입니다.
    /* 
     * ballList는 [9, 3, 2, 1]과 같이 제출된 공들의 배열로 전달되게 되며 strikeCount는 strike의 갯수를 INT타입으로 전달하게 됩니다.
     * 우리에게 주어진 ANSWER라는 배열과 ballList를 비교하여 스트라이크를 제외하고 같은 숫자의 갯수를 볼으로 취급합니다. [1, 5, 2, 7]과 [6, 5, 7, 2]라면 1스트라이크 2볼, [1, 5, 2, 7]과 [1, 5, 7, 2]라면 2스트라이크 2볼입니다.
     * 이렇게 몇 볼인지 구하는 함수를 만드세요!
     * return 타입은 정수형인 INT 타입입니다! 스트라이크가 몇개인지 리턴하세요! 
     */
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
