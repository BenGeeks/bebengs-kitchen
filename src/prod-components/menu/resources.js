import * as yup from 'yup';

export const MENU_SCHEMA = yup.object().shape({
  item_name: yup.string().required('Item name is required'),
  image: yup.string(),
  description: yup.string(),
});

export const MENU_INPUT = [
  { type: 'text', name: 'image', label: 'Image' },
  { type: 'text', name: 'item_name', label: 'Item name' },
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
export const VARIATION_COLUMNS = [
  { Header: 'Size', accessor: 'size' },
  { Header: 'Qty', accessor: 'qty' },
  { Header: 'Price', accessor: 'price' },
];

export const DATA = [
  {
    id: 1,
    item_name: 'Banana Turon',
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_43/1794082/leah-cohen-turon-kb-main-211026.jpg',
    description:
      "Banana turon are the ultimate fruit treat! With caramelized crispy wrapper and banana filling, they're sweet, crunchy, and addictive!",
    variation: [
      {
        id: 1,
        size: 'small box',
        qty: '10',
        price: 50,
      },
      {
        id: 2,
        size: 'big box',
        qty: '20',
        price: 100,
      },
      {
        id: 3,
        size: '10-inch bilao',
        qty: '30',
        price: 150,
      },
      {
        id: 4,
        size: '12-inch bilao',
        qty: '40',
        price: 200,
      },
      {
        id: 5,
        size: '14-inch bilao',
        qty: '50',
        price: 250,
      },
      {
        id: 6,
        size: '16-inch bilao',
        qty: '60',
        price: 250,
      },
    ],
  },
  {
    id: 1,
    item_name: 'Banana Muffin',
    image: 'https://preppykitchen.com/wp-content/uploads/2021/02/Banana-Chocolate-Chip-Muffins-feature-1.jpg',
    description:
      'Banana Muffins are a muffin version of this Banana Bread. They start with a thick sweet batter that is full of chocolate chips. It is so delicious and very addictive!',
    variation: [
      {
        id: 7,
        size: 'Small box',
        qty: '2',
        price: 40,
      },
      {
        id: 8,
        size: 'Medium box',
        qty: '4',
        price: 70,
      },
      {
        id: 9,
        size: 'Large box',
        qty: '6',
        price: 100,
      },
      {
        id: 10,
        size: 'Extra large box',
        qty: '12',
        price: 190,
      },
    ],
  },
  {
    id: 1,
    item_name: 'Empanada',
    image: 'https://handletheheat.com/wp-content/uploads/2022/06/beef-empanada-recipe-SQUARE-550x550.jpg',
    description: 'Yummy chicken empanada with vegies for a healthier you!',
    variation: [
      {
        id: 11,
        size: 'Small box',
        qty: '2',
        price: 40,
      },
      {
        id: 12,
        size: 'Medium box',
        qty: '4',
        price: 70,
      },
      {
        id: 13,
        size: 'Large box',
        qty: '6',
        price: 100,
      },
      {
        id: 14,
        size: 'Extra large box',
        qty: '12',
        price: 190,
      },
    ],
  },
  {
    id: 1,
    item_name: 'Banana Turon',
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_43/1794082/leah-cohen-turon-kb-main-211026.jpg',
    description:
      "Banana turon are the ultimate fruit treat! With caramelized crispy wrapper and banana filling, they're sweet, crunchy, and addictive!",
    variation: [
      {
        id: 15,
        size: 'small box',
        qty: '10',
        price: 50,
      },
      {
        id: 16,
        size: 'big box',
        qty: '20',
        price: 100,
      },
      {
        id: 17,
        size: '10-inch bilao',
        qty: '30',
        price: 150,
      },
      {
        id: 18,
        size: '12-inch bilao',
        qty: '40',
        price: 200,
      },
      {
        id: 19,
        size: '14-inch bilao',
        qty: '50',
        price: 250,
      },
      {
        id: 20,
        size: '16-inch bilao',
        qty: '60',
        price: 250,
      },
    ],
  },
  {
    id: 1,
    item_name: 'Banana Muffin',
    image: 'https://preppykitchen.com/wp-content/uploads/2021/02/Banana-Chocolate-Chip-Muffins-feature-1.jpg',
    description:
      'Banana Muffins are a muffin version of this Banana Bread. They start with a thick sweet batter that is full of chocolate chips. It is so delicious and very addictive!',
    variation: [
      {
        id: 21,
        size: 'Small box',
        qty: '2',
        price: 40,
      },
      {
        id: 22,
        size: 'Medium box',
        qty: '4',
        price: 70,
      },
      {
        id: 23,
        size: 'Large box',
        qty: '6',
        price: 100,
      },
      {
        id: 24,
        size: 'Extra large box',
        qty: '12',
        price: 190,
      },
    ],
  },
  {
    id: 1,
    item_name: 'Empanada',
    image:
      'https://lh3.googleusercontent.com/pw/ADCreHeCTGOgxfIFMUYAC7gRvQT7YaATsH5fw41B-FGDlUrBkMVxH_0DDhAmRi0u-iVfBb5F6LNoNRkOKKJZJuxP93WwHzIiS0FpfrMWKSOv2UUiop2pAEEX=w2400',
    description: 'Yummy chicken empanada with vegies for a healthier you!',
    variation: [
      {
        id: 25,
        size: 'Small box',
        qty: '2',
        price: 40,
      },
      {
        id: 26,
        size: 'Medium box',
        qty: '4',
        price: 70,
      },
      {
        id: 27,
        size: 'Large box',
        qty: '6',
        price: 100,
      },
      {
        id: 128,
        size: 'Extra large box',
        qty: '12',
        price: 190,
      },
    ],
  },
];
