const arr = ["a", "d", 1, true, "cd", 33];
let word = "string";

function filterOut(arr, word) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let each = arr[i];
    if (typeof each !== word) {
        newArr.push(each);
    }
  }
  return newArr;
}

console.log(filterOut(arr, word));
