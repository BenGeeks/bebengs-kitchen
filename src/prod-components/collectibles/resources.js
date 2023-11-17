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

export const ITEMS_HEADERS = [
  { display: 'item', name: 'itemName' },
  { display: 'qty', name: 'qty' },
  { display: 'price', name: 'price' },
  { display: 'total', name: 'subTotal' },
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

  let keys = Object.keys(tempData);
  keys.forEach((key) => {
    summary.push({ name: key, amount: tempData[key] });
  });

  summary = summary.sort((a, b) => b.amount - a.amount);
  return summary;
};

export const getCollectibleData = (order, collectiblesData) => {
  let tempData = collectiblesData?.filter((item) => item.orderDetails.customer.name === order.name);
  let ordersObj = {};
  let itemArray = [];
  let total = 0;

  tempData.forEach((data) => {
    total = total + data?.total;
    let date = moment(data.deliveryDate).format('ll');
    if (ordersObj[date]) {
      ordersObj[date] = { total: ordersObj[date].total + data.total, items: [...ordersObj[date].items, ...data.orderDetails.items] };
    } else {
      ordersObj[date] = { total: data.total, items: data.orderDetails.items };
    }
  });

  let keys = Object.keys(ordersObj);
  keys.forEach((key) => {
    itemArray.push({ date: key, total: ordersObj[key].total, items: ordersObj[key].items });
  });

  return {
    name: tempData[0].orderDetails.customer.name,
    total: total,
    items: itemArray,
  };
};
