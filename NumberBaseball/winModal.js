const modal = document.getElementById("modal");

function modalOn() {
    modal.style.display = "flex";
}

function isModalOn() {
    return modal.style.display === "flex";
}

function modalOff() {
    modal.style.display = "none";
}

const closeBtn = modal.querySelector(".close-area");

closeBtn.addEventListener("click", (e) => {
    modalOff();
    location.reload();
});