// leetcode med #152 maximum sub array product
// Given an integer array nums, find a subarray that has the largest product,
// and return the product.

const nums = [2, 3, -2, 4];
// Output: 6

// const nums = [1, 0, -5, 2, 3, -8, -9];
// output: 432

// brute force approach
// TC - O(n^2) SC - O(1) gives TLE

var maxProductUsingLoop = function (nums) {
  // let ans = null;
  let ans = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let prod = nums[i];
    // if (ans == null || prod > ans) ans = prod;
    if (prod > ans) ans = prod;

    for (let j = i + 1; j < nums.length; j++) {
      prod *= nums[j];
      if (prod > ans) ans = prod;
    }
  }

  return ans;
};

// using prefix and suffix product
// based on observations
// 1. if all +ve numbers ans will be product of everyone
// 2. even -ves and rest +ve ans will be product of every number
// 3. odd -ve and rest +ve ans will be either product of its prefix or suffix of that one of element
// 4. if 0 then either product of prefix or suffix subarrays except 0 would be an ans
// TC - O(n) SC - O(1)
// const nums = [1, 0, -5, 2, 3, -8, -9];
var maxSubArrayProductInSinglePass = function (nums) {
  let prefix = 1;
  let suffix = 1;
  let ans = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    // incase of 0 reset the prefix and suffix product to 1
    if (prefix == 0) prefix = 1;
    if (suffix == 0) suffix = 1;

    prefix = prefix * nums[i];
    suffix = suffix * nums[nums.length - i - 1];
    ans = Math.max(ans, Math.max(prefix, suffix));
  }
  return ans;
};

// simplest solution - maintain max for +ve and min for -ve product
// compare with ans and store the mas prod value
// TC - O(n)  SC - O(1)
// beats 100%
var maxProductCleanerCode = function (nums) {
  let max = 1;
  let min = 1;
  let ans = -Infinity;

  for (let n of nums) {
    // given the new number, the new maximun can have 3 conditions
    // 1. number(+) * max(+) is the largest
    // 2. number(+) it self is the largest
    // 3. number(-) * min(-) is the largest
    max = Math.max(n * max, n, n * min);

    min = Math.min(n * min, n, n * max);

    ans = Math.max(ans, max);
  }

  return ans;
};

// TC - O(n)  SC - O(1)
// beats 100%
var maxProduct = function (nums) {
  // find the max element and store in ans
  // let ans = Math.max(...nums);
  // initialize min and max var to store max and min prod values
  // let curMax = 1,
  //   curMin = 1;

  // let prevMax = nums[0];
  let prevMax = 1;
  // let prevMin = nums[0];
  let prevMin = 1;
  // let ans = nums[0];
  let ans = -Infinity;

  for (let n of nums) {
    // let temp = curMax * n;

    // store max of current value, current value*min value, and currentvalue * max value
    // curMax = Math.max(temp, curMin * n, n);
    // store min value as negative value may become positive when multiplied by other negative
    // curMin = Math.min(temp, curMin * n, n);

    // store ans with max of ans and current max value

    // given the new number, the new maximun can have 3 conditions
    // 1. number(+) * prevMax(+) is the largest
    // 2. number(+) it self is the largest
    // 3. number(-) * prevMin(-) is the largest
    curMax = Math.max(n * prevMax, n, n * prevMin);

    curMin = Math.min(n * prevMin, n, n * prevMax);

    // updating the prevMax & prevMin, these two may swap locations
    prevMax = curMax;
    prevMin = curMin;
    ans = Math.max(ans, curMax);
  }

  return ans;
};

console.log(maxProduct(nums));
console.log(maxProductCleanerCode(nums));
console.log(maxProductUsingLoop(nums));
console.log(maxSubArrayProductInSinglePass(nums));
