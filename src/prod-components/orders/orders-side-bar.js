import Table from '@/assets/table';

import { ORDER_ITEMS_HEADER, FUTURE_ORDERS_HEADER } from '@/resources/orders';

import futureOrdersStyles from '@/styles/future-orders.module.css';
import sideStyles from '@/styles/side-bar.module.css';
import moment from 'moment';

const FutureOrdersSideBar = ({ selectedOrder, futureOrdersQuery, summary }) => {
  let total = futureOrdersQuery?.data?.reduce((total, data) => data.total + total, 0);
  return (
    <div className={futureOrdersStyles.side_bar_container}>
      <div className={sideStyles.date}>Total Orders</div>
      <div className={futureOrdersStyles.summary_box}>
        <div className={sideStyles.total_box}>
          <div className={sideStyles.total_item_container}>
            <div className={sideStyles.total_item_value}>{total?.toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
      {Object.keys(summary).map((date) => {
        return (
          <div key={date} className={sideStyles.summary_box}>
            <div className={sideStyles.header_box}>
              <h2 className={sideStyles.header}>{moment(date).format('MMM DD, YYYY')}</h2>
            </div>
            <div className={sideStyles.table_container}>
              <Table headers={FUTURE_ORDERS_HEADER} data={summary[date]} />
            </div>
          </div>
        );
      })}

      {selectedOrder && (
        <div className={sideStyles.summary_box}>
          <div className={sideStyles.header_box}>
            <h2 className={sideStyles.header}>Order Details:</h2>
          </div>
          <div className={sideStyles.table_container}>
            <Table headers={ORDER_ITEMS_HEADER} data={selectedOrder?.orderDetails?.items} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureOrdersSideBar;
