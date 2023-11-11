'use client';
import React, { useEffect, useState } from 'react';
import { ImCheckmark, ImCancelCircle } from 'react-icons/im';
import { PiBackspace } from 'react-icons/pi';

import { QTY_NUMBER, getRandomColor } from '../resources';
import styles from '../new-order.module.css';

const Step3 = ({ selectedItem, selectQuantityHandler, setStep, isOrderEdit, onCancel, items }) => {
  const [quantity, setQuantity] = useState('');
  const [colors, setColors] = useState([]);

  const onNumberClick = (num) => {
    setQuantity((prev) => prev + num);
  };

  useEffect(() => {
    let colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push(getRandomColor());
    }
    setColors(colors);
  }, []);

  return (
    <>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Select {selectedItem?.itemName} quantity:</h2>
        <div className={styles.quantity_display}>{quantity}</div>
        <div className={styles.header_bar_cancel} title="cancel" onClick={onCancel}>
          <div className={styles.header_bar_cancel_icon}>
            <ImCancelCircle />
          </div>
          <p className={styles.header_bar_cancel_text}>Cancel</p>
        </div>
      </div>
      <div className={styles.cards_container}>
        {QTY_NUMBER.map((num) => {
          return (
            <div key={num} className={styles.number_card} onClick={() => onNumberClick(num)} style={{ backgroundColor: colors[num] }}>
              {num}
            </div>
          );
        })}
        <div
          className={styles.number_card}
          onClick={() => setQuantity((prev) => prev.slice(0, -1))}
          style={{ backgroundColor: '#d9534f', color: 'white' }}
        >
          <PiBackspace />
        </div>
        <div
          className={styles.number_card}
          onClick={() => selectQuantityHandler(+quantity)}
          style={{ backgroundColor: '#5cb85c', color: 'white' }}
        >
          <ImCheckmark />
        </div>
      </div>
    </>
  );
};

export default Step3;
