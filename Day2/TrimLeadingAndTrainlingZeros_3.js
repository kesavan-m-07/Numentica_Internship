/*
Trim Zeros
--------------
Remove leading/trailing zeros from a numeric string without losing internal zeros; preserve sign and decimal.
trimZeros(input, which='both') -> string
which: 'leading' | 'trailing' | 'both'
*/

const numberWithZeros ='00000332220.0';
const option = "trailing";

const removeLeadingAndTrailingZeros = function (numberWithZeros, option) {
  //Check if the input is given
  if (!numberWithZeros || !option) {
    console.error("No input is given..");
    return;
  }

  //check if the given input is not empty
  if (numberWithZeros.length === 0) {
    console.error("Empty input is given, can't proceed further..");
    return;
  }

  //check if the given input is string
  if (typeof numberWithZeros !== "string" || typeof option !== "string") {
    console.error("Given input is not a string..");
    return;
  }

  //Check if it is a numeric number
  const castedNumber = Number(numberWithZeros);
  
  
  if (isNaN(castedNumber)) {
    console.error("It is not an numeric string..");
    return;
  }

  //Check if the option is valid
  if (option !== "leading" && option !== "trailing" && option !== "both") {
    console.error("invalid option provided...");
    return;
  }

  //Remove Leading and Trailing spaces
  const numberWithoutSpaces = removeLeadingAndTrailingSpace(numberWithZeros);

  //Preserve sign in the input
  let sign;
  const firstLetter = numberWithoutSpaces[0];
    if(firstLetter === '+' || firstLetter === '-'){
        sign = firstLetter;
    }
    let numberWithoutSign = numberWithoutSpaces;
    if(sign){
        numberWithoutSign = numberWithoutSign.substring(1);
    }

  //Option is leading
  if (option === "leading") {
    let numberWithoutLeadingZeros =  removeLeadingZeros(numberWithoutSign);
    if(sign){
        numberWithoutLeadingZeros = sign + numberWithoutLeadingZeros;
    }
    return numberWithoutLeadingZeros;
  } 
  //Option is trailing
  else if (option === "trailing") {
    let numberWithoutTrailingZeros =  removeTrailingZeros(numberWithoutSign);
    if(sign){
        numberWithoutTrailingZeros = sign + numberWithoutTrailingZeros;
    }
    return numberWithoutTrailingZeros;
  } 
  //Option is both
  else {
    const numberWithoutLeadingZeros = removeLeadingZeros(numberWithoutSign);
    let numberWithoutZeros =  removeTrailingZeros(numberWithoutLeadingZeros);
    if(sign){
        numberWithoutZeros = sign + numberWithoutZeros;
    }
    return numberWithoutZeros;
  }
};


//Function to remove leading zeros only
const removeLeadingZeros = function (numberWithZeros) {
  let numberWithoutLeadingZeros = "";
  let startIndex;
  for (let i = 0; i < numberWithZeros.length; i++) {
    let currentLetter = numberWithZeros[i];
    if (currentLetter !== "0" && currentLetter !==' ') {
      startIndex = i;
      break;
    }
  }

  for (let i = startIndex; i < numberWithZeros.length; i++) {
    numberWithoutLeadingZeros += numberWithZeros[i];
  }

  return numberWithoutLeadingZeros;
};


//Function to remove Trailing Zeros only
const removeTrailingZeros = function (numberWithZeros) {
  let numberWithoutTrailingZeros = "";
  let endIndex;
  for (let i = numberWithZeros.length - 1; i >= 0; i--) {
    let currentLetter = numberWithZeros[i];
    if (currentLetter !== "0" && currentLetter !== ' ') {
      endIndex = i;
      break;
    }
  }

  for (let i = 0; i <= endIndex; i++) {
    numberWithoutTrailingZeros += numberWithZeros[i];
  }

  return numberWithoutTrailingZeros;
};


//Remove leading and Trailing Spaces
const removeLeadingAndTrailingSpace = function (numberWithSpaces) {
  let numberWithoutSpaces = "";
  let startIndex;
  let endIndex;

  //Find the first non space character
  for (let i = 0; i < numberWithSpaces.length; i++) {
    const currentLetter = numberWithSpaces[i];
    if (currentLetter !== " ") {
      startIndex = i;
      break;
    }
  }


  //Find the last non space letter
  for (let i = numberWithSpaces.length - 1; i >= 0; i--) {
    const currentLetter = numberWithSpaces[i];
    if (currentLetter !== " ") {
      endIndex = i;
      break;
    }
  }


  //Check if the given input not having any characters;
  if (typeof startIndex === undefined) {
    console.error("Given input doesn't have any letters..");
    return "";
  }


  //Slice the number without spaces
  for (let i = startIndex; i <= endIndex; i++) {
    numberWithoutSpaces += numberWithSpaces[i];
  }

  return numberWithoutSpaces;
};


const numberWithoutLeadingAndTrainlingZeros =
  removeLeadingAndTrailingZeros(numberWithZeros,option);
if (numberWithoutLeadingAndTrainlingZeros) {
  console.log(
    "Given Number without zero leading or trailing: ",
    numberWithoutLeadingAndTrainlingZeros
  );
}
