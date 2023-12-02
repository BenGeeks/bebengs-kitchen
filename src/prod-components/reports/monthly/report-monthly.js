'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getSalesSummary, getExpenseSummary } from '@/assets/functions';
import { MONTHLY_REPORT_HEADER, MONTHLY_REPORT_HEADER_MOBILE, INPUT, SCHEMA } from '../resources';
import MonthlyReportSummary from './report-monthly-summary';
import MonthlyReportTopBar from './report-monthly-top-bar';
import { Loader, Error } from '@/assets/loader-error';
import { getReportSummary } from '@/assets/functions';
import EditNewModal from '@/assets/edit-new-modal';
import ActionModal from '@/assets/action-modal';
import styles from '../reports.module.css';
import apiRequest from '@/lib/axios';
import Table from '@/assets/table';
import moment from 'moment';

const MonthlyReportPage = ({ date, openMonthlyCalendar, setAddEntry, addEntry }) => {
  const queryClient = useQueryClient();
  const [reportSummary, setReportSummary] = useState({});
  const [editEntry, setEditEntry] = useState(false);
  const [editData, setEditData] = useState({});
  const [monthStart, setMonthStart] = useState({});
  const [openActionModal, setOpenActionModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const [expensesSummary, setExpenseSummary] = useState([]);
  const [salesSummary, setSalesSummary] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(0);

  let DEFAULT = {
    date: moment(date),
    expenses: expensesSummary?.total + discount,
    sales: salesSummary?.dailyTotal + delivery,
    withdrawal: 0,
    capital: 0,
  };

  useEffect(() => {
    apiRequest({ url: `reports/daily/${moment(date).format('YYYY-MM-DD')}`, method: 'GET' }).then((res) => {
      res.data;
      setExpenseSummary(getExpenseSummary(res.data.expenseList));
      setSalesSummary(getSalesSummary(res.data.salesList, date));
      setDiscount(res?.data?.salesList?.reduce((total, data) => (data.discount ? +data.discount + total : total), 0));
      setDelivery(res?.data?.salesList?.reduce((total, data) => (data.deliveryCharge ? +data.deliveryCharge + total : total), 0));
    });
  }, []);

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    enabled: !openMonthlyCalendar,
    queryFn: () => apiRequest({ url: `reports/month/${date.year}-${date.month + 1}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setReportSummary(getReportSummary(data)),
  });

  const startQuery = useQuery({
    queryKey: ['start'],
    enabled: !openMonthlyCalendar,
    queryFn: () => apiRequest({ url: `reports/start/search/${date.year}-${date.month + 1}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setMonthStart(data.length === 0 ? null : data[0]?.value),
  });

  const newReportMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'reports', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('Report data added successfully.');
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setAddEntry(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const editReportMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `reports/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Report data added successfully.');
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setEditEntry(false);
      setOpenActionModal(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `reports/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Report data deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setOpenActionModal(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const editReportHandler = (data) => {
    let capital = data.capital !== ' ' ? parseInt(data.capital.replace(/,/g, '')) : 0;
    let withdrawal = data.withdrawal !== ' ' ? parseInt(data.withdrawal.replace(/,/g, '')) : 0;
    let sales = data.sales !== ' ' ? parseInt(data.sales.replace(/,/g, '')) : 0;
    let expenses = data.expenses !== ' ' ? parseInt(data.expenses.replace(/,/g, '')) : 0;
    setEditData({ _id: data._id, date: data.date, capital, withdrawal, sales, expenses, date: data.date });
    setEditEntry(true);
  };

  const onDeleteReportHandler = (id) => {
    if (confirm('Are you sure to delete this report entry?') == true) {
      deleteReportMutation.mutate(id);
    }
  };

  const onRowClickHandler = (data) => {
    setSelectedData(data);
    setOpenActionModal(true);
  };

  if (reportsQuery.isLoading || startQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (reportsQuery.isError || startQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={reportsQuery.isError || startQuery.isError} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      {openActionModal && (
        <ActionModal
          open={openActionModal}
          close={() => setOpenActionModal(false)}
          onCancel={() => setOpenActionModal(false)}
          onEdit={() => editReportHandler(selectedData)}
          onDelete={() => onDeleteReportHandler(selectedData._id)}
        />
      )}

      {addEntry && (
        <EditNewModal
          open={addEntry}
          close={() => setAddEntry(false)}
          title="Add new report entry"
          INPUT={INPUT}
          SCHEMA={SCHEMA}
          DEFAULT={DEFAULT}
          onSubmit={(data) => newReportMutation.mutate(data)}
          onCancel={() => setAddEntry(false)}
          action={'Add'}
        />
      )}

      {editEntry && (
        <EditNewModal
          open={editEntry}
          close={() => setEditEntry(false)}
          title="Edit report entry"
          INPUT={INPUT}
          SCHEMA={SCHEMA}
          DEFAULT={editData}
          onSubmit={(data) => editReportMutation.mutate({ id: data._id, data: data })}
          onCancel={() => setEditEntry(false)}
          action={'Edit'}
        />
      )}

      <MonthlyReportTopBar date={date} monthStart={monthStart} reportSummary={reportSummary} />
      <MonthlyReportSummary date={date} monthStart={monthStart} reportSummary={reportSummary} monthStartData={startQuery?.data} />
      <div className={styles.table_box}>
        <Table
          headers={MONTHLY_REPORT_HEADER}
          data={reportSummary?.list}
          enableRowClick={true}
          onRowClick={onRowClickHandler}
          alignRight={true}
        />
      </div>
      <div className={styles.table_box_mobile}>
        <Table
          headers={MONTHLY_REPORT_HEADER_MOBILE}
          data={reportSummary?.list}
          enableRowClick={true}
          onRowClick={onRowClickHandler}
          x_small={true}
          alignRight={true}
        />
      </div>
    </div>
  );
};

export default MonthlyReportPage;
