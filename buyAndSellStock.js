// leetcode easy #121

// const prices = [2, 1, 2, 1, 0, 1, 2];

const prices = [3, 3, 5, 0, 0, 3, 1, 4];

// brute force approach
// iterate over each element and store min and max price value
// TC - O(n) SC - O(1) beats 65%
var maxProfit = function (prices) {
  let minPrice = Number.MAX_SAFE_INTEGER;
  //   maxPrize unnecesaary in calculation
  //   let maxPrice = Number.MIN_SAFE_INTEGER;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    // console.log(prices[i]);

    if (prices[i] < minPrice) {
      minPrice = prices[i];
      //   console.log("minPrice", minPrice);
    }

    // prices[i]>maxPrice is unnecassary when we are checking maxProfit
    // as well it will give incorrect result when big number appear first
    if (prices[i] - minPrice > maxProfit) {
      //   maxPrice = prices[i];
      maxProfit = prices[i] - minPrice;
      //   console.log(maxPrice, maxProfit);
    }

    // console.log("maxPR", maxProfit);
  }

  return maxProfit;
};

// sliding window approach with two pointer
// using two pointer to find minPrice and maxProfit
// TC - O(n)  SC - o(1) beats 83%
var maxProfitUsingPtr = function (prices) {
  let minPrice = Number.MAX_SAFE_INTEGER;
  let maxPrice = Number.MIN_SAFE_INTEGER;
  let maxProfit = 0;

  let i = 0;
  let j = 1;
  while (i < prices.length && j < prices.length) {
    // console.log(prices[i], prices[j]);

    // if (prices[i] > prices[j]) {
    //   //   console.log("if");
    //   i = j;
    //   j++;
    //   continue;
    // } else {
    //   if (prices[i] < minPrice) {
    //     minPrice = prices[i];
    //     // console.log("minPrice");
    //   }
    //   if (prices[j] < minPrice) {
    //     i = j;
    //     // console.log("j<i");
    //   }
    //   if (prices[j] - prices[i] > maxProfit) {
    //     maxProfit = prices[j] - prices[i];
    //     maxPrice = prices[j];
    //     // console.log("maxPrice", maxPrice);
    //   }
    //   j++;
    // }

    // this condition also works but strangely it beats only 36%
    // if (prices[i] < minPrice) {
    //     minPrice = prices[i];
    //   }
    //   if (prices[i] > prices[j] || prices[j] < minPrice) {
    //     i = j;
    //   }
    //   if (prices[j] - prices[i] > maxProfit) {
    //     maxProfit = prices[j] - prices[i];
    //     maxPrice = prices[j];
    //   }
    //   j++;

    if (prices[i] < prices[j]) {
      maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
    } else {
      i = j;
    }
    j++;

    // console.log("minPrice", minPrice);

    // console.log("maxPR", maxProfit);
  }

  return maxProfit;
};

// unique approach and simple
// TC - O(n)  SC O(1) but beats 61% with else beats 83%
var maxProfitUsingLoop = function (prices) {
  let buyPrice = prices[0];
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    // if (buyPrice > prices[i]) {
    //   buyPrice = prices[i];
    // }

    // profit = Math.max(profit, prices[i] - buyPrice);

    // if (buyPrice > prices[i]) {
    //   buyPrice = prices[i];
    // } else {
    //   profit = Math.max(profit, prices[i] - buyPrice);
    // }

    // can simply be done like this beats 96%
    buyPrice = Math.min(buyPrice, prices[i]);
    profit = Math.max(profit, prices[i] - buyPrice);
  }

  return profit;
};

// using recursion approach but not recommended for optimal
// TC O(n) SC O(n)

const maxProfitFinderRecursiveFunc = (prices, order, pos) => {
  // base case
  if (pos == prices.length) return;

  // solution check
  //   console.log(order.minPrice + "-->" + prices[pos]);
  if (order.minPrice > prices[pos]) order.minPrice = prices[pos];
  //   console.log(order.profit + "-->" + (prices[pos] - order.minPrice));

  if (order.profit < prices[pos] - order.minPrice)
    order.profit = prices[pos] - order.minPrice;

  //   console.log(order);
  maxProfitFinderRecursiveFunc(prices, order, pos + 1);
};

var maxProfit = (prices) => {
  const order = { profit: 0, minPrice: Number.MAX_SAFE_INTEGER, maxPrice: 0 };

  maxProfitFinderRecursiveFunc(prices, order, 0);

  return order.profit;
};

console.log(maxProfit(prices));
console.log(maxProfitUsingPtr(prices));
