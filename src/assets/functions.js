import moment from 'moment';

import styles from './functions.module.css';

export const getSalesCount = (sales, calendarDate) => {
  let tempArray = [];
  let summary = {};
  sales?.forEach((order) => {
    if (order.isPaid && moment(order.paymentDate).format('YYYY-MM-DD') === moment(calendarDate).format('YYYY-MM-DD')) {
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

export const getSalesData = (sales, calendarDate) => {
  let downPayment = 0;
  let cash = 0;
  let gCash = 0;
  sales?.forEach((order) => {
    if (order.isPaid && moment(order.paymentDate).format('YYYY-MM-DD') === moment(calendarDate).format('YYYY-MM-DD')) {
      if (order.isGcash) gCash = gCash + order.total;
      if (!order.isGcash) cash = cash + order.total;
    }

    if (order.isDownPayment && moment(order.downPaymentDate).format('YYYY-MM-DD') === moment(calendarDate).format('YYYY-MM-DD')) {
      downPayment = downPayment + order.downPayment;
    }
  });

  let finalData = { cashTotal: cash, gCashTotal: gCash, dpTotal: downPayment, dailyTotal: cash + gCash + downPayment };
  return finalData;
};

export const getCollectibles = (sales) => {
  let tempFile = {};
  let collectibles = [];

  sales?.forEach((order) => {
    if (order.isDelivered && !order.isPaid) {
      if (tempFile[order.orderDetails.customer.name]) {
        tempFile[order.orderDetails.customer.name] = {
          name: order.orderDetails.customer.name,
          amount: order.total + tempFile[order.orderDetails.customer.name].amount,
        };
      } else {
        tempFile[order.orderDetails.customer.name] = { name: order.orderDetails.customer.name, amount: order.total };
      }
    }
  });

  let keys = Object.keys(tempFile);
  keys.forEach((key) => {
    collectibles.push(tempFile[key]);
  });

  return collectibles;
};

export const getOtherSalesData = (sales, date) => {
  let discount = { cash: 0, gcash: 0 };
  let deliveryCharge = { cash: 0, gcash: 0 };
  let downPayment = { cash: 0, gcash: 0 };

  sales.forEach((order) => {
    if (order.isGcash) {
      if (order.downPayment && moment(order.downPaymentDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
        downPayment = { cash: downPayment.cash, gcash: downPayment.gcash + order.downPayment };
      if (order.discount) discount = { cash: discount.cash, gcash: discount.gcash + order.discount };
      if (order.deliveryCharge) deliveryCharge = { cash: deliveryCharge.cash, gcash: deliveryCharge.gcash + order.downPayment };
    } else {
      if (order.downPayment && moment(order.downPaymentDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
        downPayment = { gcash: downPayment.gcash, cash: downPayment.cash + order.downPayment };
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

export const getReportSummary = (data) => {
  let totalSales = 0;
  let totalExpenses = 0;
  let totalCapital = 0;
  let totalWithdrawal = 0;
  let salesCount = 0;
  let expenseCount = 0;

  let list = [];
  data.forEach((item) => {
    item.sales !== 0 && salesCount++;
    item.expense !== 0 && expenseCount++;
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
  let averageSales = totalSales / salesCount;
  let averageExpenses = totalExpenses / expenseCount;
  let averageProfit = (totalSales - totalExpenses) / salesCount;
  return { totalSales, totalExpenses, totalProfit, averageSales, averageExpenses, averageProfit, totalCapital, totalWithdrawal, list };
};

export const getStatusColor = (data) => {
  if (data && !data.isPaid && data.isDelivered && data.isGcash) return styles.red;
  if (data && !data.isPaid && data.isDelivered && !data.isGcash) return styles.purple;
  if (data && data.isPaid && !data.isDelivered && !data.isGcash) return styles.turquoise;
  if (data && data.isPaid && !data.isDelivered && data.isGcash) return styles.pink;
  if (data && data.isPaid && data.isDelivered && data.isGcash) return styles.blue;
  if (data && data.isPaid && data.isDelivered && !data.isGcash) return styles.green;
  return styles.orange;
};
