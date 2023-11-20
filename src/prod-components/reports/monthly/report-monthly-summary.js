'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import * as yup from 'yup';

import EditNewModal from '@/assets/edit-new-modal';
import styles from '../reports.module.css';

import apiRequest from '@/lib/axios';

const MonthlyReportSummary = ({ date, monthStart, reportSummary, monthStartData }) => {
  const queryClient = useQueryClient();
  const [addMonthlyStart, setAddMonthlyStart] = useState(false);
  const [editMonthlyStart, setEditMonthlyStart] = useState(false);

  const SCHEMA = yup.object().shape({
    value: yup.string().required('Report date is required'),
  });

  const INPUT = [{ type: 'number', name: 'value', label: 'Amount' }];
  const TITLE = `${moment(date).format('MMMM YYYY')} start amount`;

  const newMonthStartMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'reports/start', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('Month start added successfully.');
      queryClient.invalidateQueries({ queryKey: ['start'] });
      setAddMonthlyStart(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const editMonthStartMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `reports/start/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Month start updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['start'] });
      setEditMonthlyStart(false);
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const monthStartAddHandler = (data) => {
    let payload = { date: `${date.year}-${date.month + 1}`, value: data.value };
    newMonthStartMutation.mutate(payload);
  };

  const monthStartEditHandler = (data) => {
    let payload = { id: monthStartData[0]._id, data: { date: monthStartData[0].date, value: data.value } };
    editMonthStartMutation.mutate(payload);
  };

  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <>
      {addMonthlyStart && (
        <EditNewModal
          open={addMonthlyStart}
          close={() => setAddMonthlyStart(false)}
          title={`Add ${TITLE}`}
          INPUT={INPUT}
          SCHEMA={SCHEMA}
          DEFAULT={{ value: 20000 }}
          onSubmit={monthStartAddHandler}
          onCancel={() => setAddMonthlyStart(false)}
          action={'Add'}
        />
      )}
      {editMonthlyStart && (
        <EditNewModal
          open={editMonthlyStart}
          close={() => setEditMonthlyStart(false)}
          title={`Edit ${TITLE}`}
          INPUT={INPUT}
          SCHEMA={SCHEMA}
          DEFAULT={{ value: monthStart }}
          onSubmit={monthStartEditHandler}
          onCancel={() => setEditMonthlyStart(false)}
          action={'Edit'}
        />
      )}
      <div className={styles.info_box}>
        <div className={styles.sub_info}>
          <div
            className={styles.sub_info_set_clickable}
            onClick={monthStart ? () => setEditMonthlyStart(true) : () => setAddMonthlyStart(true)}
          >
            <div className={styles.sub_info_title}>Month Start: </div>
            <div className={styles.sub_info_value}>{monthStart?.toLocaleString('en', options)}</div>
          </div>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Total Capital: </div>
            <div className={styles.sub_info_value}>{reportSummary?.totalCapital?.toLocaleString('en', options)}</div>
          </div>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Total Withdrawal: </div>
            <div className={styles.sub_info_value}>{reportSummary?.totalWithdrawal?.toLocaleString('en', options)}</div>
          </div>
        </div>

        <div className={styles.sub_info}>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Average Sales: </div>
            <div className={styles.sub_info_value}>
              {reportSummary?.averageSales?.toLocaleString('en', options) === 'NaN'
                ? 0
                : reportSummary?.averageSales?.toLocaleString('en', options)}
            </div>
          </div>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Average Expenses: </div>
            <div className={styles.sub_info_value}>
              {reportSummary?.averageExpenses?.toLocaleString('en', options) === 'NaN'
                ? 0
                : reportSummary?.averageExpenses?.toLocaleString('en', options)}
            </div>
          </div>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Average Profit: </div>
            <div className={styles.sub_info_value}>
              {reportSummary?.averageProfit?.toLocaleString('en', options) === 'NaN'
                ? 0
                : reportSummary?.averageProfit?.toLocaleString('en', options)}
            </div>
          </div>
        </div>

        <div className={styles.sub_info}>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Total Sales: </div>
            <div className={styles.sub_info_value}>{reportSummary?.totalSales?.toLocaleString('en', options)}</div>
          </div>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Total Expenses: </div>
            <div className={styles.sub_info_value}>{reportSummary?.totalExpenses?.toLocaleString('en', options)}</div>
          </div>
          <div className={styles.sub_info_set}>
            <div className={styles.sub_info_title}>Total Profit: </div>
            <div className={styles.sub_info_value}>{reportSummary?.totalProfit?.toLocaleString('en', options)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyReportSummary;
