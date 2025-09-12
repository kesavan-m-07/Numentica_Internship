//Custom Keys
Object.defineProperty(Object.prototype, "customKeys", {
  value: function () {
    const result = [];
    for (let keyOfObject in this) {
      result.push(keyOfObject);
    }
    return result;
  },
});

//Custom Values
Object.defineProperty(Object.prototype, "customValues", {
  value: function () {
    const result = [];
    for (let keyOfObject in this) {
      result.push(this[keyOfObject]);
    }
    return result;
  },
});



//Custom Entries
Object.defineProperty(Object.prototype,'customEntries',{
    value : function(){
        const result = [];
        for(let keyOfObject in this){
            const internalProperty = [];
            internalProperty.push(keyOfObject , this[keyOfObject]);
            result.push(internalProperty);
        }
        return result;
    }
})

const userDate = {
  name: "xyz",
  age: "43",
  designation: "developer",
  age: 50,
  skills : ['nextJS,reactJS','springboot']
};

console.log(userDate.customKeys());
console.log(userDate.customValues());
for(let [key,value] of userDate.customEntries()){
    console.log(`${key} : ${value}`);
}



