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

const findZeroCapacityPeople = function (peoples) {
  return peoples.filter((people) => people["userCapacityHoursPerDay"] <= 0);
};

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
        if (remainingHours <= 0) break;
        if (freeHours <= 0) continue;

        const newUserName = idToUserMap[newAssigningId].userName;
        assignedUsers.push(newUserName);
        const assignable = Math.min(remainingHours, freeHours);
        remainingHours -= assignable;
        eachElement[1] -= assignable;
      }
      reassignmentDetails.push({
        todoId: todo["todoId"],
        fromPerson: oldUserName,
        toPersonSuggested: assignedUsers,
      });

      return reassignmentDetails;
    },
    []
  );
};

const suggestReassignmentOfZeroCapacityPeople = function (people, todos) {
  const normalizedPeoples = normalizePeoples(people);
  const normalizedTodos = normalizeTodos(todos);

  const zeroOrLowerCapacityPeople = findZeroCapacityPeople(normalizedPeoples);
  const taskAssignedToZeroCapacityPeople = normalizedTodos?.filter((todo) => {
    const assignedId = todo["assignedId"];
    return (
      assignedId &&
      zeroOrLowerCapacityPeople.some(
        (people) => people["userId"] === assignedId
      )
    );
  });

  const totalEstimated = showTotalEstimatedHoursOfOpenTasks(people, todos);

  const idToUserMap = mapIdWithUserDetails(normalizedPeoples);
  const remainingHoursOfUsers = [];
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
  );

  return getReassignmentDetails(taskAssignedToZeroCapacityPeople,sortedRemainingHours,idToUserMap);
};

const reassignmentDetails = suggestReassignmentOfZeroCapacityPeople(
  people,
  todos
);
console.log(reassignmentDetails);
