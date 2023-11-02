import moment from 'moment';

import printStyles from '@/styles/print.module.css';

const PrintDailyExpense = ({ data, date }) => {
  return (
    <div className={printStyles.print_container}>
      <div className={printStyles.print_head_container}>
        <div className={printStyles.print_head_logo}>Bebeng's Kitchen</div>
        <div>
          Daily Expense Report for <u>{moment(date).format('MMM DD, YYYY')}</u>
        </div>
        <div className={printStyles.print_head_summary}>
          <div>Total Cash: {data?.reduce((total, data) => (!data.isGcash ? +data.total + total : total), 0)?.toLocaleString('en-US')}</div>
          <div>Total G-cash: {data?.reduce((total, data) => (data.isGcash ? +data.total + total : total), 0)?.toLocaleString('en-US')}</div>
          <div>
            <b>Total Sales: {data?.reduce((total, data) => +data.total + total, 0)?.toLocaleString('en-US')}</b>
          </div>
        </div>
      </div>
      <div className={printStyles.print_body_container}>
        <table className={printStyles.expense_table}>
          <thead>
            <tr>
              <th className={printStyles.expense_cell}>Item</th>
              <th className={printStyles.expense_cell}>Description</th>
              <th className={printStyles.expense_cell}>Price</th>
              <th className={printStyles.expense_cell}>Qty</th>
              <th className={printStyles.expense_cell}>G-cash</th>
              <th className={printStyles.expense_cell}>Cash</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((expense, index) => {
              return (
                <tr key={index}>
                  <td className={printStyles.expense_cell}>{expense.item}</td>
                  <td className={printStyles.expense_cell}>{expense.description}</td>
                  <td className={printStyles.expense_number_cell}>{expense.price}</td>
                  <td className={printStyles.expense_number_cell}>{expense.qty}</td>
                  <td className={printStyles.expense_number_cell}>{expense.isGcash ? expense.total : ''}</td>
                  <td className={printStyles.expense_number_cell}>{expense.isGcash ? '' : expense.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintDailyExpense;
