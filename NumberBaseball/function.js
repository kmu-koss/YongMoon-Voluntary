const ANSWER = [];

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

const randomNumber = (n, m) => {
    return parseInt(Math.random() * (m - n + 1)) + n;
};

const isAnswerDuplicate = (answer, ANSWER) => {
    return ANSWER.includes(answer);
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
    checkStrikeBall(ballList);
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

const isAllBallExist = (ballList) => {
    if (ballList.length == 4) {
        return true;
    } else {
        return false;
    }
};

const checkStrikeBall = (ballList) => {
    let strikeCount = checkStrike(ballList);
    let ballCount = checkBall(ballList, strikeCount);
    console.log("스트라이크: " + strikeCount + ", 볼: " + ballCount)
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
