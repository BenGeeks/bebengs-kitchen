'use client';

import ModalWide from '@/assets/modal-wide';
import styles from './reports.module.css';
import { MONTH } from '@/assets/resources';

const DashboarDatePicker = ({ open, close, filterBy, setFilterBy, month, setMonth, quarter, setQuarter, year, setYear, onSave }) => {
  const YEAR = [2023, 2024, 2025, 2026, 2027, 2028, 2029];
  const QUARTER = [1, 2, 3, 4];

  return (
    <ModalWide open={open} close={close}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_bar_title}>
          Select Report Date By
          <select className={styles.select_report_by} defaultValue={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value={'year'}>Year</option>
            <option value={'quarter'}>Quarter</option>
            <option value={'month'}>Month</option>
          </select>
        </h2>
      </div>
      <div className={styles.date_picker_container}>
        <div className={styles.grid_container}>
          <h3>Select Year:</h3>
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
        {filterBy === 'quarter' && (
          <div className={styles.grid_container}>
            <h3>Select Quarter:</h3>
            <div className={styles.year_grid}>
              {QUARTER.map((num) => {
                return (
                  <div key={num} className={quarter == num ? styles.grid_selected : styles.grid} onClick={() => setQuarter(num)}>
                    Q{num}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {filterBy === 'month' && (
          <div className={styles.grid_container}>
            <h3>Select Month:</h3>
            <div className={styles.month_grid}>
              {MONTH.map((el) => {
                return (
                  <div key={el.value} className={el.value == month ? styles.grid_selected : styles.grid} onClick={() => setMonth(el.value)}>
                    {el.mmm}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={styles.button_container}>
        <button className={styles.button_cancel} onClick={close}>
          Cancel
        </button>
        <button className={styles.button_save} onClick={onSave}>
          Select
        </button>
      </div>
    </ModalWide>
  );
};

export default DashboarDatePicker;
