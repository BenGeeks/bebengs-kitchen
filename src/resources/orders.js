import moment from 'moment';
import * as yup from 'yup';

export const ORDER_ITEMS_HEADER = [
  { display: 'item', name: 'itemName' },
  { display: 'size', name: 'size' },
  { display: 'qty', name: 'qty' },
  { display: 'price', name: 'price' },
  { display: 'total', name: 'subTotal' },
];

export const DEFAULT_ORDER_DETAILS = {
  deliveryDate: moment().format(),
  deliveryTime: '00:00',
  paymentDate: null,
  downPayment: 0,
};

export const ORDER_DETAILS_SCHEMA = yup.object().shape({
  deliveryDate: yup.string(),
  deliveryTime: yup.string(),
  downPayment: yup.number(),
});

export const ORDER_DETAILS_INPUT = [
  { type: 'date', name: 'deliveryDate', label: 'Delivery Date' },
  { type: 'time', name: 'deliveryTime', label: 'Time' },
  { type: 'number', name: 'downPayment', label: 'Down Payment' },
  { type: 'date', name: 'paymentDate', label: 'Payment Date' },
];

export const ORDER_COLUMNS = ['Order#', 'Order Details', 'Total'];
export const CUSTOMER_COLUMNS = ['Name', 'Address', 'Block', 'Lot'];
export const ITEMS_COLUMNS = ['item', 'size', 'qty', 'price', 'sub total', 'action'];
export const QTY_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
