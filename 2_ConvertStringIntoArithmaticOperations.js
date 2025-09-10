/*
2. Convert string to arithmetic operation
For example accept a string like "10 + 20"
and return output as 30
b. "20 - 10" //Output 10
Only string input is allowed which you have to parse and get a number output
eval is not allowed
*/

const expression = "10 + 5 +(10 % 2) / 1 - 5";

//To remove all space in the expression
const removeAllSpaces = function (expression) {
  let expressionWithoutSpace = "";
  for (let i = 0; i < expression.length; i++) {
    const currentLetter = expression[i];
    if (currentLetter === " ") continue;
    expressionWithoutSpace += currentLetter;
  }
  return expressionWithoutSpace;
};

//To Parse and store the expression in an array
const tokenizeExpression = function (expression) {
  const tokenizedExpression = []; //To Store Tokens
  let numericDigit = 0;
  let isAddingNumber = false; //To handle paranthesis
  let isFraction = false; //Fraction boolean flag
  let fractionDivider = 10;

  for (let i = 0; i < expression.length; i++) {
    const currentLetter = expression[i];
    if (currentLetter >= "0" && currentLetter <= "9") {
      //Checks for the number
      isAddingNumber = true;
      if (!isFraction) {
        numericDigit = numericDigit * 10 + parseInt(currentLetter);
      } else {
        numericDigit = numericDigit + parseInt(currentLetter) / fractionDivider;
        fractionDivider *= 10;
      }
    } else if (currentLetter === ".") {
      isFraction = true;
    } else if (isOperator(currentLetter)) {
      if (isAddingNumber) {
        tokenizedExpression.push(numericDigit);
      }
      if (i !== 0 && currentLetter === "(") {
        const previous = expression[i - 1];
        if (previous === ")" || (previous >= "0" && previous <= "9")) {
          tokenizedExpression.push("*"); //Push * when there is no operator beside of number
        }
      }
      tokenizedExpression.push(currentLetter);
      isFraction = false;
      fractionDivider = 10;
      numericDigit = 0;
      isAddingNumber = false;
    }
  }
  if (isAddingNumber) tokenizedExpression.push(numericDigit); // push the last digit
  return tokenizedExpression;
};

//To check the operator
const isOperator = function (input) {
  return (
    input === "+" ||
    input === "-" ||
    input === "*" ||
    input === "/" ||
    input === "%" ||
    input === "(" ||
    input === ")"
  );
};

// Used to just calculate sum
const calculateSum = function (leftOperand, operator, rightOperand) {

  if (operator === "+") return leftOperand + rightOperand;
  if (operator === "-") return leftOperand - rightOperand;
  if (operator === "*") return leftOperand * rightOperand;
  if (operator === "/") return leftOperand / rightOperand;
  if (operator === "%") return leftOperand % rightOperand;
};

//To check the precedence of the operators
const isHigherPrecedence = function (operatorOne, operatorTwo) {
  if (operatorOne === "(") return true;
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
  };

  return precedence[operatorOne] < precedence[operatorTwo];
};

// Perform arithmatic operation by using both stacks
const performArithmaticOperation = function (operatorStack, operandStack) {
  const rightOperand = operandStack.pop();
  const leftOperand = operandStack.pop();
  const operator = operatorStack.pop();
  if (typeof leftOperand !== "number" || typeof rightOperand !== "number") {
    return;
  }
  const sum = calculateSum(leftOperand, operator, rightOperand);
  operandStack.push(sum);
  return true;
};

const convertExpressionToArithmaticOperation = function (expression) {
  if (typeof expression !== "string") {
    console.error("Invalid Input");
    return;
  }
  const expressionWithoutSpace = removeAllSpaces(expression); //To clean the input

  const tokenizedExpression = tokenizeExpression(expressionWithoutSpace); // Generate tokens

  const operatorStack = []; //To store operator
  const operandStack = []; //To store operands

  for (let eachElement of tokenizedExpression) {
    if (eachElement === ")") {
      while (
        // pop until the stack's top element becomes '('
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        if (!performArithmaticOperation(operatorStack, operandStack)) {
          console.error("Invalid Expresion");
          return false;
        }
      }
      //To check invalid input
      if (operatorStack.length === 0) return;
      operatorStack.pop();
    } else if (typeof eachElement === "number") {
      // To check the number is input
      operandStack.push(eachElement);
    } else if (isOperator(eachElement)) {
      if (operatorStack.length === 0 || eachElement === "(")
        // To push the first operator onto stack
        operatorStack.push(eachElement);
      else {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "(" &&
          !isHigherPrecedence(
            operatorStack[operatorStack.length - 1],
            eachElement
          )
        ) {
          if (!performArithmaticOperation(operatorStack, operandStack)) {
            console.error("Invalid Expresion");
            return;
          }
        }
        operatorStack.push(eachElement);
      }
    }
  }

  // Do remaining operations until the oprtaor stack become empty
  while (operatorStack.length !== 0) {
    if (!performArithmaticOperation(operatorStack, operandStack)) {
      console.error("Invalid Expresion");
      return;
    }
  }
  // A correct expression will leave the final answer in operand stack as only element
  if (operandStack.length !== 1) {
    console.error("Invalid Expression");
    return;
  }

  return operandStack.pop(); // return totalSum
};
const totalValue = convertExpressionToArithmaticOperation(expression);
if (typeof totalValue === "number")
  console.log("Total Value After Evaluation: ", totalValue);
