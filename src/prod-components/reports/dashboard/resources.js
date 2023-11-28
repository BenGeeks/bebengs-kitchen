import moment from 'moment';

export const getMovingAverage = (data, windowSize) => {
  if (windowSize <= 0 || windowSize > data.length) {
    throw new Error('Invalid window size');
  }

  const result = [];

  for (let i = 0; i <= data.length - windowSize; i++) {
    const window = data.slice(i, i + windowSize);
    const average = window.reduce((sum, value) => sum + value, 0) / windowSize;
    result.push(average);
  }

  return result;
};

export const getTotal = (report) => {
  let totalSales = 0;
  let totalExpense = 0;
  report.forEach((data) => {
    totalSales = totalSales + data.sales;
    totalExpense = totalExpense + data.expenses;
  });
  return [
    { name: 'Profit', value: totalSales - totalExpense },
    { name: 'Expenses', value: totalExpense },
  ];
};

export const getWeeklyReport = (data) => {
  let tempData = {};
  let report = [];

  data.forEach((entry) => {
    let week = moment(entry.date).week();

    if (tempData[week]) {
      tempData[week] = {
        sales: tempData[week].sales + entry.sales,
        expenses: tempData[week].expenses + entry.expenses,
        profit: tempData[week].sales + entry.sales - tempData[week].expenses - entry.expenses,
      };
    } else {
      tempData[week] = { sales: entry.sales, expenses: entry.expenses, profit: entry.sales - entry.expenses };
    }
  });

  let keys = Object.keys(tempData);
  let count = 0;
  let total = 0;
  keys.forEach((key) => {
    total = total + tempData[key].profit;
    count++;
    report.push({
      name: key,
      sales: tempData[key].sales,
      expenses: tempData[key].expenses,
      profit: tempData[key].profit,
      movingAverage: Math.floor(total / count),
      ma: Math.floor(total / count),
    });
  });

  return report;
};

export const getMonthlyReport = (data) => {
  let tempData = {};
  let report = [];

  data.forEach((entry) => {
    let month = moment(entry.date).month();

    if (tempData[month]) {
      tempData[month] = {
        sales: tempData[month].sales + entry.sales,
        expenses: tempData[month].expenses + entry.expenses,
        profit: tempData[month].sales + entry.sales - tempData[month].expenses - entry.expenses,
      };
    } else {
      tempData[month] = { sales: entry.sales, expenses: entry.expenses, profit: entry.sales - entry.expenses };
    }
  });

  let keys = Object.keys(tempData);
  let count = 0;
  let total = 0;
  keys.forEach((key) => {
    total = total + tempData[key].profit;
    count++;
    report.push({
      name: moment(+key + 1, 'M').format('MMM'),
      sales: tempData[key].sales,
      expenses: tempData[key].expenses,
      profit: tempData[key].profit,
      movingAverage: Math.floor(total / count),
      ma: Math.floor(total / count),
    });
  });

  return report;
};
