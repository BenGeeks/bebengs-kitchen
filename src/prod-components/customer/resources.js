import * as yup from 'yup';

export const SCHEMA = yup.object().shape({
  name: yup.string().required('Customer name is required'),
  address: yup.string().required('Customer address is required'),
});

export const INPUT = [
  { type: 'text', name: 'name', label: 'Name' },
  { type: 'text', name: 'phone', label: 'G-cash number' },
  {
    type: 'text',
    name: 'address',
    label: 'Address',
    list: [
      'Sta. Rosa Hills',
      'Sta. Rosa Heights',
      'Morning View',
      'Buklod Bahayan',
      'Mandara',
      'Imperial',
      'Verona',
      'Cinta Dessa',
      'Saddleback',
    ],
  },
  { type: 'number', name: 'block', label: 'Block' },
  { type: 'number', name: 'lot', label: 'Lot' },
];

export const COLUMNS = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Address', accessor: 'address' },
  { Header: 'Block', accessor: 'block' },
  { Header: 'Lot', accessor: 'lot' },
];

export const DATA = [
  { id: 1, name: 'Bebeng', phone: '0968-882-4453', address: 'sta rosa hills', block: '19', lot: '23' },
  { id: 2, name: 'Susan', phone: '0977-135-2629', address: 'sta rosa hills', block: '19', lot: '24' },
  { id: 3, name: 'Vivian', phone: '0999-995-7176', address: 'sta rosa hills', block: '3', lot: '14' },
  { id: 4, name: 'Chona', phone: '0123-456-7890', address: 'sta rosa hills', block: '25', lot: '15' },
];
