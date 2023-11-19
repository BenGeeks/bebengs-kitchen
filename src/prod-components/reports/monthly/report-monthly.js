'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { MONTHLY_REPORT_HEADER, INPUT, SCHEMA, DEFAULT, getReportSummary } from '../resources';
import MonthlyReportSummary from './report-monthly-summary';
import MonthlyReportTopBar from './report-monthly-top-bar';
import { Loader, Error } from '@/assets/loader-error';
import EditNewModal from '@/assets/edit-new-modal';
import styles from '../reports.module.css';
import apiRequest from '@/lib/axios';
import Table from '@/assets/table';

const MonthlyReportPage = ({ date, openMonthlyCalendar, setAddEntry, addEntry }) => {
  const queryClient = useQueryClient();
  const [reportSummary, setReportSummary] = useState({});
  const [editEntry, setEditEntry] = useState(false);
  const [editData, setEditData] = useState({});
  const [monthStart, setMonthStart] = useState({});

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    enabled: !openMonthlyCalendar,
    queryFn: () => apiRequest({ url: `reports/summary/${date.year}-${date.month + 1}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setReportSummary(getReportSummary(data)),
  });

  const startQuery = useQuery({
    queryKey: ['start'],
    enabled: !openMonthlyCalendar,
    queryFn: () => apiRequest({ url: `reports/start/search/${date.year}-${date.month + 1}`, method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setMonthStart(data.length === 0 ? null : data[0]?.value),
  });

  const newReportMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'reports/summary', method: 'POST', data: payload }),
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
    setEditData({ _id: data._id, date: data.date, capital, withdrawal, sales, expenses });
    setEditEntry(true);
  };

  if (reportsQuery.isLoading || startQuery.isError)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Loader />
      </div>
    );

  if (reportsQuery.isError || startQuery.isError)
    return (
      <div className={styles.page_container} style={{ width: width }}>
        <Error error={reportsQuery.isError || startQuery.isError} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      {addEntry && (
        <EditNewModal
          open={addEntry}
          close={() => setAddEntry(false)}
          title="Add new report entry"
          INPUT={INPUT}
          SCHEMA={SCHEMA}
          DEFAULT={{ ...DEFAULT, date }}
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
          onRowClick={editReportHandler}
          small={true}
        />
      </div>
    </div>
  );
};

export default MonthlyReportPage;
