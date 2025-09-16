import { people, normalizePeoples } from "./JSONData.js";

//To verify the valid email
const isValidEmail = function (email) {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Email validation regex
  return emailRegEx.test(email);
};

const verifyEmailAndPrintDetails = function (peoples) {
  const normalizedUsers = normalizePeoples(peoples);

  return normalizedUsers?.map((user) => {
    const userName = user["userName"];
    const userEmail = user["userEmail"];

    if (!isValidEmail(userEmail)) {
      return { [userName]: `<(INVALID EMAIL)>` }; //Invalid email
    }
    return { [userName]: `<${userEmail}>` };
  });
};

const userDetails = verifyEmailAndPrintDetails(people);
console.log(userDetails);
