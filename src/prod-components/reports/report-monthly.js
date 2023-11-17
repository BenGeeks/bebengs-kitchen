'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Table from '@/assets/table';
import EditNewModal from '@/assets/edit-new-modal';
import { MONTHLY_REPORT_HEADER, INPUT, SCHEMA, DEFAULT, getReportSummary } from './resources';
import styles from './reports.module.css';
import apiRequest from '@/lib/axios';

const MonthlyReportPage = ({ date, setAddEntry, addEntry }) => {
  const queryClient = useQueryClient();
  const [reportSummary, setReportSummary] = useState({});
  const [editEntry, setEditEntry] = useState(false);
  const [editData, setEditData] = useState({});
  const [monthStart, setMonthStart] = useState({});

  const reportsQuery = useQuery({
    queryKey: ['reports'],
    queryFn: () => apiRequest({ url: 'reports/summary/2023-11', method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setReportSummary(getReportSummary(data)),
  });

  const startQuery = useQuery({
    queryKey: ['start'],
    queryFn: () => apiRequest({ url: 'reports/start/search/2023-11', method: 'GET' }).then((res) => res.data),
    onSuccess: (data) => setMonthStart(data),
  });

  console.log('MONTH START: ', monthStart);

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

  return (
    <>
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
      <div className={styles.page_container}>
        <div className={styles.total_box}>
          <div>November 2023</div>
          <div>
            {(
              monthStart?.[0]?.value +
              reportSummary?.totalCapital +
              reportSummary?.totalProfit -
              reportSummary?.totalWithdrawal
            ).toLocaleString('en')}
          </div>
        </div>
        <div className={styles.info_box}>
          <div className={styles.sub_info}>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Total Sales: </div>
              <div className={styles.sub_info_value}>{reportSummary?.totalSales?.toLocaleString('en')}</div>
            </div>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Total Expenses: </div>
              <div className={styles.sub_info_value}>{reportSummary?.totalExpenses?.toLocaleString('en')}</div>
            </div>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Total Profit: </div>
              <div className={styles.sub_info_value}>{reportSummary?.totalProfit?.toLocaleString('en')}</div>
            </div>
          </div>
          <div className={styles.sub_info}>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Average Sales: </div>
              <div className={styles.sub_info_value}>{reportSummary?.averageSales?.toLocaleString('en')}</div>
            </div>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Average Expenses: </div>
              <div className={styles.sub_info_value}>{reportSummary?.averageExpenses?.toLocaleString('en')}</div>
            </div>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Average Profit: </div>
              <div className={styles.sub_info_value}>{reportSummary?.averageProfit?.toLocaleString('en')}</div>
            </div>
          </div>
          <div className={styles.sub_info}>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Month Start: </div>
              <div className={styles.sub_info_value}>{monthStart?.[0]?.value?.toLocaleString('en')}</div>
            </div>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Total Capital: </div>
              <div className={styles.sub_info_value}>{reportSummary?.totalCapital?.toLocaleString('en')}</div>
            </div>
            <div className={styles.sub_info_set}>
              <div className={styles.sub_info_title}>Total Withdrawal: </div>
              <div className={styles.sub_info_value}>{reportSummary?.totalWithdrawal?.toLocaleString('en')}</div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default MonthlyReportPage;
