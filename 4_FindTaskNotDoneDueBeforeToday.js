/*
4. List tasks not done and due before today.
[
  { id: "t7", title: "Accessibility pass", assigneeName: "Aadhir", due: "2025-09-15" }
]
*/

import { todos,normalizeTodos,mapIdWithUserDetails,people,normalizePeoples } from "./JSONData.js";

const findTheNotCompletedTaskWithDueTodayOrBefore = function(todos){
    const normalizedTodos = normalizeTodos(todos);
    // console.log(normalizedTodos);
    const idToUserMap = mapIdWithUserDetails(normalizePeoples(people));
    // console.log(idToUserMap);
    
    const todayDate = new Date(); //Date Now

    return normalizedTodos?.filter(todo=>{
        const todoDue = todo['todoDue'];
        const dueDate = new Date(`${todoDue}`); //Creates new Date object with todo date
        const status = todo['todoStatus']
        return (dueDate <= todayDate && status !== 'done'); //filter condition
    }).map(todo=>{ //Gets the rsult from the filter and get the required details
        const assignedId = todo['assignedId'];
        const assigneeUser  = idToUserMap[assignedId];
        return {'id':todo['todoId'],'title':todo['todoTitle'],'assigneeName' :assigneeUser['userName'] ,'due':todo['todoDue']}
    })
}

const notCompletedTask = findTheNotCompletedTaskWithDueTodayOrBefore(todos);
console.log(notCompletedTask);
