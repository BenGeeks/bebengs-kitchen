export const ORDER_ITEMS_HEADER = [
  { display: 'item', name: 'itemName' },
  { display: 'size', name: 'size' },
  { display: 'qty', name: 'qty' },
  { display: 'price', name: 'price' },
  { display: 'total', name: 'subTotal' },
];

export const getTotal = (data) => {
  let total = data?.orderDetails?.items?.reduce((total, data) => +data.subTotal + total, 0).toLocaleString();
  return total;
};

export const MONTH = [
  { mmm: 'JAN', value: 0 },
  { mmm: 'FEB', value: 1 },
  { mmm: 'MAR', value: 2 },
  { mmm: 'APR', value: 3 },
  { mmm: 'MAY', value: 4 },
  { mmm: 'JUN', value: 5 },
  { mmm: 'JUL', value: 6 },
  { mmm: 'AUG', value: 7 },
  { mmm: 'SEP', value: 8 },
  { mmm: 'OCT', value: 9 },
  { mmm: 'NOV', value: 10 },
  { mmm: 'DEC', value: 11 },
];

export const YEAR = [2023, 2024, 2025, 2026];

export const QTY_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const getRandomColor = () => {
  let color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
  return color;
};
