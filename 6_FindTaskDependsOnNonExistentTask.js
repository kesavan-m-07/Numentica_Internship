/*
6. Find tasks that depend on a non-existent task which means the taskId in dependsOn is not a valid task.
[
  { id: "t12", title: "Data migration", dependsOn: ["t4", "t99"] }
]
*/

import { todos, normalizeTodos } from "./JSONData.js";

const findTaskThatDependsOnNonExistentTask = function (todos) {
  const normalizedTodos = normalizeTodos(todos);
  const existingTask = normalizedTodos.map((todo) => todo["todoId"]);
  return normalizedTodos?.filter((todo) => {
    const todoDependsOn = todo["todoDependsOn"];
    return (
      Array.isArray(todoDependsOn) &&
      todoDependsOn.some((id) => !existingTask.includes(id))
    );
  });
};

const tasksThatDependsOnNonExistentTask =
  findTaskThatDependsOnNonExistentTask(todos);
console.log(tasksThatDependsOnNonExistentTask);
