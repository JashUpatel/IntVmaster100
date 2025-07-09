// leetcode med #11 container with most water
// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
//
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
// Return the maximum amount of water a container can store.
// Notice that you may not slant the container.

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
// Output: 49

// const height = [1,1]
// Output: 1

// brute force approach
var maxAreaUsingLoops = function (height) {
  let maxArea = -1;

  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let width = j - i;

      let area = Math.min(height[j], height[i]) * width;

      maxArea = Math.max(area, maxArea);
    }
  }
  return maxArea;
};

// two pointers optimal approach
// TC - O(n)  SC - O(1) beats 55%
var maxArea = function (height) {
  let maxArea = -1;

  let start = 0;
  let end = height.length - 1;

  while (start < end) {
    let width = end - start;

    let area = Math.min(height[start], height[end]) * width;

    maxArea = Math.max(area, maxArea);

    if (height[start] < height[end]) start++;
    else end--;
  }

  return maxArea;
};

console.log(maxArea(height));
console.log(maxAreaUsingLoops(height));
