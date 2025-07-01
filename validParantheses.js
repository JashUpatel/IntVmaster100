// leetcode easy #20  Valid Parantheses

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// simple approach using stack implementation

const validPAranthesesUsingStack = (s) => {
  const bStack = [];

  for (let i of s) {
    // bStack[-1] not working
    // -1 index not there in array in JS as they are objects
    // instead use at(-1) method to do the same
    if (
      (i == ")" && bStack.at(-1) == "(") ||
      (i == "}" && bStack.at(-1) == "{") ||
      (i == "]" && bStack.at(-1) == "[")
    ) {
      bStack.pop();
    } else {
      bStack.push(i);
    }

    // console.log(bStack, bStack[bStack.length - 1]);
  }

  return bStack.length > 0 ? false : true;
};

// unique approach using same stack beats 85% in TC
const validPAranthesesUsingStack2 = (s) => {
  const bStack = [];
  const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  if (s.length % 2 == 1) return false;
  if (Object.values(pairs).includes(s[0])) return false;

  for (let i of s) {
    // bStack[-1] not working
    // -1 index not there in array in JS as they are objects
    // instead use at(-1) method to do the same
    if (Object.keys(pairs).includes(i)) {
      bStack.push(pairs[i]);
    } else {
      if (bStack.length === 0 || bStack.at(-1) !== i) {
        return false;
      }
      bStack.pop();
    }
  }

  return bStack.length === 0;
};

var isValid = function (s) {
  // brute force naive approach
  // count all the open and close bracket using pointers
  // cant pass edge cases will fail [{]} and return true as per logic below

  //   let round = 0;
  //   let square = 0;
  //   let curly = 0;

  //   for (let i of s) {
  //     if (i == "(") round++;
  //     if (i == ")") round--;
  //     if (i == "[") square++;
  //     if (i == "]") square--;
  //     if (i == "{") curly++;
  //     if (i == "}") curly--;
  //   }

  //   if (round == 0 && curly == 0 && square == 0) return true;

  //   return false;

  // -------
  // using stack implementation
  //   const bStack = [];

  //   for (let i of s) {
  //     // bStack[-1] not working
  //     if (
  //       (i == ")" && bStack[bStack.length - 1] == "(") ||
  //       (i == "}" && bStack[bStack.length - 1] == "{") ||
  //       (i == "]" && bStack[bStack.length - 1] == "[")
  //     ) {
  //       bStack.pop();
  //     } else {
  //       bStack.push(i);
  //     }

  //     // console.log(bStack, bStack[bStack.length - 1]);
  //   }

  //   return bStack.length > 0 ? false : true;

  // ---- submited solution better efficiency than all above beats 75% in TC
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (let ch of s) {
    if (Object.values(pairs).includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

console.log(isValid("()"));
console.log(validPAranthesesUsingStack("()"));
