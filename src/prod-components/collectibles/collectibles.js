import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import ViewOrderDetailsModal from '@/assets/view-order';
import DatePicker from '@/assets/date-picker';
import apiRequest from '@/lib/axios';

import collectiblesStyles from '@/styles/collectibles.module.css';
import tableStyles from '@/styles/assets.module.css';

const Collectibles = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState(false);

  const HEADERS = ['Age', 'Date', 'Name', 'Total'];

  const collectiblesQuery = useQuery({
    queryKey: ['collectibles'],
    queryFn: () =>
      apiRequest({
        url: 'orders/collectibles',
        method: 'POST',
        data: { dateToday: moment().startOf('day') },
      }).then((res) => res.data),
  });

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['collectibles', 'orders'] });
      setOpenDatePicker(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });
  const onPaidHandler = (date) => {
    if (confirm(`Are you sure this collectible has been paid?`) == true) {
      updateOrderMutation.mutate({ id: selectedOrder._id, data: { ...selectedOrder, isPaid: true, paymentDate: moment(date) } });
    }
  };

  const viewOrderHandler = (order) => {
    setViewOrderDetails(true);
    setSelectedOrder(order);
  };

  return (
    <>
      <ViewOrderDetailsModal
        open={viewOrderDetails}
        close={() => setViewOrderDetails(false)}
        enabledPaid={true}
        onPaid={() => setOpenDatePicker(true)}
        orderDetails={selectedOrder}
      />
      <DatePicker open={openDatePicker} close={() => setOpenDatePicker(false)} onSave={onPaidHandler} />
      <div className={collectiblesStyles.page_container}>
        <div className={collectiblesStyles.main_page}>
          <div className={collectiblesStyles.header_bar}>
            <h3 className={collectiblesStyles.header_bar_title}>Collectibles</h3>
            <h3 className={collectiblesStyles.header_bar_total}>
              {collectiblesQuery?.data?.reduce((total, data) => data.total + total, 0)?.toLocaleString('en-US')}
            </h3>
          </div>
          <div className={tableStyles.table_container}>
            {collectiblesQuery?.isLoading ? (
              <div className={tableStyles.table_loader}>
                <img src="/images/spinner.gif" alt="loader gif" />
              </div>
            ) : (
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
                  {collectiblesQuery?.data?.map((order, index) => {
                    return (
                      <tr key={index} className={tableStyles.table_row_clickable} onClick={() => viewOrderHandler(order)}>
                        <td className={collectiblesStyles.cell}>{moment().diff(order.deliveryDate, 'days')}</td>
                        <td className={collectiblesStyles.cell}>{moment(order.deliveryDate).format('MMM DD, YYYY')}</td>
                        <td className={collectiblesStyles.cell}>{order.orderDetails.customer.name}</td>
                        <td className={collectiblesStyles.cell}>{order.total.toLocaleString('en-US')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collectibles;
