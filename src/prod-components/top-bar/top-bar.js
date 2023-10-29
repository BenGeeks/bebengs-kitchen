'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';

import pageStyles from '@/styles/page.module.css';
import iconStyles from '@/styles/icons.module.css';

import { IoFastFoodOutline } from 'react-icons/io5';
import { BsClipboardCheck } from 'react-icons/bs';
// import { FaRegMoneyBillAlt } from 'react-icons/fa';
// import { AiOutlineDashboard } from 'react-icons/ai';
import { PiHandCoins } from 'react-icons/pi';
import { RiContactsBookLine, RiLogoutCircleLine } from 'react-icons/ri';

const TopBar = ({ currentPage, setCurrentPage }) => {
  const [showNavBar, setShowNavBar] = useState(false);

  const ICON_LIST = [
    { name: 'sales', title: 'Sales', icon: <BsClipboardCheck /> },
    // { name: 'expenses', title: 'Expenses', icon: <FaRegMoneyBillAlt /> },
    { name: 'collectibles', title: 'Collectibles', icon: <PiHandCoins /> },
    { name: 'menu', title: 'Menu', icon: <IoFastFoodOutline /> },
    { name: 'customers', title: 'Customer', icon: <RiContactsBookLine /> },
    // { name: 'dashboard', title: 'Dashboard', icon: <AiOutlineDashboard /> },
  ];
  return (
    <div className={pageStyles.top_bar}>
      <div className={pageStyles.company_info_container}>
        <img src="/images/logo-144x144.png" alt="logo" className={pageStyles.company_logo} onClick={() => setShowNavBar(!showNavBar)} />
        <h1 className={pageStyles.company_name}>Bebeng's Kitchen</h1>
      </div>
      <div className={iconStyles.icons_container_top_bar}>
        {ICON_LIST.map((icon) => {
          return (
            <div
              key={icon.name}
              className={currentPage === icon.name ? iconStyles.icon_box_active : iconStyles.icon_box}
              title={icon.name}
              onClick={() => setCurrentPage(icon.name)}
            >
              <div className={iconStyles.icon}>{icon.icon}</div>
              <p className={iconStyles.icon_text}>{icon.title}</p>
            </div>
          );
        })}
        <div className={iconStyles.icon_box} title="logout" onClick={() => signOut()}>
          <div className={iconStyles.icon}>
            <RiLogoutCircleLine />
          </div>
          <p className={iconStyles.icon_text}>Logout</p>
        </div>
      </div>
      <div className={showNavBar ? iconStyles.icons_top_bar_show : iconStyles.icons_top_bar_hide}>
        {ICON_LIST.map((icon) => {
          return (
            <div
              key={icon.name}
              className={currentPage === icon.name ? iconStyles.icon_box_active : iconStyles.icon_box}
              title="Add order"
              onClick={() => {
                setCurrentPage(icon.name);
                setShowNavBar(false);
              }}
            >
              <div className={iconStyles.icon}>{icon.icon}</div>
              <p className={iconStyles.icon_text}>{icon.title}</p>
            </div>
          );
        })}
        <div className={iconStyles.icon_box} title="logout" onClick={() => signOut()}>
          <div className={iconStyles.icon}>
            <RiLogoutCircleLine />
          </div>
          <p className={iconStyles.icon_text}>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
