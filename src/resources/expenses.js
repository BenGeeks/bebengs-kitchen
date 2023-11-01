import * as yup from 'yup';

export const EXPENSES_SCHEMA = yup.object().shape({
  item: yup.string().required('Item name is required'),
  price: yup.number().required('Item price is required'),
  qty: yup.number().required('Item quantity is required'),
  expenseDate: yup.string().required('Expense date is required'),
});

export const EXPENSES_INPUT = [
  { type: 'text', name: 'item', label: 'Item Name' },
  { type: 'text', name: 'description', label: 'Description' },
  { type: 'number', name: 'price', label: 'Price' },
  { type: 'number', name: 'qty', label: 'Quantity' },
  { type: 'checkbox', name: 'isGcash', label: 'Is G-cash' },
  { type: 'date', name: 'expenseDate', label: 'Expense Date' },
];

export const EXPENSES_TABLE_HEADER = [
  { display: 'G-cash', name: 'isGcash' },
  { display: 'Item', name: 'item' },
  { display: 'Description', name: 'description' },
  { display: 'Price', name: 'price' },
  { display: 'Qty', name: 'qty' },
  { display: 'Total', name: 'total' },
];
