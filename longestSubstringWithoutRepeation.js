// leetcode med #3 longest substring without repeation
// Given a string s,
// find the length of the longest substring without duplicate characters.

// const s = "jbpnbwwd";
// o/p - 4
const s = "abba";
// o/p - 2
// const s = " ";
// o/p - 1

// brute force approach using nested loops
// TC - O(n^2) SC - O(n)
// gives TLE
var lengthOfLongestSubstring = function (s) {
  let maxCount = 0;
  for (let i = 0; i < s.length; i++) {
    let ans = new Set();
    for (let j = i; j < s.length; j++) {
      if (ans.has(s.at(j))) {
        // console.log(ans);
        ans.clear();
        break;
        // beats 8% with break
      } else {
        ans.add(s.at(j));
      }

      maxCount = Math.max(maxCount, ans.size);
    }
  }

  return maxCount;
};

// using two pointers approach
// TC - O(n) SC - O(n)
// beats 22%
var lengthOfLongestSubstringUsingTwoPointer = function (s) {
  let maxCount = 0;
  const mapObj = {};
  let left = 0;
  let right = 0;

  while (left <= right && right < s.length) {
    let currCh = s[right];
    console.log(currCh, mapObj[currCh], right);

    if (mapObj[currCh] > -1) {
      if (mapObj[currCh] >= left) {
        left = mapObj[currCh] + 1;
      }
    }
    let count = right - left + 1;
    maxCount = Math.max(maxCount, count);
    console.log(maxCount, count);

    mapObj[currCh] = right;
    console.log(mapObj);
    console.log(s[right], right);
    right++;
  }

  return maxCount;
};

// beats 98%
var lengthOfLongestSubstring2 = function (s) {
  let res = 0;
  let lastOccurence = new Map();
  let l = 0;

  for (let r = 0; r < s.length; r++) {
    let c = s[r];
    if (lastOccurence.has(c)) {
      l = Math.max(l, lastOccurence.get(c) + 1);
    }
    lastOccurence.set(c, r);
    res = Math.max(res, r - l + 1);
  }

  return res;
};

console.log(lengthOfLongestSubstring(s));
console.log(lengthOfLongestSubstring2(s));
console.log(lengthOfLongestSubstringUsingTwoPointer(s));
// console.log(s[3]);
