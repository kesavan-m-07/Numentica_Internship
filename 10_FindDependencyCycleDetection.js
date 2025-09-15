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

const hasCycle = function (todoId, dependencyListForTasks, visitedIds, stack) {
//   console.log("stack: ", stack);
//   console.log("visited: ", visitedIds);

  if (stack.has(todoId)) return true;
  if (visitedIds.has(todoId)) return false;
  visitedIds.add(todoId);
  const dependencyList = dependencyListForTasks[todoId];
  if (!dependencyList) return false;
  stack.add(todoId);

  for (let id of dependencyList) {
    if (hasCycle(id, dependencyListForTasks, visitedIds, stack)) {
      return true;
    }
  }

  stack.delete(todoId);
  return false;
};

const findDependencyCycle = function (todos) {
  const normalizedTodos = normalizeTodos(todos);
  const dependencyListForTasks = normalizedTodos?.reduce(
    (dependencyListForTasks, todo) => {
      dependencyListForTasks[todo["todoId"]] = todo["todoDependsOn"];
      return dependencyListForTasks;
    },
    {}
  );
  const visitedIds = new Set();
  const stack = new Set();

  return Object.keys(dependencyListForTasks)?.filter((taskId) =>
    hasCycle(taskId, dependencyListForTasks, visitedIds, stack)
  );
};

const tasksWithDependencyCycles = findDependencyCycle(todos);
console.log(tasksWithDependencyCycles);
