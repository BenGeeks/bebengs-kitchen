'use client';
import React from 'react';

import { SUMMARY_HEADER, SALES_COUNT_HEADER, EXPENSES_HEADER } from './resources';
import { Loader, Error } from '@/assets/loader-error';
import styles from './reports.module.css';
import Table from '@/assets/table';
import moment from 'moment';

const ReportsMainPage = ({ date, reportsQuery }) => {
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
          <h2 className={styles.header}>Sales Report for {moment(date).format('MMM DD, YYYY')}</h2>
        </div>
        <Table headers={SUMMARY_HEADER} data={reportsQuery?.data?.finalReportData} />
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Sales Summary</h2>
        </div>
        <Table headers={SALES_COUNT_HEADER} data={reportsQuery?.data?.salesData} />
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Expenses Summary</h2>
        </div>
        <Table headers={EXPENSES_HEADER} data={reportsQuery?.data?.expensesData} />
      </div>
    </div>
  );
};

export default ReportsMainPage;
