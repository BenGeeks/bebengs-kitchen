'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

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

const DashboardPage = ({ filterBy, filterValue, openDashboardCalendar, year, quarter, month }) => {
  const [total, setTotal] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);

  const dashboardReportQuery = useQuery({
    queryKey: ['dashboardReport'],
    enabled: !openDashboardCalendar,
    queryFn: () =>
      apiRequest({ url: `reports/dashboard?filterBy=${filterBy}&filterValue=${filterValue}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => {
      setTotal(getTotal(data));
      setWeeklyReport(getWeeklyReport(data));
      setMonthlyReport(getMonthlyReport(data));
    },
  });

  const getHeaderDisplay = () => {
    if (filterBy === 'year') return year;
    if (filterBy === 'quarter') return `Q${quarter} of ${year}`;
    if (filterBy === 'month') return `${moment({ month }).format('MMMM')} ${year}`;
  };

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
        <h1 className={styles.page_header}>{getHeaderDisplay()}</h1>
        <br />
        <div className={styles.double}>
          <TotalSalesExpensesPieGraph total={total} />
          <PerformancePieGraphWithNeedle report={weeklyReport} />
        </div>
        <SalesExpensesBarGraph data={weeklyReport} title="Weekly Sales Graph" />
        <SalesExpensesBarGraph data={monthlyReport} title="Monthly Sales Graph" />
      </div>
      <div className={styles.page_container_mobile}>
        <h1 className={styles.page_header}>{getHeaderDisplay()}</h1>
        <PerformancePieGraphWithNeedleMobile report={weeklyReport} />
        <TotalSalesExpensesPieGraphMobile total={total} />
        <SalesExpensesBarGraphMobile data={weeklyReport} title="Weekly Sales Graph" />
        <SalesExpensesBarGraphMobile data={monthlyReport} title="Monthly Sales Graph" />
      </div>
    </>
  );
};

export default DashboardPage;
