import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';

import ViewOrderDetailsModal from '@/assets/view-order';
import LoadingPage from '@/assets/loading';
import OrderStatus from './order-status';
import ErrorPage from '@/assets/error';

import { ORDER_COLUMNS } from '@/resources/orders';

import apiRequest from '@/lib/axios';

import tableStyles from '@/styles/assets.module.css';
import orderStyles from '@/styles/order.module.css';
import pageStyles from '@/styles/page.module.css';

const OrdersMainPage = ({ orderQuery, onEdit }) => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  if (orderQuery.isLoading) return <LoadingPage />;
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
                    <td className={orderStyles.cell_order_details} onClick={() => onSelectHandler(order)}>
                      <div className={orderStyles.cell_customer}>
                        {`
                      ${order?.orderDetails?.customer?.name} (
                      ${order?.orderDetails?.customer?.address} - 
                      ${order?.orderDetails?.customer?.block}
                      ${order?.orderDetails?.customer?.lot} )
                      `}
                      </div>
                    </td>
                    <td className={tableStyles.cell_total_container}>
                      <div className={tableStyles.cell_total}>{order?.total?.toLocaleString('en-US')}</div>
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
