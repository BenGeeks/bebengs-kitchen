import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Table from '@/assets/table';
import { EXPENSES_TABLE_HEADER } from '@/resources/expenses';
import collectiblesStyles from '@/styles/collectibles.module.css';
import styles from '@/styles/expenses.module.css';

const ExpensesList = ({ expensesQuery, onRowClick, date, isLoading }) => {
  const [total, setTotal] = useState();
  const [cash, setCash] = useState();
  const [gcash, setGcash] = useState();

  useEffect(() => {
    setTotal(expensesQuery?.reduce((total, data) => +data.total + total, 0));
    setCash(expensesQuery?.reduce((total, data) => (!data.isGcash ? +data.total + total : total), 0));
    setGcash(expensesQuery?.reduce((total, data) => (data.isGcash ? +data.total + total : total), 0));
  }, [expensesQuery, setTotal, setCash, setGcash]);
  return (
    <div className={styles.page_container}>
      <div className={styles.main_page}>
        <div className={styles.header_bar}>
          <h3 className={styles.header_bar_title}>Expenses: {moment(date).format('MMM DD, YYYY')}</h3>
          <div className={styles.header_bar_total_container}>
            <h3 className={styles.header_bar_total}>Cash: {cash}</h3>
            <h3 className={styles.header_bar_total}>G-cash: {gcash}</h3>
            <h3 className={styles.header_bar_total}>Total: {total}</h3>
          </div>
        </div>
        <Table
          headers={EXPENSES_TABLE_HEADER}
          data={expensesQuery}
          enableDelete={false}
          enableEdit={false}
          enableRowClick={true}
          onRowClick={onRowClick}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ExpensesList;
