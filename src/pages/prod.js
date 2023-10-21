'use client';
import { useState } from 'react';

import TopBar from '@/prod-components/top-bar/top-bar';
import CustomerPage from '@/prod-components/customer/customer';
import MenuList from '@/prod-components/menu/menu-list';
import Orders from '@/prod-components/order/orders';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');

  return (
    <div className={styles.main_container}>
      <TopBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={styles.page_container}>
        {currentPage === 'orders' && <Orders />}
        {currentPage === 'menu' && <MenuList menuQuery={menuQuery} />}
        {currentPage === 'customers' && <CustomerPage />}
      </div>
    </div>
  );
};

export default ProdPage;
