'use client';
import { PiCalendar } from 'react-icons/pi';
import { RiPrinterLine } from 'react-icons/ri';

import iconStyles from '@/styles/icons-bar.module.css';

const ReportsIconBar = ({ setOpenCalendar }) => {
  return (
    <div className={iconStyles.icon_bar_container}>
      <div className={iconStyles.icon_box} title="calendar" onClick={() => setOpenCalendar(true)}>
        <div className={iconStyles.icon}>
          <PiCalendar />
        </div>
        <p className={iconStyles.icon_text}>Calendar</p>
      </div>

      <div className={iconStyles.icon_box} title="Print">
        <div className={iconStyles.icon}>
          <RiPrinterLine />
        </div>
        <p className={iconStyles.icon_text}>Print</p>
      </div>
    </div>
  );
};

export default ReportsIconBar;
