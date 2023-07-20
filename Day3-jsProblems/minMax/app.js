const input = document.querySelector(".inputN");
const submitBtn = document.querySelector(".submitBtn");

function minmax(arr) {
  let max = -Infinity;
  let min = Infinity;

  // 함수를 구현하세요!

  return [min, max];
}

function submit() {
  let arr = input.value.split(" ").map((n) => Number(n));
  // 콘솔창에서 함수의 실행결과를 확인할 수 있어요.
  console.log(minmax(arr));

  let min = minmax(arr)[0];
  let max = minmax(arr)[1];

  // 결과값을 출력해요.
  document.querySelector("#min").innerText = "최소값: " + min;
  document.querySelector("#max").innerText = "최대값: " + max;
}
// submitBtn을 클릭하면 submit() 함수가 실행됩니다.
submitBtn.addEventListener("click", submit);
