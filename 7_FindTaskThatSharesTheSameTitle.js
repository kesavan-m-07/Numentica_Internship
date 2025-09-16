/*
7. Find tasks that share the same title (ignoring case/spaces).
{
  "Build login": ["t3", "t9"]
}
*/

import { todos } from "./JSONData.js";

//To remove space and make the title lowercase to use as a key
const removeSpacesAndNormalizeTitle = function (title) {
  if (typeof title !== "string") {
    console.error("invalidInputs");
    return;
  }
  let normalizedTitle = "";
  for (let i = 0; i < title.length; i++) {
    const currentLetter = title[i];
    if (currentLetter !== " ") {
      normalizedTitle += currentLetter.toLowerCase();
    }
  }
  return normalizedTitle;
};


const addTitleToList = function (todos) {
  return todos?.reduce((titleToIdMap,todo) => {
    const todoTitle = todo['title'];
    const todoId = todo['id'];
    const normalizedTitle = removeSpacesAndNormalizeTitle(todoTitle);
    if(!titleToIdMap[normalizedTitle]) titleToIdMap[normalizedTitle] = {todoTitle,ids : []}; //Initialize for first time entry of title
    const details = titleToIdMap[normalizedTitle];
    details.ids.push(todoId)
    return titleToIdMap;
  },{});
};


const findTaskThatSharesCommonName = function (todos) {
  const normalizedTodoTitles = addTitleToList(todos);
  return Object.entries(normalizedTodoTitles).reduce((taskThatSharesTheCommonName,[title,todoDetails])=>{
    const ids = todoDetails['ids']
    if(Array.isArray(ids) && ids.length > 1){ //Check if the same title used for diffrent ids
        taskThatSharesTheCommonName[todoDetails['todoTitle']] = ids;
    }
    return taskThatSharesTheCommonName;
  },{})
};

const taskThatSharesTheCommonName = findTaskThatSharesCommonName(todos);
console.log(taskThatSharesTheCommonName);
