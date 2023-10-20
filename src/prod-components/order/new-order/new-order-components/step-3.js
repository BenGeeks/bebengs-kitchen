import React from 'react';

import { QTY_NUMBER } from '@/resources/orders';
import newOrderStyles from '@/styles/new-order.module.css';

const Step3 = ({ selectedItem, selectQuantityHandler, setStep }) => {
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
              className={newOrderStyles.card}
              onClick={() => selectQuantityHandler(num)}
              style={
                selectedItem.imageUrl
                  ? { backgroundImage: 'url(' + selectedItem.imageUrl + ')' }
                  : { backgroundImage: 'url(/images/jabe_value_meal.jpeg)' }
              }
            >
              <div className={newOrderStyles.card_price}>{num}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step3;
