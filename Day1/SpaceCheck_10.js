let word = "arun kumar";

function checkSpace(word) {
  for (let i = 0; i < word.length; i++) {
    let currentChar = word[i];
    if(currentChar === ' ') return true;
  }
  return false;
}

console.log(checkSpace(word));
