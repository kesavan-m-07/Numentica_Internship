/*
3. You’re given an array of transaction objects:

[
  { id: "t1", userId: 101, category: "food",   amount: 120.5,  currency: "INR", ts: "2025-08-01T09:10:00Z" },
  { id: "t2", userId: 101, category: "travel", amount:  80.00, currency: "INR", ts: "2025-08-02T14:33:00Z" },
  { id: "t3", userId: 102, category: "food",   amount:  60.00, currency: "INR", ts: "2025-08-02T07:05:00Z" },
  { id: "t4", userId: 101, category: "food",   amount: -20.00, currency: "INR", ts: "2025-08-03T10:00:00Z" } // refund
]
Return a summary grouped by by (default "userId"), with:
totalAmount (sum of amounts across all categories),
byCategory (object of category → sum),
count (number of transactions),
lastTransactionAt (ISO string of latest ts),
Sorted by totalAmount descending, then by ascending.
*/

const transactions = [
  {
    id: "t3",
    userId: 102,
    category: "food",
    amount: 60.0,
    currency: "INR",
    ts: "2025-08-02T07:05:00Z",
  },
  {
    id: "t3",
    userId: 102,
    category: "meals",
    undefined: 60.0,
    currency: "INR",
    ts: "2025-08-02T07:05:00Z",
  },
  {
    id: "t3",
    userId: 102,
    null: "Food",
    amount: 80.0,
    currency: "INR",
    ts: "2025-08-02T07:05:00Z",
  },
  {
    id: "t1",
    userId: 101,
    category: "food",
    amount: 120.5,
    currency: "INR",
    ts: "2025-08-01T09:10:00Z",
  },
  {
    id: "t2",
    userId: 101,
    category: "travel",
    Amount: 80.0,
    currency: "INR",
    ts: "2025-08-02T14:33:00Z",
  },

  {
    id: "t4",
    userId: 101,
    category: "food",
    amount: -20.0,
    currency: "EUR",
    ts: "2025-08-03T10:00:00Z",
  }, // refund
];

//Selection Sort
const sortSummaries = function (summaries) {
  const sortedSummaries = [...summaries];
  for (let i = 0; i < sortedSummaries.length; i++) {
    let maxTransaction = sortedSummaries[0];
    let maxIndex = 0;
    const firstAmount = maxTransaction["totalAmount"];
    const last = sortedSummaries.length - 1 - i;
    
    for (let j = 1; j <= last; j++) {
      const secondTransaction = sortedSummaries[j];
      const secondAmount = secondTransaction["totalAmount"];
      if (secondAmount < firstAmount) {
        maxTransaction = secondTransaction;
        maxIndex = j;
      }
    }
    const temporaryTransactionHolder = sortedSummaries[last];
    sortedSummaries[last] = sortedSummaries[maxIndex];
    sortedSummaries[maxIndex] = temporaryTransactionHolder;
  }
  return sortedSummaries;
};

const generateSummary = function (transactions) {
  if (!Array.isArray(transactions)) {
    console.error("Invalid Input..");
    return;
  }
  if (transactions.length === 0) return [];

  const transactionMap = {}; //To Combine transaction based on the userID
  let summaries = []; //To Hold the final summaries

  transactions?.forEach((transaction) => {
    const userId = transaction?.userId;
    if (!userId) return;
    if (!transactionMap[userId]) transactionMap[userId] = [];
    const existingTransaction = transactionMap[userId];
    existingTransaction.push(transaction);
  });


  for (let [userId, transactions] of Object.entries(transactionMap)) {
    if (transactions.length === 0) continue;

    let totalAmount = 0;
    let byCategory = {};
    let lastTransactionAt;
    let currency;

    transactions?.forEach((transaction) => {

      const amount = transaction?.amount;
      const lastTransaction = transaction?.ts;
      let currentCurrency = transaction?.currency;
      let category = transaction?.category;

      if(typeof amount !== 'number' || typeof lastTransaction !== 'string' || typeof currentCurrency !== 'string' || typeof category !== 'string')return; //Avoid the null or undefined
      category = category.trim().toLowerCase();
      currentCurrency = currentCurrency.trim().toUpperCase();
      totalAmount += amount;
      byCategory = {
        ...byCategory,  //Spread opeartor
        [category]: (byCategory[category] || 0) + amount, //Creates key it not there unless add the amount to it
      };

      if (!lastTransactionAt) {
        lastTransactionAt = lastTransaction;
        currency = currentCurrency;
      } else if (lastTransactionAt <= lastTransaction) { //To Select the latest transaction
        currency = currentCurrency;
        lastTransactionAt = lastTransaction;
      }
    });
    const summary = {userId,totalAmount,byCategory,count:transactions.length,lastTransactionAt,currency}
    summaries.push(summary); // push current summary to overall summaries
  }

  return sortSummaries(summaries); //Return the sorted summaries
};

const summary = generateSummary(transactions);
console.log("Summaries: ",summary);
