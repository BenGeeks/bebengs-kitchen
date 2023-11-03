import React from 'react';

import ModalWide from '@/assets/modal-wide';
import styles from '../customer.module.css';

const BlockFilterSelector = ({ open, onSelect }) => {
  const numbersArray = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <ModalWide open={open}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select an address:</h2>
      </div>
      <div className={styles.number_selector_container}>
        {numbersArray.map((num) => {
          return (
            <div key={num} className={styles.number_grid} onClick={() => onSelect('block', num)}>
              {num}
            </div>
          );
        })}
      </div>
      <div className={styles.clear_filter_button} onClick={() => onSelect('block', null)}>
        Clear Block Filter
      </div>
    </ModalWide>
  );
};

export default BlockFilterSelector;
