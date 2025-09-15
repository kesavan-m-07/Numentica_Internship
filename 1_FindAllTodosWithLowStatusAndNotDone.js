/*
1. Find all todos with priority not low and status not done.
Example Output:
[
  { id: "t2", title: "Scaffold UI", assigneeId: "p1" },
  { id: "t3", title: "Build login", assigneeId: "p2" },
  { id: "t4", title: "Payments integration", assigneeId: "p2" }
]
*/

import { todos, normalizeTodos } from "./JSONData.js";

const findAllTodosWithStatusLowAndNotDone = function (todos) {
  const normalizedTodos = normalizeTodos(todos);
    // console.log(normalizedTodos);
    
  return (normalizedTodos).reduce(
    (allTodosWithLowStatusNotDone, todo) => {
      const todoStatus = todo?.todoStatus;
      const todoPriority = todo?.priority;
      const todoTitle = todo.todoTitle;

      if (todoPriority !== "low" && todoStatus !== "done") {
        allTodosWithLowStatusNotDone.push({
          id: todo["todoId"],
          title: todoTitle,
          assigneeId: todo["assignedId"],
        });
      }

      return allTodosWithLowStatusNotDone;
    },
    []
  );
};

const allTodosWithLowStatusNotDone = findAllTodosWithStatusLowAndNotDone(todos);
console.log("allTodosWithLowStatusNotDone: ", allTodosWithLowStatusNotDone);
