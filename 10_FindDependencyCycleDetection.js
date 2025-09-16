/*
10. Detect dependency cycles.
What is a Dependency Cycle?
A dependency means:
Task B cannot start until Task A is finished.
For example:
Task A depends on Task B
Task B depends on Task A
Both are waiting for each other.
Neither can start. This is a dependancy cycle.
["t13", "t14", "t13"]
*/

import { todos, normalizeTodos } from "./JSONData.js";

//To find if there is a dependency cycle
const hasCycle = function (todoId, dependencyListForTasks, visitedIds, stack) {
//   console.log("stack: ", stack);
//   console.log("visited: ", visitedIds);

  if (stack.has(todoId)) return true; //If curent todoId is already present in current path it has cycle
  if (visitedIds.has(todoId)) return false; //Already checked ID not cycle
  visitedIds.add(todoId); //adds visited Ids
  const dependencyList = dependencyListForTasks[todoId];
  if (!dependencyList) return false;
  stack.add(todoId); //If dependency is not undefined add current todoId to stack

  for (let id of dependencyList) { //Iterated through dependency list
    if (hasCycle(id, dependencyListForTasks, visitedIds, stack)) { //Reccursively checks for cycle
      return true;
    }
  }

  stack.delete(todoId);//Delete the todoId from stack on exit of each recursion call (Backtracking)
  return false; //No cycles found
};

//To find the depndency cycle
const findDependencyCycle = function (todos) {
  const normalizedTodos = normalizeTodos(todos);
  const dependencyListForTasks = normalizedTodos?.reduce(
    (dependencyListForTasks, todo) => {
      dependencyListForTasks[todo["todoId"]] = todo["todoDependsOn"];
      return dependencyListForTasks;
    },
    {}
  ); //It fetches the dependency list for each task in the object

  const visitedIds = new Set(); //To keeps track of visted tasks (to Avoid recomputation)
  const stack = new Set(); //To keeps track of current task's path

  return Object.keys(dependencyListForTasks)?.filter((taskId) =>
    hasCycle(taskId, dependencyListForTasks, visitedIds, stack)
  ); //Filters out the tasks that if having dependencyCycle
};

const tasksWithDependencyCycles = findDependencyCycle(todos);
console.log(tasksWithDependencyCycles);
