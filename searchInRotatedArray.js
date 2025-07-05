// leetcode med #33 search target in rotated array

const nums = [4, 5, 6, 7, 0, 1, 2];
// let target = 0;
let target = 1;
// let target = 3;
// let target = 4;
// Output: 4
// o/p - 3

// const nums = [1, 3];
// const target = 3;
// brute force approach linear search
// TC - O(n) SC - O(1) beats 100%???
var search = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == target) return i;
  }

  return -1;
};

// using binary search
// identify the sorted half
// either left side would be sorted or right side would be sorted
//
// TC - O(logn)  SC - O(1)
var binarySearch = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // left side is sorted
    if (nums[start] <= nums[mid]) {
      // check if target is present in this half or eliminate it
      if (nums[start] <= target && target < nums[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      // right side sorted
      // check if target is present in this half or eliminate it

      if (nums[mid] < target && target <= nums[end]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};

// using binary search
// TC - O(logn)  SC - O(1)
// not handling edge cases
var binarySearch2 = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (nums[mid] == target) return mid;

    // handling negative index position
    if (mid < nums.length - 1 && nums[mid + 1] == target) {
      return mid + 1;
    }

    // handling greater than length index position
    if (mid > 0 && nums[mid - 1] == target) {
      return mid - 1;
    }

    if (nums[mid] > target) {
      end = mid - 2;
    } else {
      start = mid + 2;
    }

    // mid = parseInt((start + end) / 2);
  }
  return -1;
};

console.log(search(nums, target));
console.log(binarySearch(nums, target));
// console.log(binarySearch2(nums, target));
