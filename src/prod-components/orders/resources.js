'use client';
import styles from './orders.module.css';

export const HEADERS = ['#', 'Date', 'Name', 'Total'];

export const FUTURE_ORDERS_HEADER = [
  { display: 'item', name: 'itemName' },
  { display: 'size', name: 'size' },
  { display: 'qty', name: 'qty' },
];

export const summarizeReport = (data) => {
  const result = {};
  // Loop through each order in the sampleData
  data.forEach((order) => {
    const deliveryDate = order.deliveryDate;
    const items = order.orderDetails.items;
    // Initialize an object for the current delivery date if it doesn't exist in the result
    if (!result[deliveryDate]) {
      result[deliveryDate] = [];
    }
    // Loop through the items in the order and update the quantity for each item
    items.forEach((item) => {
      const existingItem = result[deliveryDate].find((resultItem) => resultItem._id === item._id);

      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        result[deliveryDate].push({ _id: item._id, itemName: item.itemName, size: item.size, qty: item.qty });
      }
    });
  });
  return result;
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

export const getTotal = (data) => {
  let total = data.reduce((total, data) => data.total + total, 0).toLocaleString('en-US');
  return total;
};
