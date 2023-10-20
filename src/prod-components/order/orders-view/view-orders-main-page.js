'use client';

import OrderStatus from './order-status';
import OrderDetails from './order-details';
import { ORDER_COLUMNS } from '@/resources/orders';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';

import pageStyles from '@/styles/page.module.css';
import tableStyles from '@/styles/table.module.css';

const OrdersMainPage = ({ orderQuery, statusUpdateHandler, veiwOrderHandler, viewReport }) => {
  if (orderQuery.isLoading) return <LoadingPage />;
  if (orderQuery.isError) return <ErrorPage error={orderQuery.error} />;

  return (
    <div className={viewReport ? pageStyles.page_container_hidden : pageStyles.page_container}>
      <div className={`${tableStyles.table_container} ${viewReport && pageStyles.hidden}`}>
        <table className={tableStyles.table}>
          <thead>
            <tr className={tableStyles.table_head_row}>
              {ORDER_COLUMNS.map((head) => {
                return (
                  <th className={tableStyles.table_head} key={head}>
                    <div className={tableStyles.table_head_text}>{head}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {orderQuery.data.map((order, index) => {
              return (
                <tr key={index}>
                  <td className={tableStyles.cell_status}>
                    <OrderStatus order={order} index={index} onUpdate={statusUpdateHandler} />
                  </td>
                  <td className={tableStyles.cell_status}>
                    <OrderDetails order={order} onView={veiwOrderHandler} />
                  </td>
                  <td className={tableStyles.cell_total}>{order.total.toLocaleString('en-US')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersMainPage;
