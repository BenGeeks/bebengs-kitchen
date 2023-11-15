import moment from 'moment';

export const SUMMARY_HEADERS = [
  { display: 'Name', name: 'name' },
  { display: 'Amount', name: 'amount' },
];

export const HEADERS = [
  { display: 'Age', name: 'age' },
  { display: 'Date', name: 'date' },
  { display: 'Name', name: 'name' },
  { display: 'Total', name: 'formattedTotal' },
];

export const formatData = (data) => {
  let tempData = [];
  data.forEach((item) => {
    tempData.push({
      ...item,
      age: moment().diff(item.deliveryDate, 'days'),
      date: moment(item.deliveryDate).format('ll'),
      name: item.orderDetails?.customer?.name,
      formattedTotal: item.total.toLocaleString('en-US'),
    });
  });
  return tempData;
};

export const getSummary = (data) => {
  let tempData = {};
  let summary = [];

  data.forEach((item) => {
    if (tempData[item.orderDetails.customer.name]) {
      tempData[item.orderDetails.customer.name] = item.total + tempData[item.orderDetails.customer.name];
    } else {
      tempData[item.orderDetails.customer.name] = item.total;
    }
  });

  const keys = Object.keys(tempData);
  keys.forEach((key) => {
    summary.push({ name: key, amount: tempData[key] });
  });

  summary = summary.sort((a, b) => b.amount - a.amount);
  return summary;
};
