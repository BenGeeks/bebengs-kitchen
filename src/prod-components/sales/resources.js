import styles from './sales.module.css';

export const COLLECTIBLE_HEADER = [
  { display: 'Customer Name', name: 'name' },
  { display: 'Amount', name: 'amount' },
];

export const COUNT_HEADER = [
  { display: 'Item', name: 'itemName' },
  { display: 'Size', name: 'size' },
  { display: 'Price', name: 'price' },
  { display: 'Qty', name: 'qty' },
  { display: 'Total', name: 'subTotal' },
];

export const getStatusColor = (data) => {
  if (data && !data.isPaid && data.isDelivered && data.isGcash) return styles.red;
  if (data && !data.isPaid && data.isDelivered && !data.isGcash) return styles.purple;
  if (data && data.isPaid && !data.isDelivered && !data.isGcash) return styles.turquoise;
  if (data && data.isPaid && !data.isDelivered && data.isGcash) return styles.pink;
  if (data && data.isPaid && data.isDelivered && data.isGcash) return styles.blue;
  if (data && data.isPaid && data.isDelivered && !data.isGcash) return styles.green;
  return styles.orange;
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

export const getSalesData = (sales) => {
  let downPayment = 0;
  let cash = 0;
  let gCash = 0;
  sales?.forEach((order) => {
    if (order.isPaid) {
      if (order.isGcash) gCash = gCash + order.total;
      if (!order.isGcash) cash = cash + order.total;
    }

    if (order.isDownPayment) downPayment = downPayment + order.downPayment;
  });

  let finalData = { cashTotal: cash, gCashTotal: gCash, dpTotal: downPayment, dailyTotal: cash + gCash + downPayment };
  return finalData;
};
