/*
6. Convert an array of key-value pairs into an object.
toObject([["name", "Arun"], ["age", 39]]);
// Output: { name: "Arun", age: 39 }
*/

const userInput = [[null, "Arun"], ["age", 39],[],new Date()];

const convertKeyValuePairToObject  = function(userInput){

    //Check if the input is an array
    if(!Array.isArray(userInput)){
        console.error("Given input is not an array...");
        return;
    }


    //Check if the array is not empty
    if(userInput.length === 0)return {};

    const convertedObject = {};

    for (let i = 0; i < userInput.length; i++) {
        const currentElement = userInput[i];
        if(!Array.isArray(currentElement) || currentElement.length !== 2) continue;
        const keyOfObject = currentElement[0];
        const valueOfObject = currentElement[1];
        if(keyOfObject !== null && keyOfObject !== undefined)
        convertedObject[keyOfObject] = valueOfObject;
    }
    return convertedObject;
}

const convertedObject = convertKeyValuePairToObject(userInput);
if(typeof convertedObject === 'object') console.log(convertedObject);
