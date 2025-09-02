let arr = [38, 3, 2, 8, 31];

function findEvenSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if ((element & 1) !== 1) {
      sum += element;
    }
  }
  return sum;
}

console.log(findEvenSum(arr));
