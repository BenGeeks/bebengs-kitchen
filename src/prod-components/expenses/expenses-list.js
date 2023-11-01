import React from 'react';

import Table from '@/assets/table';
import { EXPENSES_TABLE_HEADER } from '@/resources/expenses';
import collectiblesStyles from '@/styles/collectibles.module.css';

const ExpensesList = ({ expensesQuery, onRowClick }) => {
  return (
    <div className={collectiblesStyles.page_container}>
      <div className={collectiblesStyles.main_page}>
        <div className={collectiblesStyles.header_bar}>
          <h3 className={collectiblesStyles.header_bar_title}>Expenses: Oct 1, 2023</h3>
          <h3 className={collectiblesStyles.header_bar_total}>Cash: 300</h3>
          <h3 className={collectiblesStyles.header_bar_total}>G-cash: 200</h3>
          <h3 className={collectiblesStyles.header_bar_total}>Total: 500</h3>
        </div>
        <Table
          headers={EXPENSES_TABLE_HEADER}
          data={expensesQuery}
          enableDelete={false}
          enableEdit={false}
          enableRowClick={true}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
};

export default ExpensesList;
