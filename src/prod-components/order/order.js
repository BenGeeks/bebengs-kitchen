'use client';
import React, { useState } from 'react';

import OrderToday from './order-today';
import OrderCollectibles from './order-collectibles';
import OrderFuture from './order-future';
import OrderHistory from './order-history';

import styles from './order.module.css';

const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState('today');
  return (
    <div className={styles.page_container}>
      <div className={styles.header_bar}>
        <div className={styles.page_nav_container}>
          <div className={currentPage === 'today' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('today')}>
            Today
          </div>
          <div className={currentPage === 'list' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('list')}>
            Collectibles
          </div>
          <div className={currentPage === 'future' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('future')}>
            Future
          </div>
          <div className={currentPage === 'history' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('history')}>
            History
          </div>
        </div>
      </div>
      <div className={styles.main_page}>
        {currentPage === 'today' && <OrderToday />}
        {currentPage === 'list' && <OrderCollectibles />}
        {currentPage === 'future' && <OrderFuture />}
        {currentPage === 'history' && <OrderHistory />}
      </div>
    </div>
  );
};

export default OrderPage;
