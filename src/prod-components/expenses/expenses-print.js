'use client';
import moment from 'moment';

import styles from './expenses.module.css';

const PrintDailyExpense = ({ data, date }) => {
  return (
    <div className={styles.print_container}>
      <div className={styles.print_head_container}>
        <div className={styles.print_head_logo}>Bebeng's Kitchen</div>
        <div>
          Daily Expense Report for <u>{moment(date).format('MMM DD, YYYY')}</u>
        </div>
        <div className={styles.print_head_summary}>
          <div>Total Cash: {data?.reduce((total, data) => (!data.isGcash ? +data.total + total : total), 0)?.toLocaleString('en-US')}</div>
          <div>Total G-cash: {data?.reduce((total, data) => (data.isGcash ? +data.total + total : total), 0)?.toLocaleString('en-US')}</div>
          <div>
            <b>Total Sales: {data?.reduce((total, data) => +data.total + total, 0)?.toLocaleString('en-US')}</b>
          </div>
        </div>
      </div>

      <table className={styles.expense_table}>
        <thead>
          <tr>
            <th className={styles.expense_cell}>Item</th>
            <th className={styles.expense_cell}>Description</th>
            <th className={styles.expense_cell}>Price</th>
            <th className={styles.expense_cell}>Qty</th>
            <th className={styles.expense_cell}>G-cash</th>
            <th className={styles.expense_cell}>Cash</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((expense, index) => {
            return (
              <tr key={index}>
                <td className={styles.expense_cell}>{expense.item}</td>
                <td className={styles.expense_cell}>{expense.description}</td>
                <td className={styles.expense_number_cell}>{expense.price}</td>
                <td className={styles.expense_number_cell}>{expense.qty}</td>
                <td className={styles.expense_number_cell}>{expense.isGcash ? expense.total : ''}</td>
                <td className={styles.expense_number_cell}>{expense.isGcash ? '' : expense.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PrintDailyExpense;
