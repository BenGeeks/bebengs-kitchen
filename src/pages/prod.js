'use client';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

import Collectibles from '@/prod-components/collectibles/collectibles';
import CustomerPage from '@/prod-components/customer/customer';
import ReportsPage from '@/prod-components/reports.js/reports';
import FutureOrders from '@/prod-components/orders/orders';
import Expenses from '@/prod-components/expenses/expenses';
import TopBar from '@/prod-components/top-bar/top-bar';
import SalesPage from '@/prod-components/sales/sales';
import MenuPage from '@/prod-components/menu/menu';
import DashboardPage from '@/prod-components/dashboard/dashboard';

import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className={styles.main_container}>
      <TopBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={styles.page_container}>
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'sales' && <SalesPage />}
        {currentPage === 'menu' && <MenuPage />}
        {currentPage === 'customers' && <CustomerPage />}
        {currentPage === 'collectibles' && <Collectibles />}
        {currentPage === 'orders' && <FutureOrders />}
        {currentPage === 'expenses' && <Expenses />}
        {currentPage === 'reports' && <ReportsPage />}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export default ProdPage;
