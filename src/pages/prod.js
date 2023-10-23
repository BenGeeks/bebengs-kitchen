'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import LoadingPage from '@/assets/loading';
import TopBar from '@/prod-components/top-bar/top-bar';
import CustomerPage from '@/prod-components/customer/customer';
import MenuPage from '@/prod-components/menu/menu';
import Orders from '@/prod-components/order/orders';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('orders');

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/login');
    },
  });

  if (status === 'loading') return <LoadingPage />;

  return (
    <div className={styles.main_container}>
      <TopBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={styles.page_container}>
        {currentPage === 'orders' && <Orders />}
        {currentPage === 'menu' && <MenuPage />}
        {currentPage === 'customers' && <CustomerPage />}
      </div>
    </div>
  );
};

export default ProdPage;
