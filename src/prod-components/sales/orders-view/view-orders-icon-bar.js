'use client';
import { RiAddCircleLine } from 'react-icons/ri';
import { PiCalendar, PiCalendarBlank } from 'react-icons/pi';
import { MdDisplaySettings } from 'react-icons/md';

import iconStyles from '@/styles/icons-bar.module.css';

const OrdersIconBar = ({ currentPage, setCurrentPage, setOpenCalendar, onView }) => {
  return (
    <div className={iconStyles.icon_bar_container}>
      <div className={iconStyles.icon_box} title="Add order" onClick={() => setCurrentPage('new-order')}>
        <div className={iconStyles.icon}>
          <RiAddCircleLine />
        </div>
        <p className={iconStyles.icon_text}>New Order</p>
      </div>

      <div className={iconStyles.icon_box} title="Today" onClick={() => setCurrentPage('todays-list')}>
        <div className={currentPage === 'todays-list' ? iconStyles.icon_active : iconStyles.icon}>
          <PiCalendar />
        </div>
        <p className={iconStyles.icon_text}>Today</p>
      </div>

      <div
        className={iconStyles.icon_box}
        title="History"
        onClick={() => (currentPage === 'history-list' ? setOpenCalendar(true) : setCurrentPage('history-list'))}
      >
        <div className={currentPage === 'history-list' ? iconStyles.icon_active : iconStyles.icon}>
          <PiCalendarBlank />
        </div>
        <p className={iconStyles.icon_text}>History</p>
      </div>

      <div className={iconStyles.icon_box} title="View" onClick={onView}>
        <div className={iconStyles.icon}>
          <MdDisplaySettings />
        </div>
        <p className={iconStyles.icon_text}>View</p>
      </div>
    </div>
  );
};

export default OrdersIconBar;
