import React from 'react';

import styles from '@/styles/prod.module.css';

import { GiHamburgerMenu } from 'react-icons/gi';

const NavigationBar = ({ showNav, setShowNav, currentPage, setCurrentPage }) => {
  return (
    <div
      className={styles.main_bar}
      onMouseLeave={() => {
        setShowNav(false);
      }}
    >
      <h1 className={styles.logo}>Bebeng's Kitchen</h1>
      <div
        className={showNav ? styles.nav_bar_mobile : styles.nav_bar}
        onMouseLeave={() => {
          setShowNav(false);
        }}
      >
        <div
          className={currentPage === 'orders' ? (showNav ? styles.nav_active_mobile : styles.nav_active) : styles.nav}
          onClick={() => setCurrentPage('orders')}
        >
          Sales
        </div>
        <div
          className={currentPage === 'collectibles' ? (showNav ? styles.nav_active_mobile : styles.nav_active) : styles.nav}
          onClick={() => setCurrentPage('collectibles')}
        >
          Collectibles
        </div>
        <div
          className={currentPage === 'daily_menu' ? (showNav ? styles.nav_active_mobile : styles.nav_active) : styles.nav}
          onClick={() => setCurrentPage('daily_menu')}
        >
          Daily Menu
        </div>
        <div
          className={currentPage === 'menu' ? (showNav ? styles.nav_active_mobile : styles.nav_active) : styles.nav}
          onClick={() => setCurrentPage('menu')}
        >
          Menu
        </div>
        <div
          className={currentPage === 'customers' ? (showNav ? styles.nav_active_mobile : styles.nav_active) : styles.nav}
          onClick={() => setCurrentPage('customers')}
        >
          Customers
        </div>
      </div>
      <div
        className={styles.hamburger}
        onClick={() => setShowNav(!showNav)}
        onMouseOver={() => {
          setShowNav(true);
        }}
      >
        <GiHamburgerMenu />
      </div>
    </div>
  );
};

export default NavigationBar;
