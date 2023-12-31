'use client';
import { RiContactsBookLine, RiLogoutCircleLine } from 'react-icons/ri';
import { BsClipboardCheck, BsGraphUpArrow } from 'react-icons/bs';
import { GiChickenOven, GiHamburgerMenu } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { PiHandCoins } from 'react-icons/pi';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import Image from 'next/image';

import LoadingMain from '@/assets/loading-main';
import styles from './top-bar.module.css';

const TopBar = ({ currentPage, setCurrentPage, showNavBar, setShowNavBar }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSignOutHandler = () => {
    setIsLoading(true);
    setTimeout(() => signOut(), 100);
  };

  const ICON_LIST = [
    { name: 'sales', title: 'Sales', icon: <BsClipboardCheck /> },
    { name: 'collectibles', title: 'Collectibles', icon: <PiHandCoins /> },
    { name: 'orders', title: 'Orders', icon: <GiChickenOven /> },
    { name: 'expenses', title: 'Expenses', icon: <FaRegMoneyBillAlt /> },
    { name: 'menu', title: 'Menu', icon: <IoFastFoodOutline /> },
    { name: 'customers', title: 'Customer', icon: <RiContactsBookLine /> },
    { name: 'reports', title: 'Reports', icon: <BsGraphUpArrow /> },
  ];
  return (
    <>
      <LoadingMain open={isLoading} />
      <div className={styles.top_bar}>
        <div className={styles.company_info_container}>
          <Image className={styles.logo_image} src="/images/logos/logo_256x256.png" alt="bebengs kitchens logo" width={50} height={50} />
          <h1 className={styles.company_name}>Bebeng's Kitchen</h1>
        </div>
        <div className={styles.icons_container}>
          {ICON_LIST.map((icon) => {
            return (
              <div key={icon.name} className={currentPage === icon.name ? styles.icon_box_active : styles.icon_box} title={icon.name} onClick={() => setCurrentPage(icon.name)}>
                <div className={styles.icon}>{icon.icon}</div>
                <p className={styles.icon_text}>{icon.title}</p>
              </div>
            );
          })}
          <div className={styles.icon_box} title="logout" onClick={onSignOutHandler}>
            <div className={styles.icon}>
              <RiLogoutCircleLine />
            </div>
            <p className={styles.icon_text}>Logout</p>
          </div>
        </div>
        <div className={styles.hamburger_icon} title="Nav" onClick={() => setShowNavBar((prev) => !prev)}>
          <div className={styles.icon}>
            <GiHamburgerMenu />
          </div>
        </div>

        <div className={showNavBar ? styles.icons_top_bar_show : styles.icons_top_bar_hide} onMouseLeave={() => setShowNavBar(false)}>
          {ICON_LIST.map((icon) => {
            return (
              <div
                key={icon.name}
                className={currentPage === icon.name ? styles.icon_box_active : styles.icon_box}
                title="Add order"
                onClick={() => {
                  setCurrentPage(icon.name);
                  setShowNavBar(false);
                }}
              >
                <div className={styles.icon}>{icon.icon}</div>
                <p className={styles.icon_text}>{icon.title}</p>
              </div>
            );
          })}
          <div className={styles.icon_box_logout} title="logout" onClick={onSignOutHandler}>
            <div className={styles.icon}>
              <RiLogoutCircleLine />
            </div>
            <p className={styles.icon_text}>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
