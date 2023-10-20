'use client';
import { useState } from 'react';
import { RiAddCircleLine, RiPrinterLine, RiCalendar2Line, RiRefreshLine, RiMenuLine } from 'react-icons/ri';
import { PiCalendar } from 'react-icons/pi';
import { GoGraph } from 'react-icons/go';

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
  viewReport,
  setViewReport,
}) => {
  const [showIcons, setShowIcons] = useState(false);
  if (orderQuery.isLoading) return <LoadingPage />;
  if (orderQuery.isError) return <ErrorPage error={orderQuery.error} />;

  return (
    <div className={viewReport ? pageStyles.page_container_hidden : pageStyles.page_container}>
      <div className={iconStyles.icon_box_fixed} title="Actions" onClick={() => setShowIcons(!showIcons)}>
        <div className={iconStyles.icon}>
          <RiMenuLine />
        </div>
        <p className={iconStyles.icon_text}>Actions</p>
      </div>
      <Modal open={onAdd}>
        <OrderNew onClose={() => setOnAdd(false)} onSave={onSaveHandler} />
      </Modal>
      <Modal open={viewModal}>
        <OrderEdit onClose={() => setViewModal(false)} onSave={onUpdateHandler} order={viewData} />
      </Modal>
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
      <div
        className={showIcons ? iconStyles.icons_container_vertical_show : iconStyles.icons_container_vertical}
        onClick={() => setShowIcons(false)}
      >
        <div className={iconStyles.icon_box} title="Add order" onClick={() => setOnAdd(true)}>
          <div className={iconStyles.icon}>
            <RiAddCircleLine />
          </div>
          <p className={iconStyles.icon_text}>Add</p>
        </div>
        <div className={iconStyles.icon_box} title="Report" onClick={() => setViewReport(!viewReport)}>
          <div className={iconStyles.icon}>
            <GoGraph />
          </div>
          <p className={iconStyles.icon_text}>Report</p>
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
