'use client';
import { ImCancelCircle, ImCheckmark } from 'react-icons/im';

import styles from '../new-order.module.css';

const Step1 = ({ sortedMenuList, recentItemList, selectItemHandler, isOrderEdit, onCancel, items }) => {
  return (
    <div className={styles.main_page}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select an item:</h2>
        {isOrderEdit ? (
          <div className={styles.header_bar_cancel} title="cancel" onClick={onCancel}>
            <div className={styles.header_bar_cancel_icon}>
              <ImCancelCircle />
            </div>
            <p className={styles.header_bar_cancel_text}>Cancel</p>
          </div>
        ) : (
          <>
            {items.length > 0 && (
              <div className={styles.header_bar_save} title="save" onClick={onCancel}>
                <div className={styles.header_bar_save_icon}>
                  <ImCheckmark />
                </div>
                <p className={styles.header_bar_save_text}>Save</p>
              </div>
            )}
          </>
        )}
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
