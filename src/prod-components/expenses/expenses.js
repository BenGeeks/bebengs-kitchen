import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ExpensesList from './expenses-list';
import DatePicker from '@/assets/date-picker';
import ExpensesIconBar from './expenses-icon-bar';
import ExpenseAdd from './expense-add';

import apiRequest from '@/lib/axios';
import moment from 'moment';

const Expenses = () => {
  const [addExpense, setAddExpense] = useState(false);
  const [currentPage, setCurrentPage] = useState('todays-list');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [calendar, setCalendar] = useState(moment());

  const expensesQuery = useQuery({
    queryKey: ['menu'],
    queryFn: () => apiRequest({ url: 'expenses', method: 'GET' }).then((res) => res.data),
    staleTime: 0,
    refetchInterval: 20000,
  });

  const rowClickHandler = (data) => {
    console.log('ROW CLICK HANDLER: ', data);
  };

  const onSetCalendar = (date) => {
    setCalendar(date);
    setOpenDatePicker(false);
  };

  return (
    <>
      <DatePicker open={openDatePicker} close={() => setOpenDatePicker(false)} onSave={onSetCalendar} />
      <ExpenseAdd open={addExpense} close={() => setAddExpense(false)} />
      <ExpensesList expensesQuery={expensesQuery?.data} onRowClick={rowClickHandler} />
      <ExpensesIconBar
        onAddExpense={() => setAddExpense(true)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setOpenDatePicker={setOpenDatePicker}
      />
    </>
  );
};

export default Expenses;
