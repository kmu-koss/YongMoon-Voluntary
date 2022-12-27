const randomAnswer = () => {
    const ANSWER = [];
    let answer;
    for (i = 1; i <= 4; i++) {
        answer = parseInt(Math.random() * 9) + 1;
        while (isAnswerDuplicate(answer, ANSWER)) {
            answer = parseInt(Math.random() * 9) + 1
        }
        ANSWER.push(answer);
    }
    console.log(ANSWER);
};

const isAnswerDuplicate = (answer, ANSWER) => {
    return ANSWER.includes(answer);
};

//-------------------- main code --------------------
randomAnswer();
function result() {
    var ballList = getBallList();
}
//-------------------- main code --------------------

const getBallList = () => {
    let ballList = [];
    for (i = 1; i <= 4; i++) {
        ballList.push(
            document
                .getElementById("list" + i)
                .childNodes.item(0)
                .getAttribute("id")
        );
    }
    console.log("[getBallList] ", ballList);
    return ballList;
};
