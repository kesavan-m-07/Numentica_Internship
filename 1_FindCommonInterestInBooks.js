/*
const students = [
  {
    id: 0,
    name: ‘Arun’,
    books: [‘Wings of Fire’, ‘Chakra’],
  },
  {
    id: 1,
    name: ‘Ashok’,
    books: [‘Chakra’, ‘War and Peace’, ‘The Shining’]
  },
  {
    id: 2,
    name: ‘Balu’,
    books: [‘Wings of Fire’, ‘All about Cricket’],
  },
  {
    id: 3,
    name: ‘Cathi’,
    books: [‘Against the wind’, ‘The Shining’, ‘War and Peace’]
  },
];
Find the common interest in books for the students
Output
Wings of Fire - [‘Arun’, ‘Balu’]
Chakra - [‘Arun’, ‘Ashok’]
War and Peace - [‘Ashok’, ‘Cathi’],
All about Cricket- [‘Balu’],
Against the wind- [‘Cathi’]
The Shining - [‘Cathi’, ‘Ashok’]
Find the user who shares most interest with other users.
For example: Ashok since he shares book interest with Arun, Cathi. And also Arun since he shares interest with Balu and Ashok
*/

const students = [
  {
    id: 0,
    name: "Arun",
    books: ['abc'],
  },
  {
    id: 1,
    name: "Arun",
    books: ["efd"],
  },
  {
    id: 2,
    name: "Balu",
    books: ['hig'],
  },
  {
    id: 3,
    name: "Cathi",
    books: ['lmno'],
  },
];


const findCommonInterestInBooks = function(students){
    
const bookInterestWithIds = {}; //To Build the data with books as key and array of ids as a value
const studentMapWithId = {}; //used to map the studentId with their name
const bookDetails = {}; //The Actual Map Contains the studentName with book Mapping
const studentWithIntrestWithOtherUsers = {}; //To store the each students share details with other users

students?.map((student) => {
  const studentBookDetails = student?.books;
  if (studentBookDetails && studentBookDetails.length > 0) {
    studentBookDetails?.map((bookName) => {
      if (typeof bookName !== "string") return; // Ignore undefined or null values
      const studentName = student?.name;
      const studentId = student?.id;
      if ((!studentId && studentId !== 0) || !studentName) return;
      studentMapWithId[studentId] = studentName;
      bookName = bookName.toLowerCase();
      if (!bookInterestWithIds[bookName]) bookInterestWithIds[bookName] = []; //Adds empty array with bookname as a key
      const bookInterest = bookInterestWithIds[bookName];
      bookInterest.push(studentId); //Pushes only student's ID
    });
  }
});

// console.log(bookInterestWithIds);
/*
{
  chakra: [ 1 ],
  'the shining': [ 1, 2 ],
  'wings of fire': [ 1 ],
  'all about cricket': [ 2, 3 ],
  'war and peace': [ 2, 3 ],
  'against the wind': [ 3 ]
}
*/

// console.log(studentMapWithId);
/*
{ '1': 'Ashok', '2': 'Balu', '3': 'Cathi' }
*/

for (let [bookName, ids] of Object.entries(bookInterestWithIds)) {
  ids.forEach((firstUserId) => {  //Outer Loop of IDS array
    ids.forEach((secondUserId) => { //Inner Loop to add the other shared users to firstUserID in the map
      if (!studentWithIntrestWithOtherUsers[firstUserId])    //Initialize empty set if there is not
        studentWithIntrestWithOtherUsers[firstUserId] = new Set([]);
      if (!studentWithIntrestWithOtherUsers[secondUserId])
        studentWithIntrestWithOtherUsers[secondUserId] = new Set([]);

      if (firstUserId !== secondUserId) { //To avoid adding key userId also in the set
        studentWithIntrestWithOtherUsers[firstUserId].add(secondUserId);
        studentWithIntrestWithOtherUsers[secondUserId].add(firstUserId);
      }
    });
  });

  ids?.forEach((studentId) => {   //Used to build the Book to name map by converting the ids
    const studentName = studentMapWithId[studentId];
    if (!bookDetails[bookName]) bookDetails[bookName] = [];
    const eachBookDetails = bookDetails[bookName];
    eachBookDetails.push(studentName);
  });
}

// console.log(studentWithIntrestWithOtherUsers);
/*
{ '1': Set(1) { 2 }, '2': Set(2) { 1, 3 }, '3': Set(1) { 2 } }
*/

// console.log(bookDetails);
/*
{
  chakra: [ 'Ashok' ],
  'the shining': [ 'Ashok', 'Balu' ],
  'wings of fire': [ 'Ashok' ],
  'all about cricket': [ 'Balu', 'Cathi' ],
  'war and peace': [ 'Balu', 'Cathi' ],
  'against the wind': [ 'Cathi' ]
}
*/

const usersWithMostShares = []; //To store the most shared users
let mostShareCount = -1;

for (let [key, value] of Object.entries(studentWithIntrestWithOtherUsers)) {
  const shareCount = value.size;
  const studentName = studentMapWithId[key];
  if (shareCount === mostShareCount) usersWithMostShares.push(studentMapWithId[key]);   
  else if (shareCount > mostShareCount) {
    usersWithMostShares.length = 0;
    usersWithMostShares.push(studentName);
    mostShareCount = shareCount;
  }
}

// console.log(usersWithMostShares);
/*
[ 'Balu' ]
*/

return {bookDetails,usersWithMostShares};
}

const {bookDetails,usersWithMostShares} = findCommonInterestInBooks(students);

console.log("Book Details : ",bookDetails);
console.log("Users With Most Shares: ",usersWithMostShares);


