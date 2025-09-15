import { people, normalizePeoples } from "./JSONData.js";

const isValidEmail = function (email) {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegEx.test(email);
};

const verifyEmailAndPrintDetails = function (peoples) {
  const normalizedUsers = normalizePeoples(peoples);

  return normalizedUsers?.map((user) => {
    const userName = user["userName"];
    const userEmail = user["userEmail"];

    if (!isValidEmail(userEmail)) {
      return { [userName]: `<(INVALID EMAIL)>` };
    }
    return { [userName]: `<${userEmail}>` };
  });
};

const userDetails = verifyEmailAndPrintDetails(people);
console.log(userDetails);
