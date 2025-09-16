/*
8. List tasks that can start now, sorted by priority > due date > estimate.
["t2", "t6", "t5"]
*/

import { todos, normalizeTodos } from "./JSONData.js";

const sortTodosBasedOnPriority = function (todos) {
  const priorityLevel = { high: 3, medium: 2, low: 1 };
  const normalizedTodos = normalizeTodos(todos);

  const todoToBeDone = normalizedTodos?.filter(
    (todo) => todo["todoStatus"] !== "done"
  ); //to filter out the already completd tasks

  return todoToBeDone.sort((a, b) => {
    const priorityOfA = a["priority"];
    const priorityOfB = b["priority"];

    if (priorityLevel[priorityOfA] !== priorityLevel[priorityOfB]) { 
      return priorityLevel[priorityOfB] - priorityLevel[priorityOfA]; // Sort on priority level if both are not same
    }
    //If both priority levels are same , then sort using due date
   if (a.todoDue !== b.todoDue) {
      return new Date(a.todoDue) - new Date(b.todoDue);
    }

    //If both due dates are also same , use estimated hours for sorting
    return b['estimatedHours'] - a['estimatedHours']
  }).map(todo=>todo['todoId']);
};

const sortedTodos = sortTodosBasedOnPriority(todos);
console.log(sortedTodos);
