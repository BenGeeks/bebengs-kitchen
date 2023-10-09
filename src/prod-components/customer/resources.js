import * as yup from 'yup';

export const SCHEMA = yup.object().shape({
  name: yup.string().required('Customer name is required'),
  address: yup.string().required('Customer address is required'),
  block: yup.string(),
  lot: yup.string(),
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
  { Header: 'G-Cash', accessor: 'phone' },
  { Header: 'Address', accessor: 'address' },
  { Header: 'Block', accessor: 'block' },
  { Header: 'Lot', accessor: 'lot' },
];
