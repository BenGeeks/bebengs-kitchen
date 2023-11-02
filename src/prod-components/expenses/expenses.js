import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import ExpensesIconBar from './expenses-icon-bar';
import ActionModal from '@/assets/action-modal';
import DatePicker from '@/assets/date-picker';
import ExpensesList from './expenses-list';
import ExpenseEdit from './expense-edit';
import ExpenseAdd from './expense-add';
import apiRequest from '@/lib/axios';

const Expenses = () => {
  const queryClient = useQueryClient();
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [openEditExpense, setOpenEditExpense] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [expenseData, setExpenseData] = useState(null);
  const [date, setDate] = useState(moment());
  const [isLoading, setIsLoading] = useState(false);

  const expensesQuery = useQuery({
    queryKey: ['expenses'],
    enabled: !openDatePicker,
    queryFn: () =>
      apiRequest({
        url: 'expenses/search',
        method: 'POST',
        data: { dateFrom: moment(date).startOf('day'), dateTo: moment(date).endOf('day') },
      }).then((res) => res.data),
    onSuccess: () => setIsLoading(false),
  });

  const rowClickHandler = (data) => {
    setExpenseData(data);
    setOpenActionModal(true);
  };

  const onSetCalendar = (date) => {
    setIsLoading(true);
    setOpenDatePicker(true);
    setDate(date);
    setTimeout(() => {
      setOpenDatePicker(false);
    }, 10);
  };

  const onCancelHandler = () => {
    setExpenseData(null);
    setOpenAddExpense(false);
    setOpenEditExpense(false);
    setOpenDatePicker(false);
    setOpenActionModal(false);
  };

  const deleteExpenseMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `expenses/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('The expense has been deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      onCancelHandler();
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const onDeleteHandler = () => {
    if (confirm('Are you sure you want to delete this Expense?') == true) {
      deleteExpenseMutation.mutate(expenseData?._id);
    }
  };

  return (
    <>
      <ActionModal
        open={openActionModal}
        close={onCancelHandler}
        name="Expenses"
        onCancel={onCancelHandler}
        onEdit={() => setOpenEditExpense(true)}
        onDelete={onDeleteHandler}
      />
      <DatePicker open={openDatePicker} close={onCancelHandler} onSave={onSetCalendar} />
      <ExpenseEdit open={openEditExpense} close={onCancelHandler} expenseData={expenseData} />
      <ExpenseAdd open={openAddExpense} close={onCancelHandler} />
      <ExpensesList expensesQuery={expensesQuery?.data} onRowClick={rowClickHandler} date={date} isLoading={isLoading} />
      <ExpensesIconBar onAddExpense={() => setOpenAddExpense(true)} today={onSetCalendar} setOpenDatePicker={setOpenDatePicker} />
    </>
  );
};

export default Expenses;
