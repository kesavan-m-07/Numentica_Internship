/*
Object.defineProperty gets an arguments of(objectToAddTheProperty,key,descriptor), 
and sets the descriptor's value to the key
*/

//Custom Map Function
Object.defineProperty(Array.prototype, "customMap", {
  value: function (callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Call back function should be passed..");
    }
    const result = [];
    for (let i = 0; i < this.length; i++) {
      const currentElement = this[i];
      result[i] = callback(currentElement, i, this);
    }

    return result;
  },
});

//Custom Size Property
Object.defineProperty(Array.prototype, "size", {
  value: function () {
    let totalLength = 0;
    for (let i in this) totalLength++;
    return totalLength;
  },
});

//Custom Push
Object.defineProperty(Array.prototype, "customPushOneElement", {
  value: function (elementToPush) {
    const size = this.size();
    this[size] = elementToPush;
    return size + 1;
  },
});

//Custom Push Multiple elements
Object.defineProperty(Array.prototype, "customPushMultiElements", {
  value: function () {
    let size = this.size();
    for (let i = 0; i < arguments.length; i++) {
      this[size++] = arguments[i];
    }
    return size;
  },
});

//Custom Reducer Function
Object.defineProperty(Array.prototype, "customReduce", {
  value: function (callback, initialValue) {
    if (typeof callback !== "function") {
      console.error("Call Back Function Should be passed..");
      return;
    }
    let accumulator;
    let startIndex = 1;
    if (typeof initialValue === "number") {
      accumulator = initialValue;
      startIndex = 0;
    } else {
      if (this.length === 0) {
        console.error("Array cannot be empty..");
        return;
      }
      accumulator = this[0];
    }
    for (let i = startIndex; i < this.length; i++) {
      if (i in this) {
        accumulator = callback(accumulator, this[i], i, this);
      }
    }
    return accumulator;
  },
});

//Custom Filter Implementation
Object.defineProperty(Array.prototype, "customFilter", {
  value: function (callback) {
    if (typeof callback !== "function") {
      console.error("Call Back Function Should be passed..");
      return;
    }
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) result.customPushOneElement(this[i]);
    }
    return result;
  },
});


//Custom Pop Implementation
Object.defineProperty(Array.prototype,'customPop',{
  value : function(){
   if(this.length === 0) return undefined;
   const lastIndex = this.length - 1;
   const lastElement = this[lastIndex];
   delete this[lastIndex];
   this.length = lastIndex;
   return lastElement;
  }
})




console.log([12, 23, 5, 5].customMap((x) => x * 2));
console.log([12, 23, 5, 5].map((x) => x * 2));

console.log([1, 2, 3, undefined, 6, 7].size());
console.log([1, 2, 3, 4, 6, 7].length);

const input = [1, 2, 4];
input.push(null);
input.customPushOneElement(null, 2);
input.customPushMultiElements(2, null, undefined);
console.log(input);

// console.log(
//   [].customReduce((total, currentValue, index, array) => total + currentValue)
// );

console.log([1, 2, 3, undefined,null,'6'].customFilter((x) => x > 2));
console.log([1, 2, 3, undefined,null,'6'].filter((x) => x > 2));
const input2 = [1,2,3];
console.log(input2.customPop())
console.log(input2);


