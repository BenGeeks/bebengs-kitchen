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
import styles from './dashboard.module.css';
import apiRequest from '@/lib/axios';

const DashboardPage = () => {
  const [total, setTotal] = useState([]);

  const getTotal = (report) => {
    let totalSales = 0;
    let totalExpense = 0;
    report.forEach((data) => {
      totalSales = totalSales + data.sales;
      totalExpense = totalExpense + data.expenses;
    });
    setTotal([
      { name: 'Total Sales', value: totalSales },
      { name: 'Total Expenses', value: totalExpense },
    ]);
  };

  const dashboardQuery = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiRequest({ url: 'dashboard', method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => getTotal(data),
  });

  if (dashboardQuery.isLoading)
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

  if (dashboardQuery.isError)
    return (
      <>
        <div className={styles.page_container}>
          <Error error={dashboardQuery.error} />
        </div>
        <div className={styles.page_container_mobile}>
          <Error error={dashboardQuery.error} />
        </div>
      </>
    );

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.double}>
          <TotalSalesExpensesPieGraph total={total} />
          <PerformancePieGraphWithNeedle report={dashboardQuery?.data} />
        </div>
        <ProfitRunningAverageLineGraph data={dashboardQuery?.data} />
        <SalesExpensesBarGraph data={dashboardQuery?.data} />
      </div>
      <div className={styles.page_container_mobile}>
        <PerformancePieGraphWithNeedleMobile report={dashboardQuery?.data} />
        <TotalSalesExpensesPieGraphMobile total={total} />
        <ProfitRunningAverageLineGraphMobile data={dashboardQuery?.data} />
        <SalesExpensesBarGraphMobile data={dashboardQuery?.data} />
      </div>
    </>
  );
};

export default DashboardPage;
