import { RiAddCircleLine, RiPrinterLine, RiCalendar2Line, RiMenuLine } from 'react-icons/ri';
import { PiCalendar } from 'react-icons/pi';
import React, { useState } from 'react';

import iconStyles from '@/styles/icons.module.css';
import moment from 'moment';

const ExpensesIconBar = ({ onAddExpense, setOpenDatePicker, today, onPrint }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className={showIcons ? iconStyles.order_bar_icon_container : iconStyles.order_bar_icon_container_hidden}>
      <div className={iconStyles.order_bar_hamburger_icon} title="Actions" onClick={() => setShowIcons(!showIcons)}>
        <div className={iconStyles.order_right_icon}>
          <RiMenuLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Actions</p>
      </div>

      <div className={iconStyles.order_right_icon_box} title="Add order" onClick={onAddExpense}>
        <div className={iconStyles.order_right_icon}>
          <RiAddCircleLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>+ Expense</p>
      </div>

      <div className={iconStyles.order_right_icon_box} title="Today" onClick={() => today(moment())}>
        <div className={iconStyles.order_right_icon}>
          <PiCalendar />
        </div>
        <p className={iconStyles.order_right_icon_text}>Today</p>
      </div>
      <div className={iconStyles.order_right_icon_box} title="History" onClick={() => setOpenDatePicker(true)}>
        <div className={iconStyles.order_right_icon}>
          <RiCalendar2Line />
        </div>
        <p className={iconStyles.order_right_icon_text}>History</p>
      </div>
      <div className={iconStyles.order_right_icon_box} title="Print" onClick={onPrint}>
        <div className={iconStyles.order_right_icon}>
          <RiPrinterLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Print</p>
      </div>
    </div>
  );
};

export default ExpensesIconBar;
