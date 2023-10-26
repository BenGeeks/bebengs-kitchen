import React from 'react';

import newOrderStyles from '@/styles/new-order.module.css';

const Step1 = ({ sortedMenuList, recentItemList, selectItemHandler }) => {
  return (
    <div className={newOrderStyles.main_page}>
      <div className={newOrderStyles.header_bar}>
        <h2 className={newOrderStyles.header_bar_title}>Select an item:</h2>
      </div>

      {recentItemList && recentItemList.length !== 0 && (
        <>
          <h3>Recent Items:</h3>
          <div className={newOrderStyles.cards_container}>
            {recentItemList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={newOrderStyles.card}
                  onClick={() => selectItemHandler(item)}
                  style={
                    item.thumbnailUrl
                      ? { backgroundImage: 'url(' + item.thumbnailUrl + ')' }
                      : { backgroundImage: 'url(/images/orange_travelpictdinner.png)' }
                  }
                >
                  <div className={newOrderStyles.card_name}>{item.itemName}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <h3>All items:</h3>
      <div className={newOrderStyles.cards_container}>
        {sortedMenuList &&
          sortedMenuList.map((item, index) => {
            return (
              <div
                key={index}
                className={newOrderStyles.card}
                onClick={() => selectItemHandler(item)}
                style={
                  item.thumbnailUrl
                    ? { backgroundImage: 'url(' + item.thumbnailUrl + ')' }
                    : { backgroundImage: 'url(/images/orange_travelpictdinner.png)' }
                }
              >
                <div className={newOrderStyles.card_name}>{item.itemName}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Step1;
