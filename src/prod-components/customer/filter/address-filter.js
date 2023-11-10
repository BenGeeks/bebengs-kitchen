'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import ModalWide from '@/assets/modal-wide';
import styles from '../customer.module.css';
import apiRequest from '@/lib/axios';

const AddressFilterSelector = ({ open, onSelect }) => {
  const addressQuery = useQuery({
    queryKey: ['address'],
    queryFn: () => apiRequest({ url: 'address', method: 'GET' }).then((res) => res.data),
  });

  return (
    <ModalWide open={open}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select an address:</h2>
      </div>
      <div className={styles.address_selector_container}>
        {addressQuery?.data?.map((item) => {
          return (
            <div key={item._id} className={styles.address_grid} onClick={() => onSelect('address', item.address)}>
              {item.address}
            </div>
          );
        })}
      </div>
      <div className={styles.clear_filter_button} onClick={() => onSelect('address', null)}>
        Clear Filter
      </div>
    </ModalWide>
  );
};

export default AddressFilterSelector;
