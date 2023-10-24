'use client';
import { useState } from 'react';
import { getSession } from 'next-auth/react';

import TopBar from '@/prod-components/top-bar/top-bar';
import CustomerPage from '@/prod-components/customer/customer';
import MenuPage from '@/prod-components/menu/menu';
import OrdersPage from '@/prod-components/order/orders';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');

  return (
    <div className={styles.main_container}>
      <TopBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={styles.page_container}>
        {currentPage === 'orders' && <OrdersPage />}
        {currentPage === 'menu' && <MenuPage />}
        {currentPage === 'customers' && <CustomerPage />}
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
