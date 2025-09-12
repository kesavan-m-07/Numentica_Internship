//Custom Slice Function
Object.defineProperty(String.prototype, "customSlice", {
  value: function (startIndex, endIndex) {
    const lengthOfWord = this.length;
    if (startIndex < 0) startIndex = lengthOfWord + startIndex;
    if (endIndex < 0) endIndex = lengthOfWord + endIndex;
    if (!endIndex) endIndex = lengthOfWord;
    if (startIndex >= lengthOfWord || endIndex > lengthOfWord) {
      console.error("Invalid Index");
      return;
    }
    let splicedWord = "";
    for (let i = startIndex; i < endIndex; i++) {
      splicedWord += this[i];
    }
    return splicedWord;
  },
});

//Custom trim function
Object.defineProperty(String.prototype, "customTrim", {
  value: function () {
    const lengthOfWord = this.length;
    let leftPointer = 0;
    let rightPointer = lengthOfWord - 1;
    let trimmedWord = "";
    while (this[leftPointer] === " ") leftPointer++;
    while (this[rightPointer] === " ") rightPointer--;
    for (let i = leftPointer; i <= rightPointer; i++) {
      trimmedWord += this[i];
    }
    return trimmedWord;
  },
});

//Custom upperCase
Object.defineProperty(String.prototype, "customUpperCase", {
  value: function () {
    let upperCaseWord = "";
    for (let i = 0; i < this.length; i++) {
      const currentLetter = this[i];
      if (currentLetter >= "a" && currentLetter <= "z") {
        upperCaseWord += String.fromCharCode(currentLetter.charCodeAt(0) - 32);
      } else upperCaseWord += currentLetter;
    }
    return upperCaseWord;
  },
});

//Custom LowerCase
Object.defineProperty(String.prototype, "customLowerCase", {
  value: function () {
    let lowerCaseWord = "";
    for (let i = 0; i < this.length; i++) {
      const currentLetter = this[i];
      if (currentLetter >= "A" && currentLetter <= "Z") {
        lowerCaseWord += String.fromCharCode(currentLetter.charCodeAt(0) + 32);
      } else lowerCaseWord += currentLetter;
    }
    return lowerCaseWord;
  },
});


//Custom ReplaceAll function
Object.defineProperty(String.prototype, "customReplaceAll", {
  value: function (wordToBeReplaced, wordToReplace) {
    let replacedWord = "";
    if (
      typeof wordToBeReplaced !== "string" ||
      typeof wordToReplace !== "string"
    ) {
      console.error("The inputs must be string..");
      return;
    }

    //Special Case
    if (wordToBeReplaced === "") {
      for (let i = 0; i < this.length; i++) {
        const currentLetter = this[i];
        replacedWord += (wordToReplace + currentLetter);
      }
      replacedWord += wordToReplace;
      return replacedWord;
    }

    const windowSize = wordToBeReplaced.length;
    let subString = "";
    for (let i = 0; i < this.length; i++) {
      const currentLetter = this[i];

      subString += currentLetter;

      if (subString.length > windowSize) {
        replacedWord += subString[0];
        subString = subString.substring(1);
      }

      if (subString === wordToBeReplaced) {
        replacedWord += wordToReplace;
        subString = "";
      }
    }
    if (subString.length > 0) replacedWord += subString;
    return replacedWord;
  },
});


//Custom Split
Object.defineProperty(String.prototype,'customSplit',{
    value : function(letterToSplit){
        const lengthOfWord = this.length;
        const splittedWords = [];
        if(typeof letterToSplit !== 'string'){
            console.error("invalid inputs..");
            return;
        }
        let subword = '';
        if(letterToSplit ===''){
            for(let i=0;i<lengthOfWord;i++){
                splittedWords.push(this[i]);
            }
            return splittedWords;
        }
        for(let i=0;i<lengthOfWord;i++){
            const currentLetter = this[i];
            if(currentLetter === letterToSplit){
                splittedWords.push(subword);
                subword = '';
            }
            else{
                subword += currentLetter
            }
        }
        if(subword.length > 0) splittedWords.push(subword)
        return splittedWords;
    }
})


//Slice test cases
// console.log("abced".customSlice(-4, -2));
// console.log("abced".customSlice(-4));
// console.log("abced".customSlice(0, -2));
// console.log("abced".customSlice(1, 6));

//Trim test cases
// console.log("     abahgdcha".customTrim());
// console.log("abahgdcha     ".customTrim());
// console.log("     abahg    dcha       ".customTrim());

//UpperCase and LowerCase test cases
// console.log("abcd%^&*".customUpperCase());
// console.log("ABCSDF%^&*".customLowerCase());


//ReplaceAll test cases
// const str = "helloworld hello";
// let a = str.customReplaceAll("", "hi");
// console.log(a);
// console.log(str.replaceAll("", "hi"));


//Split test cases
console.log('hello,this is human from earth, thank you'.customSplit(''));

