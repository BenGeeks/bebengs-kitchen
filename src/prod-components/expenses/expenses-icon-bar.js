'use client';
import { RiAddCircleLine, RiCalendar2Line } from 'react-icons/ri';
import { PiCalendar } from 'react-icons/pi';

import styles from '@/styles/icons-bar.module.css';
import moment from 'moment';

const ExpensesIconBar = ({ onAddExpense, setOpenDatePicker, today }) => {
  return (
    <div className={styles.icon_bar_container}>
      <div className={styles.icon_box} title="Add order" onClick={onAddExpense}>
        <div className={styles.icon}>
          <RiAddCircleLine />
        </div>
        <p className={styles.icon_text}>+ Expense</p>
      </div>
      <div className={styles.icon_box} title="Today" onClick={() => today(moment())}>
        <div className={styles.icon}>
          <PiCalendar />
        </div>
        <p className={styles.icon_text}>Today</p>
      </div>
      <div className={styles.icon_box} title="History" onClick={() => setOpenDatePicker(true)}>
        <div className={styles.icon}>
          <RiCalendar2Line />
        </div>
        <p className={styles.icon_text}>History</p>
      </div>
    </div>
  );
};

export default ExpensesIconBar;
