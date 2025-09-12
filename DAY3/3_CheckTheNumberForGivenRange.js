/*
3. Check if the number is in range
For example:
checkInRange([1, 10], 4) // true since 4 is in between 1
checkInRange([10, 100], 8) // true false 8 is not in between 10 and 100
*/

const range = [10, 100];
const valueToCheck = 11;

const checkTheValueForRange = function (range, valueToCheck) {

    //Check for given input types
    if(!Array.isArray(range) || typeof valueToCheck !== 'number'){
        console.error("Invalid input given..");
        return;
    }

    //Check if the range has exactly two values
    if(range.length !== 2){
        console.error("The Range should have exacly two elemnts..");
        return;
    }

    //Check if the range has number type
    if(typeof range[0] !== 'number' || typeof range[1] !== 'number'){
        console.error("The range should only have numbers...");
        return;
    }

    const upperBound = (range[0] > range[1]) ? range[0] : range[1]; 
    const lowerBound = (range[0] <= range[1]) ? range[0] : range[1]; 

    return (valueToCheck > lowerBound) && (valueToCheck < upperBound);

};

const isValueInRange = checkTheValueForRange(range, valueToCheck);
if (typeof isValueInRange !== undefined) {
  console.log(isValueInRange);
}
