import React from 'react';

import styles from '../new-order.module.css';

const Step2 = ({ selectedItem, variationQuery, setStep, selectVariationHandler }) => {
  return (
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select {selectedItem?.itemName} size:</h2>
      </div>
      <div className={styles.cards_container}>
        <div className={styles.card} onClick={() => setStep(1)}>
          <div className={styles.card_name}>Back to ITEMS</div>
        </div>
        {variationQuery &&
          variationQuery.map((variation, index) => {
            return (
              <div
                key={index}
                className={styles.card}
                onClick={() => selectVariationHandler(variation)}
                style={
                  selectedItem.thumbnailUrl
                    ? { backgroundImage: 'url(' + selectedItem.thumbnailUrl + ')' }
                    : { backgroundImage: 'url(/images/jabe_value_meal.jpeg)' }
                }
              >
                <div className={styles.card_price}>₱ {variation.price}</div>
                <div className={styles.card_name}>{variation.size}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Step2;
