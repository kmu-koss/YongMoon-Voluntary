function sumAll(n) {
  return ((1 + n) * n) / 2;
}

function sumAll(n) {
    let ret = 0;
    for (let i = 1; i < n+1; i++){
        ret += i;
    }
    return ret;
  }
  
console.log(sumAll(10));