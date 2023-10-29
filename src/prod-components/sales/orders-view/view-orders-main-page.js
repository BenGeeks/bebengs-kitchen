import LoadingPage from '@/assets/loading';
import OrderDetails from './order-details';
import OrderStatus from './order-status';
import ErrorPage from '@/assets/error';

import { ORDER_COLUMNS } from '@/resources/orders';

import tableStyles from '@/styles/assets.module.css';
import pageStyles from '@/styles/page.module.css';

const OrdersMainPage = ({ orderQuery, onEdit }) => {
  if (orderQuery.isLoading) return <LoadingPage />;
  if (orderQuery.isError) return <ErrorPage error={orderQuery.error} />;

  return (
    <div className={pageStyles.page_container}>
      <div className={tableStyles.table_container}>
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
                    <OrderStatus order={order} index={index} />
                  </td>
                  <td className={tableStyles.cell_order_details}>
                    <OrderDetails order={order} onEdit={onEdit} />
                  </td>
                  <td className={tableStyles.cell_total_container}>
                    <div className={tableStyles.cell_total}>{order.total.toLocaleString('en-US')}</div>
                  </td>
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
