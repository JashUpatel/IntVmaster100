// leetcode med #424 longest repeating vharacter replacement
// You are given a string s and an integer k.
// You can choose any character of the string and
// change it to any other uppercase English character.
//  You can perform this operation at most k times.
// Return the length of the longest substring containing the same letter
//  you can get after performing the above operations.

// const s = "ABBB";
// const k = 2;
// o/p - 4

// const s = "ABAA";
// const k = 0;
// o/p - 2

const s =
  "IMNJJTRMJEGMSOLSCCQICIHLQIOGBJAEHQOCRAJQMBIBATGLJDTBNCPIFRDLRIJHRABBJGQAOLIKRLHDRIGERENNMJSDSSMESSTR";

const k = 2;
// o/p - 5

// brute force approach missing edge cases for whatsoever reason
var characterReplacement = function (s, k) {
  let maxCount = 1;
  for (let i = 0; i < s.length; i++) {
    let count = 0;
    let rep = k;
    for (let j = 0; j < s.length; j++) {
      //   console.log(s[i], s[j]);
      if (s[i] != s[j]) {
        if (rep > 0) {
          count++;
          rep--;
          //   console.log(rep);
        } else {
          count = 0;
          rep = k;
          continue;
        }
      } else {
        count++;
      }
      //   console.log(maxCount, count);
      maxCount = Math.max(maxCount, count);
    }
  }

  return maxCount;
};

// bruteforce by ai
// works fine gives TLE
var characterReplacementBF = function (s, k) {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    let count = new Array(26).fill(0);
    let maxCount = 0;
    for (let j = i; j < s.length; j++) {
      count[s.charCodeAt(j) - 65]++;
      maxCount = Math.max(maxCount, count[s.charCodeAt(j) - 65]);
      let windowLen = j - i + 1;
      // replacements needed = windowLen - maxCount
      if (windowLen - maxCount <= k) {
        maxLen = Math.max(maxLen, windowLen);
      }
    }
  }
  return maxLen;
};

// sliding window approach
// optimal solution

var characterReplacementUsingSW = function (s, k) {
  let freqs = {};
  let res = 0,
    i = 0,
    maxFreq = 0;

  for (let j = 0; j < s.length; j++) {
    freqs[s[j]] = (freqs[s[j]] || 0) + 1;
    maxFreq = Math.max(maxFreq, freqs[s[j]]);

    while (j - i + 1 - maxFreq > k) {
      freqs[s[i]] -= 1;
      i++;
    }

    res = Math.max(res, j - i + 1);
  }

  return res;
};

console.log(characterReplacement(s, k));
console.log(characterReplacementBF(s, k));
console.log(characterReplacementUsingSW(s, k));
