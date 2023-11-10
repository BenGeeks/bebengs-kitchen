'use client';
import React, { useState } from 'react';
import moment from 'moment';

import styles from './date-picker.module.css';
import { MONTH, YEAR } from './resources';
import ModalWide from './modal-wide';

const DatePicker = ({ open, close, onSave, defaultDate }) => {
  const [day, setDay] = useState(defaultDate ? moment(defaultDate).date() : moment().date());
  const [month, setMonth] = useState(defaultDate ? moment(defaultDate).month() : moment().month());
  const [year, setYear] = useState(defaultDate ? moment(defaultDate).year() : moment().year());

  const daysArray = Array.from({ length: moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth() }, (_, i) => i + 1);

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
