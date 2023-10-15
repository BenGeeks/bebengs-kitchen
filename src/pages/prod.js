'use client';
import { useState } from 'react';

import NavigationBar from '@/prod-components/navigation';
import CustomersList from '@/prod-components/customer/customer-list';
import MenuList from '@/prod-components/menu/menu-list';
import OrderToday from '@/prod-components/order/today/order-today';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [showNav, setShowNav] = useState(false);

  return (
    <div className={styles.page_holder}>
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} showNav={showNav} setShowNav={setShowNav} />

      {currentPage === 'orders' && <OrderToday />}
      {currentPage === 'menu' && <MenuList />}
      {currentPage === 'customers' && <CustomersList />}
    </div>
  );
};

export default ProdPage;
