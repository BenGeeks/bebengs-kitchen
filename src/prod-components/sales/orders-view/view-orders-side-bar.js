'use client';
import moment from 'moment';

import Table from '@/assets/table';
import { COLLECTIBLE_HEADER, COUNT_HEADER } from '@/resources/side-bar';
import styles from '../sales.module.css';

const OrdersSideBar = ({ salesCount, collectibleData, salesData, calendarDate, width }) => {
  return (
    <div className={styles.container} style={{ width: width }}>
      <div className={styles.date}>{moment(calendarDate).format('MMM DD, yyyy')}</div>
      <div className={styles.summary_box}>
        <div className={styles.total_box}>
          <div className={styles.total_item_container}>
            <div className={styles.total_item_label}>Cash</div>
            <div className={styles.total_item_value}>{salesData?.cashTotal.toLocaleString('en-US')}</div>
          </div>
          <div className={styles.total_item_container}>
            <div className={styles.total_item_label}>G-cash</div>
            <div className={styles.total_item_value}>{salesData?.gCashTotal.toLocaleString('en-US')}</div>
          </div>
          <div className={styles.total_item_container}>
            <div className={styles.total_item_label}>Total</div>
            <div className={styles.total_item_value}>{salesData?.dailyTotal.toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Today's Collectible</h2>
        </div>
        <Table headers={COLLECTIBLE_HEADER} data={collectibleData} />
      </div>
      <div className={styles.summary_box}>
        <div className={styles.header_box}>
          <h2 className={styles.header}>Sales Count Summary</h2>
        </div>
        <Table headers={COUNT_HEADER} data={salesCount} />
      </div>
    </div>
  );
};

export default OrdersSideBar;
