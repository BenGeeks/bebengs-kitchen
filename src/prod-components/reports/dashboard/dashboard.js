'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProfitRunningAverageLineGraph from './graphs/profit-running-average';
import TotalSalesExpensesPieGraph from './graphs/total-sales-expenses';
import PerformancePieGraphWithNeedle from './graphs/performance';
import SalesExpensesBarGraph from './graphs/sales-expenses';
import { Loader, Error } from '@/assets/loader-error';

import ProfitRunningAverageLineGraphMobile from './graphs-mobile/profit-running-average';
import TotalSalesExpensesPieGraphMobile from './graphs-mobile/total-sales-expenses';
import PerformancePieGraphWithNeedleMobile from './graphs-mobile/performance';
import SalesExpensesBarGraphMobile from './graphs-mobile/sales-expense';

import { getTotal, getReport } from './resources';
import styles from './dashboard.module.css';
import apiRequest from '@/lib/axios';

const DashboardPage = ({ date }) => {
  const [total, setTotal] = useState(null);
  const [report, setReport] = useState([]);

  const yearReportQuery = useQuery({
    queryKey: ['yearReport'],
    queryFn: () => apiRequest({ url: `reports/year/${date.year}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => {
      setTotal(getTotal(data));
      setReport(getReport(data));
    },
  });

  if (yearReportQuery.isLoading)
    return (
      <>
        <div className={styles.page_container}>
          <Loader />
        </div>
        <div className={styles.page_container_mobile}>
          <Loader />
        </div>
      </>
    );

  if (yearReportQuery.isError)
    return (
      <>
        <div className={styles.page_container}>
          <Error error={yearReportQuery.error} />
        </div>
        <div className={styles.page_container_mobile}>
          <Error error={yearReportQuery.error} />
        </div>
      </>
    );

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.double}>
          <TotalSalesExpensesPieGraph total={total} />
          <PerformancePieGraphWithNeedle report={report} />
        </div>
        <ProfitRunningAverageLineGraph data={report} />
        <SalesExpensesBarGraph data={report} />
      </div>
      <div className={styles.page_container_mobile}>
        <PerformancePieGraphWithNeedleMobile report={report} />
        <TotalSalesExpensesPieGraphMobile total={total} />
        <ProfitRunningAverageLineGraphMobile data={report} />
        <SalesExpensesBarGraphMobile data={report} />
      </div>
    </>
  );
};

export default DashboardPage;
