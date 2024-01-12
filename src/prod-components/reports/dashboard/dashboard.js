'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import TotalSalesExpensesPieGraph from './graphs/total-sales-expenses';
import PerformancePieGraphWithNeedle from './graphs/performance';
import SalesExpensesBarGraph from './graphs/sales-expenses';
import { Loader, Error } from '@/assets/loader-error';

import TotalSalesExpensesPieGraphMobile from './graphs-mobile/total-sales-expenses';
import PerformancePieGraphWithNeedleMobile from './graphs-mobile/performance';
import SalesExpensesBarGraphMobile from './graphs-mobile/sales-expense';

import { getTotal, getWeeklyReport, getMonthlyReport } from './resources';
import styles from './dashboard.module.css';
import apiRequest from '@/lib/axios';

const DashboardPage = ({ date, filterBy, filterValue }) => {
  const [total, setTotal] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);

  // const yearReportQuery = useQuery({
  //   queryKey: ['yearReport'],
  //   queryFn: () => apiRequest({ url: `reports/year/${date.year}`, method: 'GET' }).then((res) => res.data),
  //   onSuccess: (data) => {
  //     setTotal(getTotal(data));
  //     setWeeklyReport(getWeeklyReport(data));
  //     setMonthlyReport(getMonthlyReport(data));
  //   },
  // });

  const dashboardReportQuery = useQuery({
    queryKey: ['dashboardReport'],
    queryFn: () =>
      apiRequest({ url: `reports/dashboard?by=${filterBy}&filterValue=${filterValue}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => {
      setTotal(getTotal(data));
      setWeeklyReport(getWeeklyReport(data));
      setMonthlyReport(getMonthlyReport(data));
    },
  });

  if (dashboardReportQuery.isLoading)
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

  if (dashboardReportQuery.isError)
    return (
      <>
        <div className={styles.page_container}>
          <Error error={dashboardReportQuery.error} />
        </div>
        <div className={styles.page_container_mobile}>
          <Error error={dashboardReportQuery.error} />
        </div>
      </>
    );

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.double}>
          <TotalSalesExpensesPieGraph total={total} />
          <PerformancePieGraphWithNeedle report={weeklyReport} />
        </div>
        <SalesExpensesBarGraph data={weeklyReport} title="Weekly Sales Graph" />
        <SalesExpensesBarGraph data={monthlyReport} title="Monthly Sales Graph" />
      </div>
      <div className={styles.page_container_mobile}>
        <PerformancePieGraphWithNeedleMobile report={weeklyReport} />
        <TotalSalesExpensesPieGraphMobile total={total} />
        <SalesExpensesBarGraphMobile data={weeklyReport} title="Weekly Sales Graph" />
        <SalesExpensesBarGraphMobile data={monthlyReport} title="Monthly Sales Graph" />
      </div>
    </>
  );
};

export default DashboardPage;
