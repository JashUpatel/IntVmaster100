// leetcode med #153 find minimum in rotated sorted array

// Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
// For example, the array nums = [0,1,2,4,5,6,7] might become:
// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times

// const nums = [3, 4, 5, 1, 2];
// Output: 1

const nums = [11, 13, 15, 17];
// Output: 11

// most obvious approach
// sort the array and get the first element that is the minimum of all
// TC - O(nlogn) for sorting SC - O(1) not storing additional array
// beat only 5%
const minimumInRotatedArayUsingSort = (nums) => nums.sort((a, b) => a - b)[0];

// using brute force linear search
// TC - O(n)  SC - O(1)
// beats 4% then 100% ????
const minimumInRotatedArayUsingSearch = (nums) => {
  let mini = Number.MAX_SAFE_INTEGER;
  for (let n of nums) {
    if (n < mini) mini = n;
  }

  return mini;
};

// using binary search
// find the lowest value in sorted array store it and eliminate it
// then move in other direction do the same
// TC - O(logn)
// const nums = [3, 4, 5, 1, 2];
const minimumInRotatedArayUsingBS = (nums) => {
  let mini = Number.MAX_SAFE_INTEGER;

  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    // console.log(start, end, mid, nums[mid], mini);

    // further optimization in BS
    // when the array is sorted low will be at start only no further check required
    if (nums[start] <= nums[end]) {
      mini = Math.min(mini, nums[start]);
      break;
    }

    // if subarray from start to mid is sorted
    // min would be at start, store and move in next direction
    if (nums[start] <= nums[mid]) {
      mini = Math.min(mini, nums[start]);
      start = mid + 1;
    } else {
      mini = Math.min(mini, nums[mid]);
      end = mid - 1;
    }
  }

  return mini;
  //   return nums[start];
};

// using binary search
// TC - O(logn) SC - O(1);
// beats 100%
var findMin = function (nums) {
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (nums[mid] <= nums[end]) {
      end = mid;
    } else {
      start = mid + 1;
    }
  }

  return nums[start];
};

console.log(minimumInRotatedArayUsingSort(nums));
console.log(minimumInRotatedArayUsingSearch(nums));
console.log(minimumInRotatedArayUsingBS(nums));
console.log(findMin(nums));
