'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import moment from 'moment';

import { EXPENSES_INPUT, EXPENSES_SCHEMA } from './resources';
import EditNewModal from '@/assets/edit-new-modal';
import apiRequest from '@/lib/axios';

const ExpenseEdit = ({ open, close, expenseData }) => {
  const queryClient = useQueryClient();

  const editExpenseMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `expenses/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('The expense has been updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      close();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const EditExpenseHandler = (data) => {
    editExpenseMutation.mutate({ id: data._id, data: { ...data, total: data.price * data.qty } });
  };

  return (
    <EditNewModal
      title={`Edit ${expenseData?.item} item`}
      open={open}
      INPUT={EXPENSES_INPUT}
      SCHEMA={EXPENSES_SCHEMA}
      DEFAULT={{ ...expenseData, expenseDate: moment(expenseData?.expenseDate).format('yyyy-MM-DD') }}
      onSubmit={EditExpenseHandler}
      onCancel={close}
      action={'Edit'}
    />
  );
};

export default ExpenseEdit;
