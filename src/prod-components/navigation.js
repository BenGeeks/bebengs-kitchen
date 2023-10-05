import React from 'react';

import styles from '@/styles/prod.module.css';

import { GiHamburgerMenu } from 'react-icons/gi';

const NavigationBar = ({ showNav, setShowNav, currentPage, setCurrentPage }) => {
  const pages = [
    { name: 'orders', display: 'Orders' },
    { name: 'menu', display: 'Menu' },
    { name: 'customers', display: 'Customers' },
  ];
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
        {pages.map((page) => {
          return (
            <div
              key={page.name}
              className={currentPage === page.name ? (showNav ? styles.nav_active_mobile : styles.nav_active) : styles.nav}
              onClick={() => setCurrentPage(page.name)}
            >
              {page.display}
            </div>
          );
        })}
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
