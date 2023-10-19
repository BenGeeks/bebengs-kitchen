'use client';

import { RiAddCircleLine, RiPrinterLine, RiCalendar2Line, RiRefreshLine } from 'react-icons/ri';
import { PiCalendar } from 'react-icons/pi';

import Modal from '@/assets/modal';
import OrderNew from './new/order-new';
import OrderEdit from './new/order-edit';
import OrderStatus from './order-status';
import OrderDetails from './order-details';
import { ORDER_COLUMNS } from '@/resources/orders';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';

import pageStyles from '@/styles/page.module.css';
import tableStyles from '@/styles/table.module.css';
import iconStyles from '@/styles/icons.module.css';

const OrderMainPage = ({
  orderQuery,
  onSaveHandler,
  statusUpdateHandler,
  onUpdateHandler,
  onAdd,
  setOnAdd,
  veiwOrderHandler,
  viewData,
  viewModal,
  setViewModal,
  refresh,
}) => {
  if (orderQuery.isLoading) return <LoadingPage />;
  if (orderQuery.isError) return <ErrorPage error={orderQuery.error} />;

  return (
    <div className={pageStyles.page_container}>
      <Modal open={onAdd}>
        <OrderNew onClose={() => setOnAdd(false)} onSave={onSaveHandler} />
      </Modal>
      <Modal open={viewModal}>
        <OrderEdit onClose={() => setViewModal(false)} onSave={onUpdateHandler} order={viewData} />
      </Modal>
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
                <tr key={index} className={tableStyles.table_row}>
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
      <div className={iconStyles.icons_container_vertical}>
        <div className={iconStyles.icon_box} title="Add order" onClick={() => setOnAdd(true)}>
          <div className={iconStyles.icon}>
            <RiAddCircleLine />
          </div>
          <p className={iconStyles.icon_text}>Add</p>
        </div>
        <div className={iconStyles.icon_box} title="refresh" onClick={() => refresh(true)}>
          <div className={iconStyles.icon}>
            <RiRefreshLine />
          </div>
          <p className={iconStyles.icon_text}>Refresh</p>
        </div>
        <div className={iconStyles.icon_box} title="Today">
          <div className={iconStyles.icon}>
            <PiCalendar />
          </div>
          <p className={iconStyles.icon_text}>Today</p>
        </div>
        <div className={iconStyles.icon_box} title="History">
          <div className={iconStyles.icon}>
            <RiCalendar2Line />
          </div>
          <p className={iconStyles.icon_text}>History</p>
        </div>
        <div className={iconStyles.icon_box} title="Print">
          <div className={iconStyles.icon}>
            <RiPrinterLine />
          </div>
          <p className={iconStyles.icon_text}>Print</p>
        </div>
      </div>
    </div>
  );
};

export default OrderMainPage;
