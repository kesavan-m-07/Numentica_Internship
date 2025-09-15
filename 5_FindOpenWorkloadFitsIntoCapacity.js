/*
5. Check if open workload fits into capacity (5-day sprint). 5 day sprint is 40 hours
Arun → OK
Uma → OVER-ALLOCATED by 10 hrs
Aadhir → OK
Aarik → OVER-ALLOCATED by 4 hrs (capacity 0)
*/

import { people, todos,mapIdWithUserDetails, normalizePeoples } from "./JSONData.js";
import { showTotalEstimatedHoursOfOpenTasks } from "./3_EstimatedHoursOfOpenTaskGroupedByPersons.js";

const findIfWorkloadFits = function (people, todos) {
  const totalOpenHoursDetails = showTotalEstimatedHoursOfOpenTasks(
    people,
    todos
  );

  const idToUserMap = mapIdWithUserDetails(normalizePeoples(people));
  
  return Object.entries(totalOpenHoursDetails).reduce(
    (workLoadDetails, [userId,userDetails]) => {
        if(userId === 'unassigned')return workLoadDetails;
        
        const user = idToUserMap[userId];
        
        const workingCapacity = user['userCapacityHoursPerDay'] > 0 ? user['userCapacityHoursPerDay'] : 0;
        const capacityPerWeek = workingCapacity * 5;

        const pendingHours = userDetails['totalHours'];
        const userName = userDetails['userName'];
        if(capacityPerWeek >= pendingHours){
            workLoadDetails[userName] = `OK`;
        }
        else workLoadDetails[userName] = `OVER-ALLOCATED by ${pendingHours - capacityPerWeek} hrs`;

        return workLoadDetails
    },
    {}
  );
};

const workLoadDetails = findIfWorkloadFits(people, todos);
console.log(workLoadDetails);

