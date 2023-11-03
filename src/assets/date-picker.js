import moment from 'moment';
import React, { useState } from 'react';

import ModalWide from './modal-wide';
import assetStyles from '@/styles/assets.module.css';
import styles from './date-picker.module.css';

const DatePicker = ({ open, close, onSave }) => {
  const [day, setDay] = useState(moment().date());
  const [month, setMonth] = useState(moment().month());
  const [year, setYear] = useState(moment().year());

  const MONTH = [
    { mmm: 'JAN', value: 0 },
    { mmm: 'FEB', value: 1 },
    { mmm: 'MAR', value: 2 },
    { mmm: 'APR', value: 3 },
    { mmm: 'MAY', value: 4 },
    { mmm: 'JUN', value: 5 },
    { mmm: 'JUL', value: 6 },
    { mmm: 'AUG', value: 7 },
    { mmm: 'SEP', value: 8 },
    { mmm: 'OCT', value: 9 },
    { mmm: 'NOV', value: 10 },
    { mmm: 'DEC', value: 11 },
  ];

  const daysArray = Array.from({ length: moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth() }, (_, i) => i + 1);
  const YEAR = [2023, 2024, 2025, 2026];

  return (
    <ModalWide open={open} close={close}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>Pick a date:</h2>
      </div>
      <div className={styles.date_picker_container}>
        <div className={styles.month_grid}>
          {MONTH.map((el) => {
            return (
              <div key={el.value} className={el.value == month ? styles.grid_selected : styles.grid} onClick={() => setMonth(el.value)}>
                {el.mmm}
              </div>
            );
          })}
        </div>
        <div className={styles.date_picker_columns}>
          <div className={styles.day_grid}>
            {daysArray.map((num) => {
              return (
                <div key={num} className={num == day ? styles.grid_selected : styles.grid} onClick={() => setDay(num)}>
                  {num}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.date_picker_columns}>
          <div className={styles.year_grid}>
            {YEAR.map((num) => {
              return (
                <div key={num} className={year == num ? styles.grid_selected : styles.grid} onClick={() => setYear(num)}>
                  {num}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.button_container}>
        <button className={styles.button_cancel} onClick={close}>
          Cancel
        </button>
        <button className={styles.button_save} onClick={() => onSave({ year, month, day })}>
          Select
        </button>
      </div>
    </ModalWide>
  );
};

export default DatePicker;
