import React from 'react';

import ModalWide from '@/assets/modal-wide';
import newOrderStyles from '@/styles/new-order.module.css';

const BlockFilter = ({ open, onSelect }) => {
  const numbersArray = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <ModalWide open={open}>
      <div className={newOrderStyles.header_bar}>
        <h2 className={newOrderStyles.header_bar_title}>Select an address:</h2>
      </div>
      <div className={newOrderStyles.number_selector_container}>
        {numbersArray.map((num) => {
          return (
            <div key={num} className={newOrderStyles.number_grid} onClick={() => onSelect('block', num)}>
              {num}
            </div>
          );
        })}
      </div>
      <div className={newOrderStyles.clear_filter_button} onClick={() => onSelect('block', null)}>
        Clear Block Filter
      </div>
    </ModalWide>
  );
};

export default BlockFilter;
