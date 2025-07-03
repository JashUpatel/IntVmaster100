// leetcode easy #217 contains duplicate
// Given an integer array nums, return true if any value appears at least twice in the array,
// and return false if every element is distinct.

const nums = [1, 2, 3, 1];

// brute force using loops and compare each element
// TC - O(n^2)  SC - O(1)
var containsDuplicateUsingLoops = function (nums) {
  // brute force approach

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] == nums[j]) return true;
    }
  }

  return false;
};

// approach using sorting
// TC - O(n)+O(nlogn) = O(nlogn)  SC - O(n)
// beats 11%
var containsDuplicate = function (nums) {
  // brute force approach
  // using sorting
  const sortedNums = nums.sort((a, b) => a - b);
  // O(nlogn)

  for (let i = 1; i < sortedNums.length; i++) {
    if (sortedNums[i] == sortedNums[i - 1]) return true;
  }

  return false;
};

// using map object
// TC - O(n) SC - O(n); beats 23%
const containsDuplicateUsingMap = (nums) => {
  // using map object
  const numMap = {};

  for (let i = 0; i < nums.length; i++) {
    if (numMap[nums[i]]) return true;

    numMap[nums[i]] = true;
  }

  return false;
};

// TC - O(n) SC - O(n)
var containsDuplicateUsingSet = function (nums) {
  const numSet = new Set(nums);

  return numSet.size != nums.length;
};

// beats 69%
var containsDuplicateUsingSet = function (nums) {
  const numSet = new Set();

  for (let i of nums) {
    if (numSet.has(i)) return true;

    numSet.add(i);
  }

  return false;
};

// using concept of Linked List
// by find loop in LL we can find duplicate element
// dont understad the logic
// most optimal
// TC - O(n)  SC - O(1)
var containsDuplicateUsingLL = function (nums) {
  let slow = 0;
  let fast = 0;

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow != fast);

  slow = 0;
  while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
};

console.log(containsDuplicate(nums));
console.log(containsDuplicateUsingMap(nums));
console.log(containsDuplicateUsingLoops(nums));
console.log(containsDuplicateUsingLL(nums));
