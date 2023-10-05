import * as yup from 'yup';

export const LOGIN_SCHEMA = yup.object().shape({
  name: yup.string().required('Customer name is required'),
  address: yup.string().required('Customer address is required'),
});

export const FORM_INPUT = [
  { type: 'text', name: 'name', label: 'Name' },
  { type: 'text', name: 'address', label: 'Address' },
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
  { id: 1, name: 'Bebeng', address: 'sta rosa hills', block: '19', lot: '23' },
  { id: 2, name: 'Susan', address: 'sta rosa hills', block: '19', lot: '24' },
  { id: 3, name: 'Vivian', address: 'sta rosa hills', block: '3', lot: '14' },
  { id: 4, name: 'Chona', address: 'sta rosa hills', block: '25', lot: '15' },
];
