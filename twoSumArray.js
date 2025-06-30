// InterView master 100 series
// leetcode easy #1 two sum

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

// const nums = [2, 7, 11, 15];
// const target = 9;
// o/p - [0,1]

const nums = [3, 2, 4];
const target = 6;
// o/p - [1,2]

// -------------------
// brute force approach
// TC - O(n^2) , SC - O(1)

const twoSumBF = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
};

// Brute force - naive approach for solution trying to use two pointers
//  Two pointers approach but only returns consecutive pairs of solution
// not work when solution is not present in consecutive position
// partial solution to problem half test case cleared

const twoSumBF2Ptr = (nums, target) => {
  let ptr1 = 0;
  let ptr2 = 1;

  // only return consecutive index
  for (let i = 0; i < nums.length; i++) {
    if (nums[ptr1] + nums[ptr2] == target) {
      return [ptr1, ptr2];
    }
    ptr1++;
    ptr2++;
  }

  while (ptr1 < nums.length && ptr2 < nums.length) {
    if (nums[ptr1] + nums[ptr2] == target) {
      return [ptr1, ptr2];
    }

    if (ptr2 == nums.length - 1) {
      ptr1++;
      ptr2 = ptr1 + 1;
      continue;
    }

    ptr2++;
  }
};

// Optimal Solution using hash map object
// use map object to check if the remaining difference value is present
// else add the element with its position in map and continue the same till the last element in array
// TC - O(n) as only iterate array once, SC - O(n) as create hash map object to store difference values

const twoSumUsingMapObject = (nums, target) => {
  const diffValueMap = {};

  for (let i = 0; i < nums.length; i++) {
    let value = nums[i];
    let remDiff = target - value;

    // check explicitly !=undefined as incase of 0 it will give false scenario
    // or can store the idx as key remDiff value as a value to handle this
    // if (diffValueMap[remDiff]) {
    if (diffValueMap[remDiff] != undefined) {
      let idx = diffValueMap[remDiff];

      //   return [i, idx];
      //   incase want to return exact sequence in ascending order.
      return [idx, i];
    } else {
      diffValueMap[value] = i;
    }
  }
  return [];
};

// optimal solution without using hash map to avoid SC
// use builtin indexOf method to check the diffrenece value is present
// TC - O(n) as indexOf method perfoem linear search, SC - O(1) as no extra memory is used

const twoSumWithoutMapObject = (nums, target) => {
  //   const diffValueMap = {};

  for (let i = 0; i < nums.length; i++) {
    let value = nums[i];
    let remDiff = target - value;
    // find index of the remDiff value in the nums array
    let idx = nums.indexOf(remDiff);

    // check if the idx is not same as current position to avoid using same element twice
    // also loop start with 0 so idx cannot be 0 as same element cannot be reused
    if (idx && idx != i) {
      //   return [i, idx];
      //   incase want to return exact sequence in ascending order.
      return [idx, i];
    }
  }
  return [];
};

// unique optimal solution using 2 pointer and sorting not the best but good
// TC - O(nlogn) [O(nlogn)+O(n)+O(n)] due to sorting, SC - O(n) to store the result and given Array

function twoSumUsingSortn2Ptr(nums, target) {
  // because sort directly operate on the array without making a copy so to store the the actual arrays
  // givenNums = nums wont work as only reference of the array is assigned using this
  const givenNums = [...nums];
  const sortedNums = nums.sort((a, b) => a - b); //O(nlogn)
  let frontPtr = 0;
  let backPtr = nums.length - 1;

  //   O(n)
  while (frontPtr < backPtr) {
    const sum = sortedNums[frontPtr] + sortedNums[backPtr];
    if (sum == target) {
      break;
    } else {
      if (sum > target) {
        backPtr--;
      } else {
        frontPtr++;
      }
    }
  }
  //   console.log(sortedNums[frontPtr]);
  //   console.log(sortedNums[backPtr]);
  //   console.log(sortedNums);
  //   console.log(givenNums);

  //   O(n)
  const result = [];
  for (let j = 0; j < givenNums.length; j++) {
    if (sortedNums[frontPtr] == givenNums[j]) {
      result.push(j);
    } else if (sortedNums[backPtr] == givenNums[j]) {
      result.push(j);
    }
  }
  return result;
}

// submited solution using hash map approach TC,SC - O(n)
var twoSum = function (nums, target) {
  // using mapObj

  const valueMap = {};

  for (let i = 0; i < nums.length; i++) {
    let value = nums[i];
    let remVal = target - value;

    if (valueMap[remVal] != undefined) {
      let idx = valueMap[remVal];
      return [i, idx];
    } else {
      valueMap[value] = i;
    }
  }
  return [];
};

console.log(twoSum(nums, target));
console.log(twoSumBF(nums, target));
console.log(twoSumBF2Ptr(nums, target));
console.log(twoSumUsingMapObject(nums, target));
console.log(twoSumWithoutMapObject(nums, target));
console.log(twoSumUsingSortn2Ptr(nums, target));
