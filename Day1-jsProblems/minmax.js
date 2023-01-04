function minmax(arr) {
  let max = -Infinity;
  let min = Infinity;

  for (let num in arr) {
    if (num < min) {
      min = num;
    }
    if (max < num) {
      max = num;
    }
  }

  return [min, max];
}

console.log(minmax([1, 2, 3, 4, 5, 6, 7, 8, 9]));
