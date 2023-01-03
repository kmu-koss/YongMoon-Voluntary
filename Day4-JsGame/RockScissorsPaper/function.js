let card = document.querySelector(".container .card");
const elem = document.querySelector("#counter");
const img = document.querySelector("#answer");

const select = [undefined];
const scissorAnswer = -1;
const rockAnswer = 0;
const paperAnswer = 1;

function submit() {
    console.log(elem);
    if (elem.style.transform == "rotateY(180deg)") {
        elem.style.transform = "rotateY(0deg)";
    } else {
        elem.style.transform = "rotateY(180deg)";
    }
}

const scissor = document.querySelector("#가위");
scissor.addEventListener("click", scissorSubmit);
const rock = document.querySelector("#바위");
rock.addEventListener("click", rockSubmit);
const paper = document.querySelector("#보");
paper.addEventListener("click", paperSubmit);

const countdown = document.querySelector(".countdown");
countdown.addEventListener("click", countdownSubmit);

// function mouseover(event) {
//     console.log(event.target.parentNode)
//     event.target.parentNode.style.width = "204px";
//     event.target.parentNode.style.height = "306px";
// }

// function mouseout(event) {
//     event.target.parentNode.style.width = "170px";
//     event.target.parentNode.style.height = "255px";
// }

function scissorSubmit(event) {
    rock.style.width = "170px";
    rock.style.height = "255px";
    scissor.style.width = "204px";
    scissor.style.height = "306px";
    paper.style.width = "170px";
    paper.style.height = "255px";
    select[0] = scissorAnswer;
}

function rockSubmit(event) {
    rock.style.width = "204px";
    rock.style.height = "306px";
    scissor.style.width = "170px";
    scissor.style.height = "255px";
    paper.style.width = "170px";
    paper.style.height = "255px";
    select[0] = rockAnswer;
}

function paperSubmit(event) {
    rock.style.width = "170px";
    rock.style.height = "255px";
    scissor.style.width = "170px";
    scissor.style.height = "255px";
    paper.style.width = "204px";
    paper.style.height = "306px";
    select[0] = paperAnswer;
}

function countdownSubmit() {
    console.log(select);
    if (countdown.innerHTML == "Ready" && !(select[0] == undefined)) {
        countdown.innerHTML = "3";
        setTimeout(() => {
            countdown.innerHTML = "2";
        }, 1000);
        setTimeout(() => {
            countdown.innerHTML = "1";
        }, 2000);
        setTimeout(() => {
            countdown.innerHTML = "0";
        }, 3000);
        setTimeout(() => {
            submit();
            countdown.innerHTML = start();
        }, 4000);
        setTimeout(() => {
            submit();
            countdown.innerHTML = "Ready";
        }, 9000);
    } else {
        alert("가위바위보를 선택하세요!")
    }
}

const changeIMG = (answer) => {
    if (answer == -1) {
        img.src = "img/가위.png";
    } else if (answer == 0) {
        img.src = "img/주먹.png";
    } else {
        img.src = "img/보자기.png";
    }
};

const start = () => {
    let answer = randomNumber(-1, 1);
    changeIMG(answer);
    let submit = select[0];
    return judge(answer, submit);
};

const randomNumber = (n, m) => {
    return parseInt(Math.random() * (m - n + 1)) + n;
};

const judge = (answer, submit) => {
    if (submit == answer) {
        return "Draw";
    } else if (submit * answer == 0) {
        return "Lose";
    } else {
        return "Win";
    }
};
