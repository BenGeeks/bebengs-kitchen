'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from 'react-to-print';
import { RiPrinterLine } from 'react-icons/ri';

import { getSalesCount, getSalesSummary, getOtherSalesData, getExpenseSummary, getFinalReportData } from '@/assets/functions';
import { SUMMARY_HEADER, SALES_COUNT_HEADER, EXPENSES_HEADER } from '../resources';
import PrintDailyReport from './reports-daily-print';
import { Loader, Error } from '@/assets/loader-error';
import styles from '../reports.module.css';
import apiRequest from '@/lib/axios';
import Table from '@/assets/table';
import moment from 'moment';

const DailyReportPage = ({ date, setDate, openDailyCalendar }) => {
  const printRef = useRef();
  const [expensesSummary, setExpenseSummary] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [salesSummary, setSalesSummary] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [finalReportData, setFinalReportData] = useState([]);
  const [otherSalesData, setOtherSalesData] = useState(null);
  const [isPrint, setIsPrint] = useState(false);

  useEffect(() => setDate({ year: moment().year(), month: moment().month(), day: moment().date() }), []);

  const reportsQuery = useQuery({
    queryKey: ['daily'],
    enabled: !openDailyCalendar,
    queryFn: () =>
      apiRequest({
        url: `reports/daily/${moment(date).format('YYYY-MM-DD')}`,
        method: 'GET',
      }).then((res) => res.data),
    onSuccess: (data) => {
      setExpenseData(data.expenseList.sort((a, b) => b.total - a.total));
      setExpenseSummary(getExpenseSummary(data.expenseList));
      setSalesSummary(getSalesSummary(data.salesList, date));
      setSalesData(getSalesCount(data.salesList, date));
      setOtherSalesData(getOtherSalesData(data.salesList, date));
    },
  });

  const handleBeforeGetContent = () => {
    setIsPrint(true);
    return Promise.resolve();
  };

  const onPrintHandler = useReactToPrint({
    onBeforeGetContent: () => handleBeforeGetContent(),
    content: () => printRef.current,
    documentTitle: 'daily_sales',
    onAfterPrint: () => setIsPrint(false),
  });

  useEffect(() => {
    salesSummary &&
      expensesSummary &&
      otherSalesData &&
      setFinalReportData(getFinalReportData(salesSummary, expensesSummary, otherSalesData));
  }, [salesSummary, expensesSummary, otherSalesData]);

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
      {isPrint ? (
        <div ref={printRef}>
          <PrintDailyReport
            data={reportsQuery?.data?.salesList}
            salesSummary={salesSummary}
            date={date}
            finalReportData={finalReportData}
            salesData={salesData}
            expenseData={expenseData}
          />
        </div>
      ) : (
        <>
          <div className={styles.summary_box}>
            <div className={styles.header_box}>
              <h2 className={styles.header}>Sales Report for {moment(date).format('ll')}</h2>
              <div className={styles.print_icon} onClick={() => onPrintHandler()}>
                <RiPrinterLine />
                <span className={styles.print_icon_text}>Print</span>
              </div>
            </div>
            <Table headers={SUMMARY_HEADER} data={finalReportData} />
          </div>
          {salesData?.length !== 0 && (
            <div className={styles.summary_box}>
              <div className={styles.header_box}>
                <h2 className={styles.header}>Sales Summary</h2>
              </div>
              <Table headers={SALES_COUNT_HEADER} data={salesData ? salesData : []} />
            </div>
          )}

          {expenseData?.length !== 0 && (
            <div className={styles.summary_box}>
              <div className={styles.header_box}>
                <h2 className={styles.header}>Expense List</h2>
              </div>
              <Table headers={EXPENSES_HEADER} data={expenseData} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DailyReportPage;
