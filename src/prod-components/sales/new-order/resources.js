import moment from 'moment';
import * as yup from 'yup';

export const DEFAULT_ORDER_DETAILS = {
  deliveryDate: moment().startOf('day').format(),
  deliveryTime: '00:00',
  paymentDate: null,
  downPayment: 0,
};

export const ORDER_ITEMS_HEADER = [
  { display: 'item', name: 'itemName' },
  { display: 'size', name: 'size' },
  { display: 'qty', name: 'qty' },
  { display: 'price', name: 'price' },
  { display: 'total', name: 'subTotal' },
];

export const ORDER_DETAILS_SCHEMA = yup.object().shape({
  deliveryDate: yup.string(),
  deliveryTime: yup.string(),
  downPayment: yup.number(),
});

export const ORDER_DETAILS_INPUT = [
  { type: 'date', name: 'deliveryDate', label: 'Delivery Date' },
  { type: 'time', name: 'deliveryTime', label: 'Time' },
  { type: 'checkbox', name: 'isDelivered', label: 'Is Delivered' },
  { type: 'checkbox', name: 'isGcash', label: 'Is G-Cash' },
  { type: 'checkbox', name: 'isPaid', label: 'Is Paid' },
  { type: 'date', name: 'paymentDate', label: 'Payment Date' },
];

export const QTY_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const getRandomColor = () => {
  let color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
  return color;
};

export const getTotal = (items, deliveryCharge, discount) => {
  let delivery = deliveryCharge ? +deliveryCharge : 0;
  let disc = discount ? +discount : 0;
  let itemTotal = items.reduce((total, data) => +data.subTotal + total, 0);
  let total = itemTotal + delivery - disc;
  return total.toLocaleString('en-US');
};
