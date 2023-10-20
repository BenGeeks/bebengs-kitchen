import React from 'react';

import newOrderStyles from '@/styles/new-order.module.css';

const Step2 = ({ selectedItem, variationQuery, setStep, selectVariationHandler }) => {
  console.log('SELECTED VARIATION: ', variationQuery);
  return (
    <div className={newOrderStyles.main_page}>
      <div className={newOrderStyles.header_bar}>
        <h2 className={newOrderStyles.header_bar_title}>Select {selectedItem?.itemName} size:</h2>
      </div>
      <div className={newOrderStyles.cards_container}>
        <div className={newOrderStyles.card} onClick={() => setStep(1)}>
          <div className={newOrderStyles.card_name}>Back to ITEMS</div>
        </div>
        {variationQuery &&
          variationQuery.map((variation, index) => {
            return (
              <div
                key={index}
                className={newOrderStyles.card}
                onClick={() => selectVariationHandler(variation)}
                style={
                  selectedItem.imageUrl
                    ? { backgroundImage: 'url(' + selectedItem.imageUrl + ')' }
                    : { backgroundImage: 'url(/images/jabe_value_meal.jpeg)' }
                }
              >
                <div className={newOrderStyles.card_price}>₱ {variation.price}</div>
                <div className={newOrderStyles.card_name}>{variation.size}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Step2;
