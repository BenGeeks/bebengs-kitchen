import moment from 'moment';

import Table from '@/assets/table';
import { COLLECTIBLE_HEADER, COUNT_HEADER } from '@/resources/side-bar';
import sideStyles from '@/styles/side-bar.module.css';

const OrdersSideBar = ({ salesCount, collectibleData, salesData, viewReport, calendarDate }) => {
  return (
    <div className={`${sideStyles.container} ${viewReport && sideStyles.show}`}>
      <div className={sideStyles.date}>{moment(calendarDate).format('MMM DD, yyyy')}</div>
      <div className={sideStyles.summary_box}>
        <div className={sideStyles.total_box}>
          <div className={sideStyles.total_item_container}>
            <div className={sideStyles.total_item_label}>Cash</div>
            <div className={sideStyles.total_item_value}>{salesData?.cashTotal.toLocaleString('en-US')}</div>
          </div>
          <div className={sideStyles.total_item_container}>
            <div className={sideStyles.total_item_label}>G-cash</div>
            <div className={sideStyles.total_item_value}>{salesData?.gCashTotal.toLocaleString('en-US')}</div>
          </div>
          <div className={sideStyles.total_item_container}>
            <div className={sideStyles.total_item_label}>Total</div>
            <div className={sideStyles.total_item_value}>{salesData?.dailyTotal.toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
      <div className={sideStyles.summary_box}>
        <div className={sideStyles.header_box}>
          <h2 className={sideStyles.header}>Today's Collectible</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={COLLECTIBLE_HEADER} data={collectibleData} />
        </div>
      </div>
      <div className={sideStyles.summary_box}>
        <div className={sideStyles.header_box}>
          <h2 className={sideStyles.header}>Sales Count Summary</h2>
        </div>
        <div className={sideStyles.table_container}>
          <Table headers={COUNT_HEADER} data={salesCount} />
        </div>
      </div>
    </div>
  );
};

export default OrdersSideBar;
