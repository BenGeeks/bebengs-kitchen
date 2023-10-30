import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import moment from 'moment';
import React from 'react';

import apiRequest from '@/lib/axios';

import futureOrdersStyles from '@/styles/future-orders.module.css';
import tableStyles from '@/styles/assets.module.css';

const FutureOrdersList = ({ futureOrdersQuery, selectedOrder, setSelectedOrder }) => {
  const HEADERS = ['#', 'Date', 'Name', 'Total', 'Action'];
  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `orders/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Order deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['future_orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const deleteHandler = (id) => {
    if (confirm(`Are you sure to DELETE this order?`) == true) {
      deleteOrderMutation.mutate(id);
    }
  };

  return (
    <div className={futureOrdersStyles.page_container}>
      <div className={futureOrdersStyles.main_page}>
        <div className={futureOrdersStyles.header_bar}>
          <h3 className={futureOrdersStyles.header_bar_title}>Orders</h3>
        </div>
        <div className={tableStyles.table_container}>
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.table_head_row}>
                {HEADERS.map((head) => {
                  return (
                    <th className={tableStyles.table_head} key={head}>
                      <div className={tableStyles.table_head_text}>{head}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {futureOrdersQuery?.data?.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className={tableStyles.table_row_clickable}
                    onClick={() =>
                      !selectedOrder
                        ? setSelectedOrder(order)
                        : selectedOrder._id === order._id
                        ? setSelectedOrder(null)
                        : setSelectedOrder(order)
                    }
                  >
                    <td className={futureOrdersStyles.cell}>{index + 1}</td>
                    <td className={futureOrdersStyles.cell}>{moment(order.deliveryDate).format('MMM DD, YYYY')}</td>
                    <td className={futureOrdersStyles.cell}>{order.orderDetails.customer.name}</td>
                    <td className={futureOrdersStyles.cell}>{order.total.toLocaleString('en-US')}</td>
                    <td className={futureOrdersStyles.cell_actions}>
                      <div className={futureOrdersStyles.icons_container}>
                        <div className={futureOrdersStyles.small_icon} onClick={() => deleteHandler(order._id)}>
                          <RiDeleteBin4Line />
                        </div>
                        <div className={futureOrdersStyles.small_icon}>
                          <RiEditLine />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FutureOrdersList;
