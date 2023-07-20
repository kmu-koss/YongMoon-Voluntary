const input = document.querySelector(".inputN");
const submitBtn = document.querySelector(".submitBtn");

// 배열을 선언했어요.
const arr = [];

// 10번 반복해요.
for (let i = 0; i < 10; i++) {
  // 0~100 사이 무작위 정수를 arr 배열에 추가해요.
  arr.push(Math.floor(Math.random() * 100));
}
document.querySelector("#arr").innerText = arr;

function inspect(arr, n) {
  // 초기 결과값이에요. n이 arr에 없으면 이 값이 그대로 출력될거에요.
  let index = -1;

  // 함수를 구현해주세요!

  return index;
}

// submit 버튼을 누르면 실행될 함수에요.
function submit() {
  // 입력창에 있는 값을 n에 저장해요.
  let n = parseInt(input.value);
  // 결과값을 출력해요.
  document.querySelector("#result").innerHTML = "결과: " + inspect(arr, n);
}
// submitBtn을 클릭하면 submit() 함수가 실행됩니다.
submitBtn.addEventListener("click", submit);
