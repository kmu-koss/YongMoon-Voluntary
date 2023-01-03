let card = document.querySelector('.container .card');
card.addEventListener('click', submit);
const elem = document.querySelector("#counter")

function submit() {
    console.log(elem)
    if (elem.style.transform == "rotateY(180deg)") {
        elem.style.transform = "rotateY(0deg)";
    } else {
        elem.style.transform = "rotateY(180deg)";
    }
}

let scissor = document.querySelector('#가위', scissorSubmit);
let rock = document.querySelector('#바위', rockSubmit);
let paper = document.querySelector('#보', paperSubmit);

function scissorSubmit(event) {
    let elem = document.querySelector("#가위")
    console.log(elem)
    elem.style.width = "204px";
    elem.style.height = "306px";
}

function rockSubmit(event) {
    let elem = document.querySelector("#가위")
    console.log(elem)
    elem.style.width = "204px";
    elem.style.height = "306px";
}

function paperSubmit(event) {
    let elem = document.querySelector("#가위")
    console.log(elem)
    elem.style.width = "204px";
    elem.style.height = "306px";
}