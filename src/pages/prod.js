'use client';
import { useState } from 'react';

import NavigationBar from '@/prod-components/navigation';
import OrdersPage from '@/prod-components/Sales/Orders';
import CollectiblesPage from '@/prod-components/Sales/Collectibles';
import MenuPage from '@/prod-components/menu/menu';
import CustomersListPage from '@/prod-components/customer/customer-list';
import styles from '@/styles/prod.module.css';

const ProdPage = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [showNav, setShowNav] = useState(false);
  console.log(currentPage);

  return (
    <div className={styles.page_holder}>
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} showNav={showNav} setShowNav={setShowNav} />

      {currentPage === 'orders' && <OrdersPage />}
      {currentPage === 'collectibles' && <CollectiblesPage />}
      {currentPage === 'menu' && <MenuPage />}
      {currentPage === 'customers' && <CustomersListPage />}
    </div>
  );
};

export default ProdPage;
