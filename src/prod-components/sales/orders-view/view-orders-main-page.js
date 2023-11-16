'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import moment from 'moment';

import ViewOrderDetailsModal from '@/assets/view-order';
import OrderStatusUpdater from './order-status-updater';
import { Loader, Error } from '@/assets/loader-error';
import { getStatusColor } from '../resources';
import styles from '../sales.module.css';
import apiRequest from '@/lib/axios';

const OrdersMainPage = ({ orderQuery, calendarDate, onEdit, width }) => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openStatusUpdater, setOpenStatusUpdate] = useState(false);
  const [openViewDetails, setOpenViewDetails] = useState(false);

  const deleteOrderMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `orders/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Order deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setSelectedOrder(null);
      setOpenViewDetails(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const onDeleteHandler = (id) => {
    if (confirm(`Are you sure you want to delete this order?`) == true) {
      deleteOrderMutation.mutate(id);
    }
  };

  const onSelectHandler = (order) => {
    setSelectedOrder(order);
    setOpenViewDetails(true);
  };

  const onUpdateStatus = (order) => {
    setSelectedOrder(order);
    setOpenStatusUpdate(true);
  };

  if (orderQuery.isLoading)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Loader />
      </div>
    );

  if (orderQuery.isError)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Error error={orderQuery.error} />
      </div>
    );

  console.log('SELECTED ORDER: ', selectedOrder);
  return (
    <>
      {ViewOrderDetailsModal && (
        <ViewOrderDetailsModal
          open={openViewDetails}
          close={() => setOpenViewDetails(false)}
          orderDetails={selectedOrder}
          enableDelete={true}
          onDelete={onDeleteHandler}
          enableEdit={true}
          onEdit={onEdit}
        />
      )}
      {openStatusUpdater && <OrderStatusUpdater open={openStatusUpdater} close={() => setOpenStatusUpdate(false)} order={selectedOrder} />}
      <div className={styles.page_container} style={{ width: width }}>
        <div className={styles.date}>{moment(calendarDate).format('ll')}</div>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_head}>Order#</th>
                <th className={styles.table_head}>Order Details</th>
                <th className={styles.table_head}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderQuery?.data?.map((order, index) => {
                let downPaymentDate = order?.downPaymentDate ? moment(order?.downPaymentDate).format('ll') : null;
                return (
                  <tr key={index}>
                    <td className={`${getStatusColor(order)} ${styles.table_cell_status}`} onClick={() => onUpdateStatus(order)}>
                      {index + 1}
                    </td>
                    <td
                      className={styles.table_cell}
                      style={{
                        backgroundColor: downPaymentDate === moment(calendarDate).format('ll') ? 'pink' : '',
                      }}
                      onClick={() => onSelectHandler(order)}
                    >
                      <div className={styles.table_cell_name}>{order?.orderDetails?.customer?.name}</div>
                      <div
                        className={styles.table_cell_address}
                      >{`${order?.orderDetails?.customer?.address} - ${order?.orderDetails?.customer?.block} ${order?.orderDetails?.customer?.lot}`}</div>
                    </td>

                    <td className={styles.table_cell_total}>
                      {order?.total?.toLocaleString('en-US')}
                      {order.isDownPayment && <span> {`(${order?.downPayment?.toLocaleString('en-US')})`}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrdersMainPage;
