'use client';
import React, { useEffect, useState } from 'react';
import { ImCheckmark, ImCancelCircle } from 'react-icons/im';
import { PiBackspace } from 'react-icons/pi';

import { QTY_NUMBER, getRandomColor } from './resources';
import styles from './number-pad.module.css';

import ModalWide from '@/assets/modal-wide';

const NumberPad = ({ open, close, onSubmit, value }) => {
  const [number, setNumber] = useState(value ? value.toString() : '');
  const [colors, setColors] = useState([]);

  const onNumberClick = (num) => {
    setNumber((prev) => (prev ? prev + num : num));
  };

  useEffect(() => {
    let colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push(getRandomColor());
    }
    setColors(colors);
  }, []);

  const cancelHandler = () => {
    setNumber('');
    setColors([]);
    close();
  };

  const onSumbitHandler = () => {
    onSubmit(number ? +number : null);
    cancelHandler();
  };

  return (
    <ModalWide open={open} close={close}>
      <div className={styles.numpad_container}>
        <div className={styles.header_bar}>
          <div className={styles.number_display}>{number}</div>
          <div className={styles.header_bar_cancel} title="cancel" onClick={cancelHandler}>
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
            onClick={() => setNumber((prev) => (prev ? prev.slice(0, -1) : null))}
            style={{ backgroundColor: '#d9534f', color: 'white' }}
          >
            <PiBackspace />
          </div>
          <div key={0} className={styles.number_card} onClick={() => onNumberClick(0)} style={{ backgroundColor: colors[0] }}>
            0
          </div>
          <div className={styles.number_card} onClick={onSumbitHandler} style={{ backgroundColor: '#5cb85c', color: 'white' }}>
            <ImCheckmark />
          </div>
        </div>
      </div>
    </ModalWide>
  );
};

export default NumberPad;
