/*
Using fetch , get the results from this API and display the results
https://jsonplaceholder.typicode.com/todos/1
*/

const BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchDataFromAPI = async function (BASE_URL) {
  try {
    const response = await fetch(`${BASE_URL}/todos/2`);
    if(!response.ok) {
        console.error('Failed To Fetch Data...');
        return;
    }
    const dataFromAPI = await response.json();
    return dataFromAPI;
  } catch (error) {
    console.error(error.message);
  }
};

fetchDataFromAPI(BASE_URL).then(dataFromAPI=> console.log(dataFromAPI));

