import * as yup from 'yup';

export const MENU_SCHEMA = yup.object().shape({
  itemName: yup.string().required('Item name is required'),
  imageUrl: yup.string(),
  description: yup.string(),
});

export const MENU_INPUT = [
  { type: 'text', name: 'itemName', label: 'Item name' },
  { type: 'text', name: 'imageUrl', label: 'Image' },
  { type: 'textarea', name: 'description', label: 'Description' },
];

export const VARIATION_SCHEMA = yup.object().shape({
  size: yup.string(),
  qty: yup
    .number()
    .typeError('Amount must be a number')
    .required('Please provide an item price.')
    .min(0, 'At least one is required')
    .max(5000, 'that is impossible!!!'),
  price: yup
    .number()
    .typeError('Amount must be a number')
    .required('Please provide an item price.')
    .min(0, 'Too little')
    .max(5000, 'Very costly!'),
});

export const VARIATION_INPUT = [
  { type: 'text', name: 'size', label: 'Size' },
  { type: 'number', name: 'qty', label: 'Quantity' },
  { type: 'number', name: 'price', label: 'Price' },
];

export const VARIATION_HEADERS = [
  { display: 'Size', name: 'size' },
  { display: 'Qty', name: 'qty' },
  { display: 'Price', name: 'price' },
];

export const CUSTOMER_HEADERS = [
  { display: 'Name', name: 'name' },
  { display: 'Address', name: 'address' },
  { display: 'Block', name: 'block' },
  { display: 'Lot', name: 'lot' },
];

export const DEFAULT_MENU_ITEM = { itemName: '', description: '', imageUrl: '' };
export const DEFAULT_VARIATION_DATA = { size: 'small', qty: 1, price: 100 };

export const ORDER_DETAILS_SCHEMA = yup.object().shape({
  deliveryDate: yup.string(),
  deliveryTime: yup.string(),
  downPayment: yup.string(),
});

export const ORDER_DETAILS_INPUT = [
  { type: 'date', name: 'deliveryDate', label: 'Date' },
  { type: 'time', name: 'deliveryTime', label: 'Time' },
  { type: 'number', name: 'downPayment', label: 'Down Payment' },
];
