let word = "  arun kumar       ";
let count = 3;
function charRepeating(str, count) {
  let newWord = str;
  for (let i = 0; i < count - 1; i++) {
    newWord += str;
  }
  return newWord;
}

console.log(charRepeatingLoop(word, count));
// console.log(removeLeadingAndTrailingSpace(word));

function charRepeatingLoop(str, count) {
    str = removeLeadingAndTrailingSpace(str);
  let newWord = "";
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < str.length; j++) {
      let current = str[j];
    //   if (current === " ") continue;

      newWord += current;
    }
  }
  return newWord;
}

function removeLeadingAndTrailingSpace(str) {
  let newStr = "";
  let start;
  let end;
  for (let i = 0; i < str.length; i++) {
    let current = str[i];
    if (current !== " ") {
      start = i;
      break;
    }
  }

  for(let i=str.length - 1;i>=0;i--){
    let current = str[i];
    if(current !== ' ') {
        end = i;
        break;
    }
  }

  for(let i=start;i<=end;i++){
    newStr += str[i];
  }
  return newStr;
}
