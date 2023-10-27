import React, { useState } from 'react';

import ModalWide from './modal-wide';
import moment from 'moment';
import assetStyles from '@/styles/assets.module.css';

const DatePicker = ({ open, setOpenCalendar, onSave }) => {
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
  const DAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const YEAR = [2023, 2024, 2025, 2026];

  return (
    <ModalWide open={open} close={() => setOpenCalendar(false)}>
      <div className={assetStyles.header_bar}>
        <h2 className={assetStyles.header_bar_title}>Pick a date:</h2>
      </div>
      <div className={assetStyles.date_picker_container}>
        <div className={assetStyles.month_grid}>
          {MONTH.map((el) => {
            return (
              <div
                key={el.value}
                className={el.value == month ? assetStyles.month_selected : assetStyles.month}
                onClick={() => setMonth(el.value)}
              >
                {el.mmm}
              </div>
            );
          })}
        </div>
        <div className={assetStyles.date_picker_columns}>
          <div className={assetStyles.day_grid}>
            {DAY.map((num) => {
              return (
                <div key={num} className={num == day ? assetStyles.day_selected : assetStyles.day} onClick={() => setDay(num)}>
                  {num}
                </div>
              );
            })}
          </div>
        </div>
        <div className={assetStyles.date_picker_columns}>
          <div className={assetStyles.year_grid}>
            {YEAR.map((num) => {
              return (
                <div key={num} className={year == num ? assetStyles.year_selected : assetStyles.year} onClick={() => setYear(num)}>
                  {num}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={assetStyles.button_container}>
        <button className={assetStyles.button_cancel} onClick={() => setOpenCalendar(false)}>
          Cancel
        </button>
        <button className={assetStyles.button_save} onClick={() => onSave({ year, month, day })}>
          Save
        </button>
      </div>
    </ModalWide>
  );
};

export default DatePicker;
