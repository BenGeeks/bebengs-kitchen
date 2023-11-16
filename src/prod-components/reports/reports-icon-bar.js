'use client';
import { BsCalendarDate, BsCalendarMonth } from 'react-icons/bs';

import iconStyles from '@/styles/icons-bar.module.css';

const ReportsIconBar = ({ setOpenDailyCalendar, setOpenMonthlyCalendar, currentPage, setCurrentPage, setPrint }) => {
  return (
    <div className={iconStyles.icon_bar_container}>
      <div
        className={iconStyles.icon_box}
        title="daily"
        onClick={() => (currentPage === 'daily' ? setOpenDailyCalendar(true) : setCurrentPage('daily'))}
      >
        <div className={iconStyles.icon}>
          <BsCalendarDate />
        </div>
        <p className={iconStyles.icon_text}>Daily</p>
      </div>
      <div
        className={iconStyles.icon_box}
        title="monthly"
        onClick={() => (currentPage === 'monthly' ? setOpenMonthlyCalendar(true) : setCurrentPage('monthly'))}
      >
        <div className={iconStyles.icon}>
          <BsCalendarMonth />
        </div>
        <p className={iconStyles.icon_text}>Monthly</p>
      </div>
    </div>
  );
};

export default ReportsIconBar;
