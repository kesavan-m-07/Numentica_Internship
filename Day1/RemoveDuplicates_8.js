let arr = ['a','a','a'];

function remove(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    if(!isExist(newArr,current)) newArr.push(current);
  }
  return newArr;
}

function isExist(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    if (current === element) return true;
  }
  return false;
}

console.log(remove(arr));
