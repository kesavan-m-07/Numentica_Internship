/*
5. Check if open workload fits into capacity (5-day sprint). 5 day sprint is 40 hours
Arun → OK
Uma → OVER-ALLOCATED by 10 hrs
Aadhir → OK
Aarik → OVER-ALLOCATED by 4 hrs (capacity 0)
*/

import {
  people,
  todos,
  mapIdWithUserDetails,
  normalizePeoples,
} from "./JSONData.js";
import { showTotalEstimatedHoursOfOpenTasks } from "./3_EstimatedHoursOfOpenTaskGroupedByPersons.js"; //Imported function from 3_rd Problem

const findIfWorkloadFits = function (people, todos) {
  const totalOpenHoursDetails = showTotalEstimatedHoursOfOpenTasks(
    people,
    todos
  ); //Gets the total open hours details

  const idToUserMap = mapIdWithUserDetails(normalizePeoples(people)); //Gets the ID map

  return Object.entries(totalOpenHoursDetails).reduce(
    //Iterates object using entries and reduce it
    (workLoadDetails, [userId, userDetails]) => {
      if (userId === "unassigned") return workLoadDetails;

      const user = idToUserMap[userId];

      const workingCapacity =
        user["userCapacityHoursPerDay"] > 0
          ? user["userCapacityHoursPerDay"]
          : 0; //To avoid the negative values
      const capacityPerWeek = workingCapacity * 5; //5 Day per week

      const pendingHours = userDetails["totalHours"];
      const userName = userDetails["userName"];
      if (capacityPerWeek >= pendingHours) {
        workLoadDetails[userName] = `OK`;
      } else
        workLoadDetails[userName] = `OVER-ALLOCATED by ${
          pendingHours - capacityPerWeek
        } hrs`;

      return workLoadDetails; //returns the accumulator for next iteration of reduce
    },
    {}
  );
};

const workLoadDetails = findIfWorkloadFits(people, todos);
console.log(workLoadDetails);
