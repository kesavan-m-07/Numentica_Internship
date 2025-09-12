
let num = 2;
let count = 4;

function findSum(num,count){
    let newNum = 0;
    for(let i=1;i<=count;i++){
        newNum += (num * i);
    }
    return newNum;
}

console.log(findSum(num,count));
