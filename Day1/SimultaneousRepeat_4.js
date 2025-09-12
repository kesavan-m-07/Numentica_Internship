let word = "traaainnnngfornewbie      ";

function charRepeating(word) {
  if (word.length === 0) return null;
  let maxCount = Number.MIN_SAFE_INTEGER;
  let maxLetter = "";
  let currentLetter = "";
  let currentCount = 0;
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if(letter === ' ')continue;
    if (currentLetter !== letter) {
      if (currentCount > maxCount) {
        maxCount = currentCount;
        maxLetter = currentLetter;
      }
      currentLetter = letter;
      currentCount = 1;
    }
    currentCount++;
    console.log("Current Letter: ",currentLetter);
    console.log("Current count: ",currentCount);
    
  }
  if(currentCount > maxCount) maxLetter = currentLetter;
  return maxLetter;
}

console.log(charRepeating(word));
