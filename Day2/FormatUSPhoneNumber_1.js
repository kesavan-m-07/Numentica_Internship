/*
formatUSPhone
---------------------
Convert a ten digit number into US phone formatting "(AAA) BBB-CCCC"
For example: 9840164723 to "(984)016-4723"
Throw error if it's not a valid phone number
*/

const phoneNumber = 91992999;

const formatUsPhoneNumber = function (phoneNumber) {
  //Check if the input is given
  if (!phoneNumber) {
    console.error("No input is given..");
    return;
  }

  //Check if the input is a number
  if (typeof phoneNumber !== "number") {
    console.error("Given input is not a number...");
    return;
  }

  //Casting the number into string type
  const castedPhoneNumber = phoneNumber.toString();

  //Check if the phoneNumber given is exactly 10 digits
  if (castedPhoneNumber.length !== 10) {
    console.error("Given input should be exactly 10 digits..");
    return;
  }

  let usFormattedNumber = "";

  //Slice the first 3 digits
  usFormattedNumber += "(" + slicePhoneNumber(castedPhoneNumber, 0, 2) + ")";

  //Slice the mid 3 digits
  usFormattedNumber += slicePhoneNumber(castedPhoneNumber, 3, 5);

  //Slice the last 4 digits
  usFormattedNumber += "-" + slicePhoneNumber(castedPhoneNumber, 6, 9);

  return usFormattedNumber;
};

//To Slice the given phoneNumber according to given indices
const slicePhoneNumber = function (phoneNumberToSlice, startIndex, endIndex) {
  let slicedPhoneNumber = "";
  for (let i = startIndex; i <= endIndex; i++) {
    slicedPhoneNumber += phoneNumberToSlice[i];
  }
  return slicedPhoneNumber;
};


const usFormattedNumber = formatUsPhoneNumber(phoneNumber);

//Check if the returned phoneNumber is not undefined
if(usFormattedNumber){
    console.log("US Formatted Number: ",usFormattedNumber);
}
