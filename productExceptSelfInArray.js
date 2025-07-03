// leetcode medium #238 product except self

// Given an integer array nums, return an array answer such that
// answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time
// and without using the division operation.

const nums = [1, 2, 3, 4];
// Output: [24,12,8,6]

// const nums = [-1, 1, 0, -3, 3];
// Output: [0,0,9,0,0]
// const nums = [-1, 1, 0, -3, 3, 0];
// o/p = [0,0,0,0,0,0]

// brute force approach
// not valid as per given statement as using division
// TC - O(n^2) SC - O(n)

var calculateProduct = (nums) => {
  return nums.reduce((acc, i) => acc * i, 1);
};
var productExceptSelf = function (nums) {
  let product = calculateProduct(nums);

  const out = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) out.push(parseInt(product / nums[i]));
    else {
      const temp = [...nums];
      temp[i] = 1;
      let p = calculateProduct(temp);
      out.push(p);
    }
  }

  return out;
};

// brute force using nested loops
// TC - O(n^2) SC- O(n)
// getting TLE
var productExceptSelfUsingLoops = function (nums) {
  const out = [];

  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i == j) continue;

      product *= parseInt(nums[j]);
    }

    // convert to int to remove -ve sign from 0
    // maybe push convert into string when push into array
    out.push(parseInt(product));
    // out.push(product);
  }

  return out;
};

// using prefix and postfix method
// basically store the products before the element in prefix array
// and store the product after the element in postfix array
// and out array would be product of both the array position
// TC - O(n) +O(n)+O(n) = O(n)  SC - O(n)+O(n) = O(n)
const productExceptSelfUsingPrefixPostfix = (nums) => {
  const prefixArr = Array(nums.length).fill(1);
  const postfixArr = Array(nums.length).fill(1);

  const out = [];

  // const nums = [1, 2, 3, 4];

  // calculate prefix i.e product of all element before the ith position
  // start from 1 as product before 1 element would be 1
  let prefix = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    prefix *= nums[i];
    prefixArr[i + 1] = parseInt(prefix);
  }

  // calculate postfix i.e product of all element after the ith position
  // start from end with value 1 as after last there is no element so product will be 1
  let postfix = 1;
  for (let i = nums.length - 1; i > 0; i--) {
    postfix *= nums[i];
    postfixArr[i - 1] = parseInt(postfix);
  }

  // console.log(prefixArr);
  // console.log(postfixArr);

  // calculate the result array by product of both array at ith position
  for (let i = 0; i < nums.length; i++) {
    out.push(parseInt(prefixArr[i] * postfixArr[i]));
  }

  return out;
};

// uaing inplace prefix postfix product in array
// to optimise SC
// TC - O(n) SC - O(1)
const productExceptSelfUsingInplacePrefixPostfix = (nums) => {
  // const out = Array(nums.length).fill(1);

  // // calculate prefix i.e product of all element before the ith position
  // // start from 1 as product before 1 element would be 1
  // let prefix = 1;
  // for (let i = 0; i < nums.length - 1; i++) {
  //   prefix *= nums[i];
  //   out[i + 1] = parseInt(prefix);
  // }

  // // calculate postfix i.e product of all element after the ith position
  // // start from end with value 1 as after last there is no element so product will be 1
  // let postfix = 1;
  // for (let i = nums.length - 2; i >= 0; i--) {
  //   postfix *= nums[i + 1];
  //   out[i] = parseInt(out[i] * postfix);
  // }

  // return out;

  // beats 87% most optimal approach
  if (!nums || nums.length === 0) return null;
  let productArr = new Array(nums.length).fill(1);

  let product = 1;
  for (let i = 0; i < nums.length; i++) {
    productArr[i] = product;
    product *= nums[i];
  }

  product = 1;
  for (let j = nums.length - 1; j >= 0; j--) {
    productArr[j] *= product;
    product *= nums[j];
  }
  return productArr;
};

console.log(productExceptSelf(nums));
console.log(productExceptSelfUsingLoops(nums));
console.log(productExceptSelfUsingPrefixPostfix(nums));
console.log(productExceptSelfUsingInplacePrefixPostfix(nums));
