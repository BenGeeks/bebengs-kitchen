'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { EXPENSES_TABLE_HEADER } from './resources';
import { Loader, Error } from '@/assets/loader-error';
import styles from './expenses.module.css';
import Table from '@/assets/table';

const ExpensesList = ({ expensesQuery, onRowClick, date }) => {
  const [total, setTotal] = useState();
  const [cash, setCash] = useState();
  const [gcash, setGcash] = useState();

  useEffect(() => {
    setTotal(expensesQuery?.data?.reduce((total, data) => +data.total + total, 0));
    setCash(expensesQuery?.data?.reduce((total, data) => (!data.isGcash ? +data.total + total : total), 0));
    setGcash(expensesQuery?.data?.reduce((total, data) => (data.isGcash ? +data.total + total : total), 0));
  }, [expensesQuery, setTotal, setCash, setGcash]);

  if (expensesQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (expensesQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={expensesQuery.error} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      <div className={styles.main_page}>
        <div className={styles.header_bar}>
          <h3 className={styles.header_bar_title}>Expenses: {moment(date).format('LL')}</h3>
          <div className={styles.header_bar_total_container}>
            <h3 className={styles.header_bar_total}>Cash: {cash}</h3>
            <h3 className={styles.header_bar_total}>G-cash: {gcash}</h3>
            <h3 className={styles.header_bar_total}>Total: {total}</h3>
          </div>
        </div>
        <Table
          headers={EXPENSES_TABLE_HEADER}
          data={expensesQuery.data}
          enableDelete={false}
          enableEdit={false}
          enableRowClick={true}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
};

export default ExpensesList;
