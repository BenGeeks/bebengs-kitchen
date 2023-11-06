import Table from '@/assets/table';

import { FUTURE_ORDERS_HEADER } from '@/resources/orders';

import styles from './orders.module.css';
import moment from 'moment';

const FutureOrdersSideBar = ({ futureOrdersQuery, summary }) => {
  let total = futureOrdersQuery?.data?.reduce((total, data) => data.total + total, 0);
  return (
    <div className={styles.side_bar_container}>
      <div className={styles.side_bar_header}>Total Orders</div>
      <div className={styles.summary_box}>
        <div className={styles.total_box}>
          <div className={styles.total_item_container}>
            <div className={styles.total_item_value}>{total?.toLocaleString('en-US')}</div>
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
