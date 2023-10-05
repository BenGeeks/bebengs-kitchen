import React from 'react';

import styles from './card.module.css';

const Card = ({ size, data, onSelect, solo, isPrice }) => {
  return (
    <>
      {solo ? (
        <div className={styles.big_card}>
          <img src={data.image} className={styles.big_card_image} />
          <div className={styles.big_card_text_container}>
            <h2 className={styles.big_card_name}>{data.item_name}</h2>
            <p className={styles.big_card_description}>{data.description}</p>
          </div>
        </div>
      ) : (
        <>
          {isPrice ? (
            <>
              {data.map((item, index) => {
                return (
                  <div key={index} className={styles.cards_container}>
                    <div className={item.selected ? styles.price_card_selected : styles.price_card} onClick={() => onSelect(item)}>
                      <h2 className={styles.card_name}>{item.item_name}</h2>
                      <div className={styles.card_price_tag_container}>
                        <h1 className={styles.card_price}>{item.price}</h1>
                      </div>
                      <p className={styles.card_size}>{item.size}</p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {data.map((item, index) => {
                return (
                  <div key={index} className={styles.cards_container}>
                    <div className={size === 'big' ? styles.big_card : styles.card} onClick={() => onSelect(item)}>
                      <img src={item.image} className={size === 'big' ? styles.big_image : styles.image} />
                      <h2 className={size === 'big' ? styles.big_card_name : styles.card_name}>{item.item_name}</h2>
                      <p className={size === 'big' ? styles.big_card_description : styles.card_description}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Card;
