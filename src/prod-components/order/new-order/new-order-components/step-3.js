import React from 'react';

import { QTY_NUMBER } from '@/resources/orders';
import newOrderStyles from '@/styles/new-order.module.css';

const Step3 = ({ selectedItem, selectQuantityHandler, setStep }) => {
  const getRandomColor = () => {
    let color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
    return color;
  };

  return (
    <div className={newOrderStyles.main_page}>
      <div className={newOrderStyles.header_bar}>
        <h2 className={newOrderStyles.header_bar_title}>Select {selectedItem?.itemName} quantity:</h2>
      </div>
      <div className={newOrderStyles.cards_container}>
        <div className={newOrderStyles.card} onClick={() => setStep(2)}>
          <div className={newOrderStyles.card_name}>Back to SIZE</div>
        </div>
        {QTY_NUMBER.map((num) => {
          return (
            <div
              key={num}
              className={newOrderStyles.number_card}
              onClick={() => selectQuantityHandler(num)}
              style={{ backgroundColor: getRandomColor() }}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step3;
