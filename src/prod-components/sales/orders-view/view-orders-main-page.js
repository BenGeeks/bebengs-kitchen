import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import moment from 'moment';

import ViewOrderDetailsModal from '@/assets/view-order';
import OrderStatusUpdater from './order-status-updater';
import ErrorPage from '@/assets/error';

import apiRequest from '@/lib/axios';

import styles from '../sales.module.css';

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

  const getStatusColor = (data) => {
    if (data && !data.isPaid && data.isDelivered && data.isGcash) return styles.red;
    if (data && !data.isPaid && data.isDelivered && !data.isGcash) return styles.purple;
    if (data && data.isPaid && !data.isDelivered && !data.isGcash) return styles.turquoise;
    if (data && data.isPaid && !data.isDelivered && data.isGcash) return styles.pink;
    if (data && data.isPaid && data.isDelivered && data.isGcash) return styles.blue;
    if (data && data.isPaid && data.isDelivered && !data.isGcash) return styles.green;
    return styles.orange;
  };

  const onUpdateStatus = (order) => {
    setSelectedOrder(order);
    setOpenStatusUpdate(true);
  };

  if (orderQuery.isError) return <ErrorPage error={orderQuery.error} />;

  return (
    <>
      <ViewOrderDetailsModal
        open={openViewDetails}
        close={() => setOpenViewDetails(false)}
        orderDetails={selectedOrder}
        enableDelete={true}
        onDelete={onDeleteHandler}
        enableEdit={true}
        onEdit={onEdit}
      />
      <OrderStatusUpdater open={openStatusUpdater} close={() => setOpenStatusUpdate(false)} order={selectedOrder} />
      <div className={styles.page_container} style={{ width: width }}>
        <div className={styles.date}>{moment(calendarDate).format('MMM DD, yyyy')}</div>
        <div className={styles.table_container}>
          {orderQuery.isLoading ? (
            <div className={styles.table_loader}>
              <img src="/images/spinner.gif" alt="loader gif" />
            </div>
          ) : (
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
                  return (
                    <tr key={index}>
                      <td className={`${getStatusColor(order)} ${styles.table_cell_status}`} onClick={() => onUpdateStatus(order)}>
                        {index + 1}
                      </td>
                      <td className={styles.table_cell} onClick={() => onSelectHandler(order)}>
                        <div className={styles.table_cell_name}>{order?.orderDetails?.customer?.name}</div>
                        <div
                          className={styles.table_cell_address}
                        >{`${order?.orderDetails?.customer?.address} - ${order?.orderDetails?.customer?.block} ${order?.orderDetails?.customer?.lot}`}</div>
                      </td>
                      <td className={styles.table_cell_total}>{order?.total?.toLocaleString('en-US')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersMainPage;
