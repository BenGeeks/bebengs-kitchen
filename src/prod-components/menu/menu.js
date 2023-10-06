'use client';
import React, { useState } from 'react';

import MenuToday from './menu-today';
import MenuList from './menu-list';
import MenuHistory from './menu-history';

import styles from './menu.module.css';

const MenuPage = () => {
  const [currentPage, setCurrentPage] = useState('today');

  return (
    <div className={styles.page_container}>
      <div className={styles.header_bar}>
        <div className={styles.page_nav_container}>
          <div className={currentPage === 'today' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('today')}>
            Today
          </div>
          <div className={currentPage === 'list' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('list')}>
            List
          </div>
          <div className={currentPage === 'history' ? styles.page_nav_active : styles.page_nav} onClick={() => setCurrentPage('history')}>
            History
          </div>
        </div>
      </div>
      <div className={styles.main_page}>
        {currentPage === 'today' && <MenuToday />}
        {currentPage === 'list' && <MenuList />}
        {currentPage === 'history' && <MenuHistory />}
      </div>
    </div>
  );
};

export default MenuPage;
