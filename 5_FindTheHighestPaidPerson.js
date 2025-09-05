/*
5. Return the highest-paid person per department.
const employees = [
  { name: "Raj", dept: "IT", salary: 600 },
  { name: "Arun", dept: "IT", salary: 750 },
  { name: "Deepak", dept: "HR", salary: 500 }
];
highestSalary(employees);
// Output: { IT: {name:"Jane", salary:750}, HR: {name: "Deepak", salary: 500} }
*/

const employeesInformation = [
  { null: "Raj", dept: "IT", salarY: 600 },
  { name: "Arun", Dept: "IT", Salary: 750 },
  { name: "Arun", dept: "IT", Salary: 1000 },
  { name: "Deepak", dept: "HR", saLary: 500 },
  { name: "Kabi", dept: "hR", salary: 600 },
];

const isPlainObject = function (userInput) {
  if (typeof userInput !== "object" || userInput === null) {
    console.error("Given Input is not a plain object...");
    return false;
  }

  //Check if the input protype is extended from Object prototype
  const objectPrototype = {};

  if (
    Object.getPrototypeOf(userInput) !== Object.getPrototypeOf(objectPrototype)
  ) {
    console.error("Given Input is not a plain object..");
    return false;
  }
  return true;
};

const findHighestPaidPersonPerDepartment = function (employeesInformation) {
  //Check if the input is an array
  if (!Array.isArray(employeesInformation)) {
    console.error("Invalid Input Given..");
    return;
  }

  //Check if it is empty array
  if (employeesInformation.length === 0) {
    return {};
  }

  const mapToHoldHighestEarningPersons = {};

  //Loop through input and parse the user object
  for (let i = 0; i < employeesInformation.length; i++) {
    const currentElement = employeesInformation[i];
    if (!isPlainObject(currentElement)) continue;
    let salary = 0;
    let department;
    let exitstingPersonSalary;

    //Parse each object
    for (let keyInObject in currentElement) {
      lowerCaseKey =
        keyInObject !== null && keyInObject !== undefined
          ? keyInObject.toLowerCase()
          : null;
      if (lowerCaseKey !== null && lowerCaseKey === "dept") {
        department = currentElement[keyInObject];
      }
      if (lowerCaseKey !== null && lowerCaseKey === "salary") {
        salary = currentElement[keyInObject];
      }
    }

    //Check if the department is undefined
    department =
      typeof department === "string" ? department.toUpperCase() : undefined;
    if (
      department !== undefined &&
      !mapToHoldHighestEarningPersons[department]
    ) {
      mapToHoldHighestEarningPersons[department] = currentElement;
    } else {
      const exitstingPerson = mapToHoldHighestEarningPersons[department];

      //Loop through existing object to find out the salary
      for (let keyOfExistingUser in exitstingPerson) {
        if (keyOfExistingUser.toLowerCase() === "salary") {
          exitstingPersonSalary = exitstingPerson[keyOfExistingUser];
        }
      }
    }

    //Check if salary is there in existing user object
    if (typeof exitstingPersonSalary !== undefined) {
      if (exitstingPersonSalary <= salary) {
        mapToHoldHighestEarningPersons[department] = currentElement; //Overwrite salary if current salary is greater than the current one
      }
    }
  }

  return mapToHoldHighestEarningPersons;
};

const highestPaidPersons =
  findHighestPaidPersonPerDepartment(employeesInformation);
if (typeof highestPaidPersons === "object") {
  console.log(highestPaidPersons);
}
