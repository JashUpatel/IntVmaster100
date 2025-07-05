// leetcode med #53 MAximum Subarray
// Given an integer array nums, find the subarray with the largest sum,
//  and return its sum.

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// Output: 6

// brute force approach for max subarray sum
// TC O(n^2)  SC O(1) gives TLE
var maxSubArray = function (nums) {
  let ans = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    if (sum > ans) ans = sum;
    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];
      if (sum > ans) ans = sum;
    }
  }

  return ans;
};

// most unoptimal solution with TC O(n^3)

var maxSubArrayUsingLoops = function (nums) {
  let ans = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      let sum = 0;
      for (let k = i; k <= j; k++) {
        sum += nums[k];
        if (sum > ans) ans = sum;
      }
    }
  }

  return ans;
};

// using recursion approach for max subarray sum
// TC O(n^2)  SC O(n)
var maxSubArrayUsingRecursion = function (nums) {
  let ans = { maxSum: Number.MIN_SAFE_INTEGER };

  maxSubArrayRecursiveFunc(nums, ans, 0, 0);
  return ans.maxSum;
};

const maxSubArrayRecursiveFunc = (nums, ans, sum, idx) => {
  // base case
  if (idx < 0 || idx >= nums.length) return sum;

  if (sum > ans.maxSum) ans.maxSum = sum;

  for (let i = idx; i < nums.length; i++) {
    sum += maxSubArrayRecursiveFunc(nums, ans, sum + nums[i], idx + 1);
    sum += maxSubArrayRecursiveFunc(nums, ans, sum + nums[i], idx - 1);
  }
};

// kadane's algorithm
// 1 . "I’ll use Kadane’s Algorithm. We’ll track current_sum and max_sum."
// 2 . "At each step, we add the current number to current_sum."
// 3 . "If current_sum exceeds max_sum, we update max_sum."
// 4 . "If current_sum goes negative, we reset it to 0."
// TC - O(n)  SC - O(1)
var maxSubArrayInSinglePass = function (nums) {
  let maxSum = -Infinity;
  let currentSum = 0;

  // incase print sub array
  let ansStart = 0;
  let ansEnd = 0;
  let start = 0;
  for (const num of nums) {
    // using for loop with index will be better when want to print subarray
    // as there can be duplicates in given array and storing pos using indexOf can be misleading
    // store the index of starting position
    // sum will always be 0 during start of sub array
    if (currentSum == 0) {
      console.log(nums.indexOf(num), num);
      start = nums.indexOf(num); //start = i
    }

    currentSum += num;

    if (currentSum > maxSum) {
      maxSum = currentSum;
      // console.log(
      //   nums.indexOf(num),
      //   num,
      //   nums.slice(start),
      //   nums.slice(start).indexOf(num)
      // );

      // store the index when save the max sum
      ansEnd = start + nums.slice(start).indexOf(num); //ansEnd = i
      ansStart = start; //ansStart = start
      // will save when curr sum again become 0 in case in futute sub array
      // and start gets resets
    }

    if (currentSum < 0) {
      currentSum = 0;
    }
  }

  // return maxSum;
  return nums.slice(ansStart, ansEnd + 1); //to return array
};

var maxSubArrayInSinglePass2 = function (nums) {
  let maxSum = nums[0];
  let currSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (currSum + nums[i] > nums[i]) {
      currSum = currSum + nums[i];
    } else {
      currSum = nums[i];
    }

    if (currSum > maxSum) {
      maxSum = currSum;
    }
  }

  return maxSum;
};

// console.log(maxSubArray(nums));
// console.log(maxSubArrayUsingLoops(nums));
console.log(maxSubArrayInSinglePass(nums));
// console.log(maxSubArrayInSinglePass2(nums));
// console.log(maxSubArrayUsingRecursion(nums));
