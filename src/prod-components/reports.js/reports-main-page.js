import React from 'react';

import Table from '@/assets/table';
import { SUMMARY_HEADER, SALES_COUNT_HEADER, EXPENSES_HEADER } from './resources';
import styles from './reports.module.css';
import moment from 'moment';

const ReportsMainPage = ({ salesData, salesSummary, expensesData, expensesSummary, date }) => {
  const finalReportData = [
    { source: 'Sales', cash: salesSummary?.cash, gcash: salesSummary?.gcash, total: salesSummary?.total },
    { source: 'Expenses', cash: expensesSummary?.cash, gcash: expensesSummary?.gcash, total: expensesSummary?.total },
    {
      source: 'Total',
      cash: salesSummary?.cash - expensesSummary?.cash,
      gcash: salesSummary?.gcash - expensesSummary?.gcash,
      total: salesSummary?.total - expensesSummary?.total,
    },
  ];
  return (
    <div className={styles.page_container}>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Sales Report for {moment(date).format('MMM DD, YYYY')}</h2>
        </div>
        <Table headers={SUMMARY_HEADER} data={finalReportData} />
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Sales Summary</h2>
        </div>
        <Table headers={SALES_COUNT_HEADER} data={salesData} />
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Expenses Summary</h2>
        </div>
        <Table headers={EXPENSES_HEADER} data={expensesData?.sort((a, b) => b.total - a.total)} />
      </div>
    </div>
  );
};

export default ReportsMainPage;
