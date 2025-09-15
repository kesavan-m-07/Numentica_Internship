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

const suggestReassignmentOfZeroCapacityPeople = function (people, todos) {
  const normalizedPeoples = normalizePeoples(people);
  const normalizedTodos = normalizeTodos(todos);
  // console.log(normalizedTodos);

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

  //   console.log(taskAssignedToZeroCapacityPeople);

  const totalEstimated = showTotalEstimatedHoursOfOpenTasks(people, todos);

  const idToUserMap = mapIdWithUserDetails(normalizedPeoples);
  //   console.log(idToUserMap);
  const remainingHoursOfUsers = [];
  for (let [userId, userDetail] of Object.entries(totalEstimated)) {
    const user = idToUserMap[userId];
    if (!user) continue;
    // console.log(userDetail);

    const userCapacityHoursPerDay = user["userCapacityHoursPerDay"];
    const weekCapacity = userCapacityHoursPerDay * 6;
    const pendingHours = userDetail["totalHours"];
    const remainingHours = weekCapacity - pendingHours;

    remainingHoursOfUsers.push([userId,remainingHours]);
  }

  const sortedRemainingHours = remainingHoursOfUsers.sort((a,b)=>b[1] - a[1]);
  
  console.log(taskAssignedToZeroCapacityPeople);
  return taskAssignedToZeroCapacityPeople.reduce((reassignmentDetails,todo)=>{
    const estimatedHours = todo['estimatedHours'];
    const assignedId = todo['assignedId'];
    let remainingHours = estimatedHours;
    sortedRemainingHours.forEach(eachElement=>{
        const newAssigningId = eachElement[0];
        const totalHours = eachElement[1];

        if(remainingHours < totalHours){
            eachElement[1] = totalHours - remainingHours;
        }

        
    })
  },[])
  
};

const reassignmentDetails = suggestReassignmentOfZeroCapacityPeople(
  people,
  todos
);
// console.log(reassignmentDetails);
