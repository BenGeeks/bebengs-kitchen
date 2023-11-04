import React from 'react';

import styles from '../new-order.module.css';

const Step1 = ({ sortedMenuList, recentItemList, selectItemHandler }) => {
  return (
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select an item:</h2>
      </div>

      {recentItemList && recentItemList.length !== 0 && (
        <>
          <h3 className={styles.select_item_sub_header}>Recent Items:</h3>
          <div className={styles.cards_container}>
            {recentItemList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => selectItemHandler(item)}
                  style={
                    item.thumbnailUrl
                      ? { backgroundImage: 'url(' + item.thumbnailUrl + ')' }
                      : { backgroundImage: 'url(/images/orange_travelpictdinner.png)' }
                  }
                >
                  <div className={styles.card_name}>{item.itemName}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <h3 className={styles.select_item_sub_header}>All items:</h3>
      <div className={styles.cards_container}>
        {sortedMenuList &&
          sortedMenuList.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.card}
                onClick={() => selectItemHandler(item)}
                style={
                  item.thumbnailUrl
                    ? { backgroundImage: 'url(' + item.thumbnailUrl + ')' }
                    : { backgroundImage: 'url(/images/orange_travelpictdinner.png)' }
                }
              >
                <div className={styles.card_name}>{item.itemName}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Step1;
