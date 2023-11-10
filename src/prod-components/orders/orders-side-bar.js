'use client';
import moment from 'moment';

import { Loader, Error } from '@/assets/loader-error';
import Table from '@/assets/table';

import { FUTURE_ORDERS_HEADER, getTotal } from './resources';

import styles from './orders.module.css';

const FutureOrdersSideBar = ({ futureOrdersQuery, summary }) => {
  if (futureOrdersQuery.isLoading)
    return (
      <div className={styles.side_bar_container}>
        <Loader />
      </div>
    );

  if (futureOrdersQuery.isError)
    return (
      <div className={styles.side_bar_container}>
        <Error error={futureOrdersQuery.error} />
      </div>
    );

  return (
    <div className={styles.side_bar_container}>
      <div className={styles.side_bar_header}>Total Orders</div>
      <div className={styles.summary_box}>
        <div className={styles.total_box}>
          <div className={styles.total_item_container}>
            <div className={styles.total_item_value}>{getTotal(futureOrdersQuery.data)}</div>
          </div>
        </div>
      </div>
      {Object.keys(summary).map((date) => {
        return (
          <div key={date} className={styles.summary_box}>
            <div className={styles.header_box}>
              <h2 className={styles.header}>{moment(date).format('MMM DD, YYYY')}</h2>
            </div>
            <Table headers={FUTURE_ORDERS_HEADER} data={summary[date]} />
          </div>
        );
      })}
    </div>
  );
};

export default FutureOrdersSideBar;
