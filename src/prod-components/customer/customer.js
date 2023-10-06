'use client';
import React, { useState } from 'react';

import CustomersList from './customer-list';
import styles from './customer.module.css';

const CustomerPage = () => {
  const [currentPage, setCurrentPage] = useState('list');
  return (
    <div className={styles.page_container}>
      <div className={styles.header_bar}>
        <div className={styles.page_nav_container}>
          <div className={currentPage === 'list' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('list')}>
            List
          </div>
        </div>
      </div>
      <div className={styles.main_page}>{currentPage === 'list' && <CustomersList />}</div>
    </div>
  );
};

export default CustomerPage;
