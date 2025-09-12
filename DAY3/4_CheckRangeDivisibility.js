/*
4. Check if a number is divisible by all numbers in a given range.
For example:
isDivisibleInRange([1, 5], 60) // true  (60 is divisible by 1,2,3,4,5)
isDivisibleInRange([1, 5], 15) // false (15 is not divisible by 4)
isDivisibleInRange([2, 6], 120) // true  (120 % 2,3,4,5,6 === 0)
*/

const range = [1,5];
const valueToCheck = 120;


const checkDivisibiltyForRange = function (range, valueToCheck) {

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

    for (let i = lowerBound; i <= upperBound; i++) {
        if(valueToCheck % i !== 0)return false;  
    }
    return true;

};

const isDivisible = checkDivisibiltyForRange(range,valueToCheck);
if(typeof isDivisible === 'boolean'){
    console.log(isDivisible);
}
