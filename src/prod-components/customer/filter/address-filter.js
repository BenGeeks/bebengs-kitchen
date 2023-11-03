import React from 'react';
import { useQuery } from '@tanstack/react-query';

import ModalWide from '@/assets/modal-wide';
import apiRequest from '@/lib/axios';
import newOrderStyles from '../customer.module.css';

const AddressFilterSelector = ({ open, onSelect }) => {
  const addressQuery = useQuery({
    queryKey: ['address'],
    queryFn: () => apiRequest({ url: 'address', method: 'GET' }).then((res) => res.data),
  });

  return (
    <ModalWide open={open}>
      <div className={newOrderStyles.header_bar}>
        <h2 className={newOrderStyles.header_bar_title}>Select an address:</h2>
      </div>
      <div className={newOrderStyles.address_selector_container}>
        {addressQuery?.data?.map((item) => {
          return (
            <div key={item._id} className={newOrderStyles.address_grid} onClick={() => onSelect('address', item.address)}>
              {item.address}
            </div>
          );
        })}
      </div>
      <div className={newOrderStyles.clear_filter_button} onClick={() => onSelect('address', null)}>
        Clear Filter
      </div>
    </ModalWide>
  );
};

export default AddressFilterSelector;
