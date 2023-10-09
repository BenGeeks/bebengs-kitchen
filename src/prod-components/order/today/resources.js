export const ORDER_COLUMNS = ['Order#', 'Order Details', 'Total'];

export const SAMPLE_ORDER_DATA = [
  {
    id: 10,
    createdAt: '10/01/2023',
    orderDate: '10/01/2023',
    datePaid: '10/01/2023',
    deliveryTime: '2 PM',
    deliveryAddress: 'Cogon',
    downPayment: 0,
    orderDetails: {
      customer: {
        id: 4,
        displayName: 'Bebeng - Sta. Rosa Hill 19 23',
      },
      items: [
        { id: 2, item_name: 'Banana Turon', size: 'big box', qty: 2, price: 100, sub_total: 200 },
        { id: 22323, item_name: 'Empanada', size: 'small box', qty: 2, price: 40, sub_total: 80 },
      ],
    },
    total: 280,
    isGcash: false,
    delivered: true,
    isPaid: false,
  },
  {
    id: 12,
    createdAt: '10/01/2023',
    orderDate: '10/01/2023',
    datePaid: '10/01/2023',
    deliveryTime: '2 PM',
    deliveryAddress: 'Cogon',
    downPayment: 50,
    orderDetails: {
      customer: {
        id: 4,
        displayName: 'Bebeng - Sta. Rosa Hill 19 23',
      },
      items: [
        { id: 25432, item_name: 'Banana Turon', size: 'big box', qty: 2, price: 100, sub_total: 200 },
        { id: 234552, item_name: 'Empanada', size: 'small box', qty: 2, price: 40, sub_total: 80 },
      ],
    },
    total: 280,
    isGcash: true,
    delivered: false,
    isPaid: false,
  },
];
