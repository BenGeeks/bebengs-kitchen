import * as yup from 'yup';

export const SCHEMA = yup.object().shape({
  deliveryDate: yup.string(),
  deliveryTime: yup.string(),
  downPayment: yup.string(),
});

export const INPUT = [
  { type: 'date', name: 'deliveryDate', label: 'Date' },
  { type: 'time', name: 'deliveryTime', label: 'Time' },
  { type: 'number', name: 'downPayment', label: 'Down Payment' },
];

export const CUSTOMER_COLUMNS = ['Name', 'Address', 'Block', 'Lot'];
export const ITEMS_COLUMNS = ['item', 'size', 'qty', 'price', 'sub_total', 'action'];

export const QTY_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
