import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';

import ViewOrderDetailsModal from '@/assets/view-order';
import OrderStatusUpdater from './order-status-updater';
import ErrorPage from '@/assets/error';

import apiRequest from '@/lib/axios';

import tableStyles from '@/styles/assets.module.css';
import pageStyles from '@/styles/page.module.css';
import salesStyles from '@/styles/sales.module.css';

const OrdersMainPage = ({ orderQuery, onEdit }) => {
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
    if (data && !data.isPaid && data.isDelivered && data.isGcash) return salesStyles.red;
    if (data && !data.isPaid && data.isDelivered && !data.isGcash) return salesStyles.purple;
    if (data && data.isPaid && !data.isDelivered && !data.isGcash) return salesStyles.turquoise;
    if (data && data.isPaid && !data.isDelivered && data.isGcash) return salesStyles.pink;
    if (data && data.isPaid && data.isDelivered && data.isGcash) return salesStyles.blue;
    if (data && data.isPaid && data.isDelivered && !data.isGcash) return salesStyles.green;
    return salesStyles.orange;
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
      <div className={pageStyles.page_container}>
        <div className={tableStyles.table_container}>
          {orderQuery.isLoading ? (
            <div className={tableStyles.table_loader}>
              <img src="/images/spinner.gif" alt="loader gif" />
            </div>
          ) : (
            <table className={salesStyles.table}>
              <thead>
                <tr>
                  <th className={salesStyles.table_head}>Order#</th>
                  <th className={salesStyles.table_head}>Order Details</th>
                  <th className={salesStyles.table_head}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderQuery?.data?.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td className={`${getStatusColor(order)} ${salesStyles.table_cell_status}`} onClick={() => onUpdateStatus(order)}>
                        {index + 1}
                      </td>
                      <td className={salesStyles.table_cell} onClick={() => onSelectHandler(order)}>
                        <div className={salesStyles.table_cell_name}>{order?.orderDetails?.customer?.name}</div>
                        <div
                          className={salesStyles.table_cell_address}
                        >{`${order?.orderDetails?.customer?.address} - ${order?.orderDetails?.customer?.block} ${order?.orderDetails?.customer?.lot}`}</div>
                      </td>
                      <td className={salesStyles.table_cell_total}>{order?.total?.toLocaleString('en-US')}</td>
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
