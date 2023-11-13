'use client';

import { SUMMARY_HEADER, SALES_COUNT_HEADER, EXPENSES_HEADER } from './resources';
import { Loader, Error } from '@/assets/loader-error';
import styles from './reports.module.css';
import Table from '@/assets/table';
import moment from 'moment';

const ReportsMainPage = ({ date, reportsQuery, finalReportData, salesData, expenseData }) => {
  if (reportsQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (reportsQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={reportsQuery.error} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Sales Report for {moment(date).format('LL')}</h2>
        </div>
        <Table headers={SUMMARY_HEADER} data={finalReportData ? finalReportData : []} />
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Sales Summary</h2>
        </div>
        <Table headers={SALES_COUNT_HEADER} data={salesData ? salesData : []} />
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Expenses Summary</h2>
        </div>
        <Table headers={EXPENSES_HEADER} data={expenseData ? expenseData : []} />
      </div>
    </div>
  );
};

export default ReportsMainPage;
