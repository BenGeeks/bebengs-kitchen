'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import moment from 'moment';

import ModalWide from '@/assets/modal-wide';
import ReactForm from '@/assets/react-form';

import { EXPENSES_INPUT, EXPENSES_SCHEMA } from '@/resources/expenses';
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
    <ModalWide open={open} close={close}>
      <ReactForm
        layout={EXPENSES_INPUT}
        schema={EXPENSES_SCHEMA}
        action={'Edit'}
        defaultValues={{ ...expenseData, expenseDate: moment(expenseData?.expenseDate).format('yyyy-MM-DD') }}
        onSubmit={EditExpenseHandler}
        onCancel={close}
      />
    </ModalWide>
  );
};

export default ExpenseEdit;
