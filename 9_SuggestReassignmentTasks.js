/*
9. Suggest reassignment for tasks assigned to zero-capacity people. toPersonSuggested can be to multiple person / single person.
For example, Aarik is overloaded by 4 hours and Arun has less than 36 hours of task, that means Arun can take up this task
[
  { todoId: "t8", fromPerson: "Aarik", toPersonSuggested: "Arun" }
]
*/

import {
  people,
  normalizePeoples,
  todos,
  normalizeTodos,
  mapIdWithUserDetails,
} from "./JSONData.js";
import { showTotalEstimatedHoursOfOpenTasks } from "./3_EstimatedHoursOfOpenTaskGroupedByPersons.js";


//To find the people with zero capacity
const findZeroCapacityPeople = function (peoples) {
  return peoples.filter((people) => people["userCapacityHoursPerDay"] <= 0);
};

//To get the reassignment details using sorted opening hours of each user
const getReassignmentDetails = function (taskAssignedToZeroCapacityPeople,sortedRemainingHours,idToUserMap) {
  return taskAssignedToZeroCapacityPeople.reduce(
    (reassignmentDetails, todo) => {
      const estimatedHours = todo["estimatedHours"];
      const assignedId = todo["assignedId"];
      const oldUserName = idToUserMap[assignedId].userName;
      let remainingHours = estimatedHours;
      const assignedUsers = [];
      for (let eachElement of sortedRemainingHours) {
        const [newAssigningId, freeHours] = eachElement;
        if (remainingHours <= 0) break; //Already reassigned task
        if (freeHours <= 0) continue; //user has no free hours

        const newUserName = idToUserMap[newAssigningId].userName;
        assignedUsers.push(newUserName);
        const assignable = Math.min(remainingHours, freeHours);
        remainingHours -= assignable; //subract the todo estimate hours from remaining hours
        eachElement[1] -= assignable; //subract the todo estimate hours from user's free hours
      }
      reassignmentDetails.push({ //Push the reassignment details
        todoId: todo["todoId"],
        fromPerson: oldUserName,
        toPersonSuggested: assignedUsers,
      });

      return reassignmentDetails;
    },
    []
  );
};

//Main function to find the suggestion
const suggestReassignmentOfZeroCapacityPeople = function (people, todos) {
  const normalizedPeoples = normalizePeoples(people);
  const normalizedTodos = normalizeTodos(todos);

  const zeroOrLowerCapacityPeople = findZeroCapacityPeople(normalizedPeoples); //Filters out only zero capacity people
  const taskAssignedToZeroCapacityPeople = normalizedTodos?.filter((todo) => { //Filter the tasks that is assgned to zero capacity people
    const assignedId = todo["assignedId"];
    return (
      assignedId &&
      zeroOrLowerCapacityPeople.some(
        (people) => people["userId"] === assignedId
      )
    );
  });

  const totalEstimated = showTotalEstimatedHoursOfOpenTasks(people, todos); //To get the total free hours of each user

  const idToUserMap = mapIdWithUserDetails(normalizedPeoples); //Id to userDetails map
  const remainingHoursOfUsers = []; //To hole the remaining hours of each user as 2D array
  for (let [userId, userDetail] of Object.entries(totalEstimated)) {
    const user = idToUserMap[userId];
    if (!user) continue;

    const userCapacityHoursPerDay = user["userCapacityHoursPerDay"];
    const weekCapacity = userCapacityHoursPerDay * 6;
    const pendingHours = userDetail["totalHours"];
    const remainingHours = weekCapacity - pendingHours;
    remainingHoursOfUsers.push([userId, remainingHours]);
  }

  const sortedRemainingHours = remainingHoursOfUsers.sort(
    (a, b) => b[1] - a[1]
  ); //Sort 2D array based on 1th value which is freehours of each user decending

  return getReassignmentDetails(taskAssignedToZeroCapacityPeople,sortedRemainingHours,idToUserMap); //pass the flow controm to oter function for readability
};

const reassignmentDetails = suggestReassignmentOfZeroCapacityPeople(
  people,
  todos
);
console.log(reassignmentDetails);
