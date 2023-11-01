import React from 'react';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import apiRequest from '@/lib/axios';

import ModalWide from '@/assets/modal-wide';
import ReactForm from '@/assets/react-form';
import { EXPENSES_INPUT, EXPENSES_SCHEMA } from '@/resources/expenses';

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
    <ModalWide open={open} close={close}>
      <ReactForm
        layout={EXPENSES_INPUT}
        schema={EXPENSES_SCHEMA}
        action={'Add'}
        defaultValues={{ expenseDate: moment().format('yyyy-MM-DD') }}
        onSubmit={AddExpenseHandler}
        onCancel={close}
      />
    </ModalWide>
  );
};

export default ExpenseAdd;
