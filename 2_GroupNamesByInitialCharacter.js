/*
2. Group names according to the initial character
Input: ["arun", "balu", "cathy", "krish", "aadhir", "aariketh", "kamal"]
Output
["arun", "aadhir", "aariketh"]
["balu"]
["cathy"]
["krish", "kamal"]
*/

const users = ["Arun", "    balu", "cathy", "    ", "aadhir", "aariketh", "Kamal",null,undefined];

const groupNameByInitialLetter = function (users) {
  const nameMapByInitialCharacter = {}; //Map to store the first letter as key and names array as a values

  users?.forEach((user) => {
    if(!user)return;
    const trimmedName = user.trim();  //To avoid leading and trailing space
    if(trimmedName.length===0)return;
    const firstLetter = trimmedName[0].toLowerCase();
    if(!nameMapByInitialCharacter[firstLetter]) nameMapByInitialCharacter[firstLetter] = [];
    const userList = nameMapByInitialCharacter[firstLetter];
    userList.push(trimmedName);
  });
  
  return Object.values(nameMapByInitialCharacter);
};

const groupedNames = groupNameByInitialLetter(users);
console.log(groupedNames);
