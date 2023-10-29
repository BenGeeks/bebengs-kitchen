import { RiAddCircleLine, RiPrinterLine, RiCalendar2Line, RiMenuLine } from 'react-icons/ri';
import { PiCalendar } from 'react-icons/pi';
import { LuFilter } from 'react-icons/lu';
import React, { useState } from 'react';

import iconStyles from '@/styles/icons.module.css';

const OrdersIconBar = ({ setCurrentPage, currentPage, setOpenCalendar }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className={showIcons ? iconStyles.order_bar_icon_container : iconStyles.order_bar_icon_container_hidden}>
      <div className={iconStyles.order_bar_hamburger_icon} title="Actions" onClick={() => setShowIcons(!showIcons)}>
        <div className={iconStyles.order_right_icon}>
          <RiMenuLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Actions</p>
      </div>

      <div className={iconStyles.order_right_icon_box} title="Add order" onClick={() => setCurrentPage('new-order')}>
        <div className={iconStyles.order_right_icon}>
          <RiAddCircleLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>New Order</p>
      </div>

      <div
        className={currentPage === 'todays-list' ? iconStyles.order_right_icon_box_active : iconStyles.order_right_icon_box}
        title="Today"
        onClick={() => setCurrentPage('todays-list')}
      >
        <div className={iconStyles.order_right_icon}>
          <PiCalendar />
        </div>
        <p className={iconStyles.order_right_icon_text}>Today</p>
      </div>
      <div
        className={currentPage === 'history-list' ? iconStyles.order_right_icon_box_active : iconStyles.order_right_icon_box}
        title="History"
        onClick={() => (currentPage === 'history-list' ? setOpenCalendar(true) : setCurrentPage('history-list'))}
      >
        <div className={iconStyles.order_right_icon}>
          <RiCalendar2Line />
        </div>
        <p className={iconStyles.order_right_icon_text}>History</p>
      </div>
      <div className={iconStyles.order_right_icon_box} title="Filter">
        <div className={iconStyles.order_right_icon}>
          <LuFilter />
        </div>
        <p className={iconStyles.order_right_icon_text}>Filter</p>
      </div>
      <div className={iconStyles.order_right_icon_box} title="Print">
        <div className={iconStyles.order_right_icon}>
          <RiPrinterLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Print</p>
      </div>
    </div>
  );
};

export default OrdersIconBar;
