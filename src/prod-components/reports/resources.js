'use client';

export const SALES_COUNT_HEADER = [
  { display: 'Item', name: 'itemName' },
  { display: 'Size', name: 'size' },
  { display: 'Price', name: 'price' },
  { display: 'Qty', name: 'qty' },
  { display: 'Total', name: 'subTotal' },
];

export const EXPENSES_HEADER = [
  { display: 'Item', name: 'item' },
  { display: 'Price', name: 'price' },
  { display: 'Qty', name: 'qty' },
  { display: 'Total', name: 'total' },
];

export const SUMMARY_HEADER = [
  { display: '', name: 'source' },
  { display: 'Cash', name: 'cash' },
  { display: 'G-cash', name: 'gcash' },
  { display: 'Total', name: 'total' },
];

export const getExpenseSummary = (expenses) => {
  let cash = 0;
  let gcash = 0;
  let total = 0;
  expenses?.forEach((expense) => {
    if (expense.isGcash) {
      gcash = gcash + expense.total;
    } else {
      cash = cash + expense.total;
    }
    total = total + expense.total;
  });
  return { cash, gcash, total };
};

export const getFinalReportData = (salesSummary, expensesSummary, otherSalesData) => {
  let tempData = [
    { source: 'Sales', cash: salesSummary?.cashTotal, gcash: salesSummary?.gCashTotal, total: salesSummary?.dailyTotal },

    {
      source: 'Down Payment',
      cash: otherSalesData?.downPayment?.cash,
      gcash: otherSalesData?.downPayment?.gcash,
      total: otherSalesData?.downPayment?.total,
    },
    {
      source: 'Delivery',
      cash: otherSalesData?.deliveryCharge?.cash,
      gcash: otherSalesData?.deliveryCharge?.gcash,
      total: otherSalesData?.deliveryCharge?.total,
    },

    { source: 'Expenses', cash: expensesSummary?.cash, gcash: expensesSummary?.gcash, total: expensesSummary?.total },
    {
      source: 'Discount',
      cash: otherSalesData?.discount?.cash,
      gcash: otherSalesData?.discount?.gcash,
      total: otherSalesData?.discount?.total,
    },
    {
      source: 'Total',
      cash:
        salesSummary?.cashTotal +
        otherSalesData?.downPayment?.cash +
        otherSalesData?.deliveryCharge?.cash -
        expensesSummary?.cash -
        otherSalesData?.discount?.cash,
      gcash:
        salesSummary?.gCashTotal +
        otherSalesData?.downPayment?.gcash +
        otherSalesData?.deliveryCharge?.gcash -
        expensesSummary?.gcash -
        otherSalesData?.discount?.gcash,
      total:
        salesSummary?.dailyTotal +
        otherSalesData?.downPayment?.total +
        otherSalesData?.deliveryCharge?.total -
        expensesSummary?.total -
        otherSalesData?.discount?.total,
    },
  ];
  return tempData;
};

export const getOtherSalesData = (sales) => {
  let discount = { cash: 0, gcash: 0 };
  let deliveryCharge = { cash: 0, gcash: 0 };
  let downPayment = { cash: 0, gcash: 0 };

  sales.forEach((order) => {
    if (order.isGcash) {
      if (order.downPayment) downPayment = { cash: downPayment.cash, gcash: downPayment.gcash + order.downPayment };
      if (order.discount) discount = { cash: discount.cash, gcash: discount.gcash + order.discount };
      if (order.deliveryCharge) deliveryCharge = { cash: deliveryCharge.cash, gcash: deliveryCharge.gcash + order.downPayment };
    } else {
      if (order.downPayment) downPayment = { gcash: downPayment.gcash, cash: downPayment.cash + order.downPayment };
      if (order.discount) discount = { gcash: discount.gcash, cash: discount.cash + order.discount };
      if (order.deliveryCharge) deliveryCharge = { gcash: deliveryCharge.gcash, cash: deliveryCharge.cash + order.deliveryCharge };
    }
  });

  let otherSalesData = {
    discount: { ...discount, total: discount.cash + discount.gcash },
    deliveryCharge: { ...deliveryCharge, total: deliveryCharge.cash + deliveryCharge.gcash },
    downPayment: { ...downPayment, total: downPayment.cash + deliveryCharge.gcash },
  };
  return otherSalesData;
};

export const getSalesData = (sales) => {
  let cash = 0;
  let gCash = 0;
  sales?.forEach((order) => {
    if (order.isPaid) {
      order.orderDetails.items.forEach((item) => {
        if (order.isGcash) gCash = gCash + item.subTotal;
        if (!order.isGcash) cash = cash + item.subTotal;
      });
    }
  });

  let finalData = { cashTotal: cash, gCashTotal: gCash, dailyTotal: cash + gCash };
  return finalData;
};

export const getSalesCount = (sales) => {
  let tempArray = [];
  let summary = {};
  sales?.forEach((order) => {
    if (order.isPaid) {
      order.orderDetails.items.forEach((item) => {
        if (summary[item._id]) {
          summary[item._id] = {
            ...item,
            qty: summary[item._id].qty + item.qty,
            subTotal: (summary[item._id].qty + item.qty) * item.price,
          };
        } else {
          summary[item._id] = item;
        }
      });
    }
  });

  let keys = Object.keys(summary);
  keys.forEach((key) => {
    tempArray.push(summary[key]);
  });

  tempArray = tempArray.sort((a, b) => b.subTotal - a.subTotal);
  return tempArray;
};
