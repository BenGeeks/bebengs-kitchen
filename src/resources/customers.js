import * as yup from 'yup';

export const SCHEMA = yup.object().shape({
  name: yup.string().required('Customer name is required'),
  address: yup.string().required('Customer address is required'),
  block: yup.string(),
  lot: yup.string(),
});

export const CUSTOMER_HEADER = [
  { display: 'Name', name: 'name' },
  { display: 'Address', name: 'address' },
  { display: 'Block', name: 'block' },
  { display: 'Lot', name: 'lot' },
];

export const ADDRESS_HEADER = [{ display: 'Address', name: 'address' }];

export const SELECT_CUSTOMER_LIST = [
  { display: 'Name', name: 'name' },
  { display: 'Address', name: 'address' },
  { display: 'Block', name: 'block' },
  { display: 'Lot', name: 'lot' },
];

export const ADDRESS_SCHEMA = yup.object().shape({ address: yup.string().required('Customer address is required') });

export const ADDRESS_INPUT = [{ type: 'text', name: 'address', label: 'Address' }];
