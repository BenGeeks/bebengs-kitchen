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
