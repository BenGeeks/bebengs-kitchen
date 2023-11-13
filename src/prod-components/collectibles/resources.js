import moment from 'moment';

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
      date: moment(item.deliveryDate).format('LL'),
      name: item.orderDetails?.customer?.name,
      formattedTotal: item.total.toLocaleString('en-US'),
    });
  });
  return tempData;
};
