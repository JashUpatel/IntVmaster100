// leetcode med #15 3sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
// such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

// const nums = [-1, 0, 1, 2, -1, -4];
// Output: [[-1,-1,2],[-1,0,1]]
// const nums = [0, 0, 0, 0];
// o/p [0.0,0]
// const nums = [-1, 0, 1, 0];
// o/p = [[-1,0,1]]

const nums = [2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4, 5, 5, -10];
// o/p - [[-10,5,5],[-5,0,5],[-4,2,2],[-3,-2,5],[-3,1,2],[-2,0,2]]

// brute force using while
// missies some cases
var threeSum = function (nums) {
  const ans = new Set();
  let ptr1 = 0;
  let ptr2 = 1;
  let ptr3 = 2;

  while (
    ptr1 < nums.length - 2 &&
    ptr2 < nums.length - 1 &&
    ptr3 < nums.length
  ) {
    if (nums[ptr1] + nums[ptr2] + nums[ptr3] == 0) {
      const temp = JSON.stringify(
        [nums[ptr1], nums[ptr2], nums[ptr3]].sort((a, b) => a - b)
      );

      ans.add(temp);
    }

    if (ptr3 == nums.length - 1) {
      ptr2++;
      ptr3 = ptr2 + 1;
    } else if (ptr2 == nums.length - 2) {
      ptr1++;
      ptr2 = ptr1 + 1;
      ptr3 = ptr2 + 1;
    } else {
      ptr3++;
    }
  }

  return Array.from(ans).map((el) => JSON.parse(el));
};

// Brute force approach using loops
// TC - O(n^3) [sorting for 3 element is nearly in constant time] SC - O(n)
// give TLE

const ThreeSumUsingLoops = (nums) => {
  const ans = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] == 0) {
          ans.add(
            JSON.stringify([nums[i], nums[j], nums[k]].sort((a, b) => a - b))
          );
        }
      }
    }
  }

  return [...ans].map((el) => JSON.parse(el));
};

// better approach using loops
// TC - O(n^2) SC - O(n)+O(n)=2*O(n)
// gives TLE
const threeSumUsingLoop2 = (nums) => {
  const ans = new Set();

  for (let i = 0; i < nums.length; i++) {
    const mapObj = {};
    for (let j = i + 1; j < nums.length; j++) {
      let remSum = -(nums[i] + nums[j]);
      if (mapObj[remSum]) {
        ans.add(
          JSON.stringify([nums[i], nums[j], remSum].sort((a, b) => a - b))
        );
      } else {
        mapObj[nums[j]] = j;
      }
    }
  }

  return [...ans].map((el) => JSON.parse(el));
};

// most optimal solution using two pointers approach
// TC - O(nlogn)[sorting] + O(n^2)[loops] = O(n^2)  SC - O(1)
// beats 77%
const threeSumUsing2Pointers = (nums) => {
  const ans = [];
  // can be array as nums will be sorted so we get unique ans each time

  // use this check beat 87%
  if (nums.length < 3) {
    return answer;
  }

  // sort the array to apply two pointer approach
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    // use this check to beat 97%
    if (nums[i] > 0) {
      break;
    }
    // check if element is > 0 so sum would also be > 0 as array is sorted so continue
    // also if element is same as prev element will give same result so continue we only need unique
    if (i > 0 && nums[i] == nums[i - 1]) continue;

    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      // if sum < 0 move toward increased value if > 0 move toward smaller value
      if (sum < 0) {
        j++;
      } else if (sum > 0) {
        k--;
      } else {
        ans.push([nums[i], nums[j], nums[k]]);
        j++;
        k--;
        // already doing one move from both side and then using loop to compare and check
        // the previous values to continue moving the reason is if we directly apply loop to move
        // the k would have last position and will check for k+1 will result in error
        // there wont be same issue for j as j is already start from 1

        // continue moving untill find unique element and not same as prev
        while (j < k && nums[j] == nums[j - 1]) j++;
        while (j < k && nums[k] == nums[k + 1]) k--;
      }
    }
  }

  return ans;
};

console.log(threeSum(nums));
console.log(ThreeSumUsingLoops(nums));
console.log(threeSumUsingLoop2(nums));
console.log(threeSumUsing2Pointers(nums));
