'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import ViewOrderDetailsModal from '@/assets/view-order';
import { Loader, Error } from '@/assets/loader-error';
import DatePicker from '@/assets/date-picker';
import Table from '@/assets/table';

import { SUMMARY_HEADERS, HEADERS, formatData, getSummary } from './resources';
import apiRequest from '@/lib/axios';

import styles from './collectibles.module.css';

const Collectibles = () => {
  const queryClient = useQueryClient();
  const [summary, setSummary] = useState([]);
  const [collectiblesData, setCollectiblesData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState(false);

  const collectiblesQuery = useQuery({
    queryKey: ['collectibles'],
    queryFn: () =>
      apiRequest({
        url: 'orders/collectibles',
        method: 'POST',
        data: { dateToday: moment().startOf('day') },
      }).then((res) => res.data),
    onSuccess: (data) => {
      setCollectiblesData(formatData(data));
      setSummary(getSummary(data));
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['collectibles'] });
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

  if (collectiblesQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (collectiblesQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={collectiblesQuery.error} />
      </div>
    );

  return (
    <>
      <ViewOrderDetailsModal
        open={viewOrderDetails}
        close={() => setViewOrderDetails(false)}
        enabledPaid={true}
        onPaid={() => setOpenDatePicker(true)}
        orderDetails={selectedOrder}
      />
      {openDatePicker && <DatePicker open={openDatePicker} close={() => setOpenDatePicker(false)} onSave={onPaidHandler} />}

      <div className={styles.page_container}>
        <div className={styles.main_page}>
          <div className={styles.header_bar}>
            <h3 className={styles.header_bar_title}>Collectibles</h3>
            <h3 className={styles.header_bar_total}>
              {collectiblesQuery?.data?.reduce((total, data) => data.total + total, 0)?.toLocaleString('en-US')}
            </h3>
          </div>
          <div className={styles.tables_container}>
            <div className={styles.summary_container}>
              <Table headers={SUMMARY_HEADERS} data={summary} enableDelete={false} enableEdit={false} enableRowClick={false} />
            </div>
            <div className={styles.main_container}>
              <Table
                headers={HEADERS}
                data={collectiblesData}
                enableDelete={false}
                enableEdit={false}
                enableRowClick={true}
                onRowClick={viewOrderHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collectibles;
