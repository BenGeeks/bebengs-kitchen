import * as yup from 'yup';

export const MENU_SCHEMA = yup.object().shape({
  item_name: yup.string().required('Item name is required'),
  image_url: yup.string(),
  description: yup.string(),
});

export const MENU_INPUT = [
  { type: 'text', name: 'item_name', label: 'Item name' },
  { type: 'text', name: 'image_url', label: 'Image' },
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

export const DEFAULT_MENU_ITEM = { item_name: '', description: '', image: '' };
export const DEFAULT_VARIATION_DATA = { size: 'small', qty: 1, price: 100 };
