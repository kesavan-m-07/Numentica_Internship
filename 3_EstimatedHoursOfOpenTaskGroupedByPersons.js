/*
3. Show total estimated hours of open (not done) tasks grouped by person.
[
  { person: "Arun", hrs: 5 },
  { person: "Uma", hrs: 35 },
  { person: "Aadhir", hrs: 15 },
  { person: "Aarik", hrs: 4 },
  { person: "Unassigned", hrs: 3 }
]
*/

import {
  people,
  normalizeTodos,
  normalizePeoples,
  todos,
  mapIdWithUserDetails,
} from "./JSONData.js"; //import the required from JsonData.js

//To accumulate the total opening hours
export const showTotalEstimatedHoursOfOpenTasks = function (people, todos) {

  const normalizedTodos = normalizeTodos(todos); //Imported function from jsonData
  const normalizedPeoples = normalizePeoples(people);
  const idToUserMap = mapIdWithUserDetails(normalizedPeoples);

  return normalizedTodos.reduce((accumulatedUserWorkingMap, todoDetails) => {
    const assigneeId = todoDetails.assignedId ?? "unassigned"; //If name is null it should be 'unassigened'
    const userName = idToUserMap[assigneeId]?.userName ?? "unassigned";
    const status = todoDetails["todoStatus"];
    if (status === "done") return accumulatedUserWorkingMap; //Skip the todo with 'done status'
    if (!accumulatedUserWorkingMap[assigneeId]) {
      accumulatedUserWorkingMap[assigneeId] = { userName, totalHours: 0 };
    }
    accumulatedUserWorkingMap[assigneeId].totalHours +=
      todoDetails["estimatedHours"];

    return accumulatedUserWorkingMap;
  }, {});
};

//To get the details from 'accumulated working map'
const mapUserWithId = function (accumulatedUserWorkingMap) {
  return Object.entries(accumulatedUserWorkingMap).reduce(
    (userToHoursMap, [userId, user]) => {
      userToHoursMap.push({
        person: user["userName"],
        hrs: user["totalHours"],
      });
      return userToHoursMap;
    },
    []
  );
};

const groupOfEstimatedHours = showTotalEstimatedHoursOfOpenTasks(people, todos);
// console.log(mapUserWithId(groupOfEstimatedHours));
