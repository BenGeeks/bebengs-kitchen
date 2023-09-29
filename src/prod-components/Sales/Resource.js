export const COLUMNS = [
  {
    Header: 'D',
    accessor: 'delivered',
    Cell: ({ row }) => {
      if (row.original.delivered) return '🟢';
      if (!row.original.delivered) return '🔴';
    },
  },
  {
    Header: 'P',
    accessor: 'paid',
    Cell: ({ row }) => {
      if (row.original.paid) return '🟢';
      if (!row.original.paid) return '🔴';
    },
  },
  {
    Header: 'G',
    accessor: 'isGcash',
    Cell: ({ row }) => {
      if (row.original.isGcash) return '🟢';
      if (!row.original.isGcash) return '🔴';
    },
  },
  { Header: 'Order Details', accessor: 'customer' },
  { Header: 'Total', accessor: 'total' },
];

export const SAMPLE_DATA = [
  {
    id: 20230929001,
    delivered: false,
    paid: false,
    isGcash: false,
    customer: {
      name: 'Bebeng - sta rosa hills 19 24',
      item: [
        { item_name: 'Banana Turon', size_variation: 'small (10pcs/pack)', qty: 5, price: 50, total: 250 },
        { item_name: 'Banana Muffins', size_variation: 'medium (4pcs)', qty: 2, price: 70, total: 140 },
      ],
    },
    total: 39045,
  },
  {
    id: 20230929002,
    delivered: true,
    paid: true,
    isGcash: false,
    customer: {
      name: 'Susan - sta rosa hills 19 24',
      item: [
        { item_name: 'Banana Turon', size_variation: 'small (10pcs/box)', qty: 2, price: 50, total: 100 },
        { item_name: 'Banana Muffins', size_variation: 'medium (4pcs/box)', qty: 2, price: 70, total: 140 },
        { item_name: 'Empanada', size_variation: 'small (3pcs/box)', qty: 7, price: 50, total: 350 },
      ],
    },
    total: 590,
  },
  {
    id: 20230929003,
    delivered: false,
    paid: false,
    isGcash: false,
    customer: {
      name: 'Anna - sta rosa hills 25 14',
      item: [
        { item_name: 'Banana Turon', size_variation: 'small (10pcs/pack)', qty: 5, price: 50, total: 250 },
        { item_name: 'Banana Muffins', size_variation: 'medium (4pcs)', qty: 2, price: 70, total: 140 },
      ],
    },
    total: 39045,
  },
  {
    id: 20230929004,
    delivered: true,
    paid: true,
    isGcash: false,
    customer: {
      name: 'Vivian - sta rosa hills 4 18',
      item: [
        { item_name: 'Banana Turon', size_variation: 'small (10pcs/box)', qty: 2, price: 50, total: 100 },
        { item_name: 'Banana Muffins', size_variation: 'medium (4pcs/box)', qty: 2, price: 70, total: 140 },
        { item_name: 'Empanada', size_variation: 'small (3pcs/box)', qty: 7, price: 50, total: 350 },
      ],
    },
    total: 590,
  },
];
