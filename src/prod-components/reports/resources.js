'use client';
import moment from 'moment';
import * as yup from 'yup';

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

/* ================================ */
/* =======  MONTHLY REPORT  ======= */
/* ================================ */

export const MONTHLY_REPORT_HEADER = [
  { display: 'Date', name: 'day' },
  { display: 'Capital', name: 'capital' },
  { display: 'Withdrawal', name: 'withdrawal' },
  { display: 'Sales', name: 'sales' },
  { display: 'Expenses', name: 'expenses' },
  { display: 'Profit', name: 'profit' },
  { display: 'Total', name: 'total' },
];

export const INPUT = [
  { type: 'date', name: 'date', label: 'Date' },
  { type: 'number', name: 'capital', label: 'Capital' },
  { type: 'number', name: 'withdrawal', label: 'Withdrawal' },
  { type: 'number', name: 'sales', label: 'Sales' },
  { type: 'number', name: 'expenses', label: 'Expenses' },
];

export const SCHEMA = yup.object().shape({
  date: yup.string().required('Report date is required'),
  capital: yup.number().required('Set to 0 if blank'),
  withdrawal: yup.number().required('Set to 0 if blank'),
  sales: yup.number().required('Set to 0 if blank'),
  expenses: yup.number().required('Set to 0 if blank'),
});

export const DEFAULT = {
  date: moment(),
  capital: 0,
  withdrawal: 0,
  sales: 0,
  expenses: 0,
};

export const getReportSummary = (data) => {
  let totalSales = 0;
  let totalExpenses = 0;
  let totalCapital = 0;
  let totalWithdrawal = 0;

  let list = [];
  data.forEach((item) => {
    totalSales = totalSales + item.sales;
    totalExpenses = totalExpenses + item.expenses;
    totalCapital = totalCapital + item.capital;
    totalWithdrawal = totalWithdrawal + item.withdrawal;
    let profit = item.sales - item.expenses;
    let total = item.sales + item.capital - item.expenses - item.withdrawal;
    list.push({
      _id: item._id,
      date: item.date,
      day: moment(item.date).format('DD'),
      capital: item.capital === 0 ? ' ' : item.capital.toLocaleString('en'),
      withdrawal: item.withdrawal === 0 ? ' ' : item.withdrawal.toLocaleString('en'),
      sales: item.sales === 0 ? ' ' : item.sales.toLocaleString('en'),
      expenses: item.expenses === 0 ? ' ' : item.expenses.toLocaleString('en'),
      profit: profit === 0 ? ' ' : profit.toLocaleString('en'),
      total: total === 0 ? ' ' : total.toLocaleString('en'),
    });
  });

  let totalProfit = totalSales - totalExpenses;
  let averageSales = totalSales / data?.length;
  let averageExpenses = totalExpenses / data?.length;
  let averageProfit = (totalSales - totalExpenses) / data.length;
  return { totalSales, totalExpenses, totalProfit, averageSales, averageExpenses, averageProfit, totalCapital, totalWithdrawal, list };
};
