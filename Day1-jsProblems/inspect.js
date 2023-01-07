function inspect(arr, n){
    ret = -1;
    for (let i = 0; i < arr.length; i++){
        if (arr[i] === n){
            ret = i;
            break;
        }
    }
    return ret;
}

console.log(inspect([1,2,3,4,5,6], 6));