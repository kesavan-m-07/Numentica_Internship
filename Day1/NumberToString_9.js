let num = -2;

const map = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

function convertNumberToString(num) {
  if (num === 0) return "zero";
  let string = "";

  while (num > 0) {
    let rem = num % 10;
    let word = map[rem];
    word = word + string;
    string = word;
    num = Math.floor(num / 10);
  }
  return string;
}

console.log(convertNumberToString(num));
