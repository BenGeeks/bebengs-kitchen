'use client';
import { useState } from 'react';

import NavigationBar from '@/prod-components/navigation';
import OrdersPage from '@/prod-components/Sales/Orders';
import CollectiblesPage from '@/prod-components/Sales/Collectibles';
import DailyMenuPage from '@/prod-components/menu/daily-menu';
import MenuPage from '@/prod-components/menu/menu';
import CustomersListPage from '@/prod-components/customers/customers';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [showNav, setShowNav] = useState(false);

  return (
    <div className={styles.page_holder}>
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} showNav={showNav} setShowNav={setShowNav} />

      {currentPage === 'orders' && <OrdersPage />}
      {currentPage === 'collectibles' && <CollectiblesPage />}
      {currentPage === 'daily_menu' && <DailyMenuPage />}
      {currentPage === 'menu' && <MenuPage />}
      {currentPage === 'customers' && <CustomersListPage />}
    </div>
  );
};

export default ProdPage;
