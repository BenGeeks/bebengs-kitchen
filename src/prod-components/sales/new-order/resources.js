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

export const QTY_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const getRandomColor = () => {
  let color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
  return color;
};

export const getTotal = (items, deliveryCharge, discount, downPayment) => {
  let delivery = deliveryCharge ? +deliveryCharge : 0;
  let disc = discount ? +discount : 0;
  let down = downPayment ? +downPayment : 0;
  let itemTotal = items.reduce((total, data) => +data.subTotal + total, 0);
  let total = itemTotal + delivery - disc - down;
  return total.toLocaleString('en-US');
};
