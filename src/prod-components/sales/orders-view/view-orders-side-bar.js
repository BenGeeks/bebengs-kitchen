'use client';
import moment from 'moment';

import { COLLECTIBLE_HEADER, COUNT_HEADER } from '../resources';
import { Loader, Error } from '@/assets/loader-error';
import styles from '../sales.module.css';
import Table from '@/assets/table';

const OrdersSideBar = ({ orderQuery, salesCount, collectibleData, salesData, calendarDate, width, leftWidth }) => {
  if (orderQuery.isLoading)
    return (
      <div className={styles.container} style={{ width: width }}>
        <Loader />
      </div>
    );

  if (orderQuery.isError)
    return (
      <div className={styles.container} style={{ width: width }}>
        <Error error={orderQuery.error} />
      </div>
    );

  return (
    <div className={styles.container} style={{ width: width }}>
      <div className={styles.date}>{moment(calendarDate).format('ll')}</div>
      <div className={styles.summary_box}>
        <div
          className={styles.total_box}
          style={{ gridTemplateColumns: salesData?.dpTotal === 0 ? 'auto auto auto' : 'auto auto auto auto' }}
        >
          <div className={styles.total_item_container}>
            <div className={styles.total_item_label}>Cash</div>
            <div className={styles.total_item_value}>{salesData?.cashTotal.toLocaleString('en-US')}</div>
          </div>
          <div className={styles.total_item_container}>
            <div className={styles.total_item_label}>G-cash</div>
            <div className={styles.total_item_value}>{salesData?.gCashTotal.toLocaleString('en-US')}</div>
          </div>
          {salesData?.dpTotal !== 0 && (
            <div className={styles.total_item_container}>
              <div className={styles.total_item_label}>Down Payment</div>
              <div className={styles.total_item_value}>{salesData?.dpTotal?.toLocaleString('en-US')}</div>
            </div>
          )}

          <div className={styles.total_item_container}>
            <div className={styles.total_item_label}>Total</div>
            <div className={styles.total_item_value}>{salesData?.dailyTotal.toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
      {collectibleData.length !== 0 && (
        <div className={styles.summary_box}>
          <div className={styles.header_box}>
            <h2 className={styles.header}>Today's Collectible</h2>
          </div>
          <Table headers={COLLECTIBLE_HEADER} data={collectibleData} />
        </div>
      )}

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
