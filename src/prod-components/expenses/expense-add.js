'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import moment from 'moment';

import { EXPENSES_INPUT, EXPENSES_SCHEMA } from './resources';
import EditNewModal from '@/assets/edit-new-modal';
import apiRequest from '@/lib/axios';

const ExpenseAdd = ({ open, close }) => {
  const queryClient = useQueryClient();

  const newExpenseMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: 'expenses', method: 'POST', data: payload }),
    onSuccess: () => {
      toast.success('A new expenses item has been added successfully.');
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      close();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const AddExpenseHandler = (data) => {
    newExpenseMutation.mutate({ ...data, total: data.price * data.qty });
  };
  return (
    <EditNewModal
      title={`Add new expense item`}
      open={open}
      INPUT={EXPENSES_INPUT}
      SCHEMA={EXPENSES_SCHEMA}
      DEFAULT={{ expenseDate: moment().format('yyyy-MM-DD') }}
      onSubmit={AddExpenseHandler}
      onCancel={close}
      action={'Add'}
    />
  );
};

export default ExpenseAdd;
