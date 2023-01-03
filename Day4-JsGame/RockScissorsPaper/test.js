let card = document.querySelector('.pricing:checked ~ .card-3d-wrap .card-3d-wrapper');
card.addEventListener('click', click);


function click(event) {
    let elem = event.currentTarget;
    if (elem.style.transform == "rotateY(180deg)") {
        elem.style.transform = "rotateY(0deg)";
    } else {
        elem.style.transform = "rotateY(180deg)";
    }
}