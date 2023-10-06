'use client';
import { useState } from 'react';

import NavigationBar from '@/prod-components/navigation';
import OrderPage from '@/prod-components/order/order';
import MenuPage from '@/prod-components/menu/menu';
import CustomerPage from '@/prod-components/customer/customer';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [showNav, setShowNav] = useState(false);
  console.log(currentPage);

  return (
    <div className={styles.page_holder}>
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} showNav={showNav} setShowNav={setShowNav} />

      {currentPage === 'orders' && <OrderPage />}
      {currentPage === 'menu' && <MenuPage />}
      {currentPage === 'customers' && <CustomerPage />}
    </div>
  );
};

export default ProdPage;
