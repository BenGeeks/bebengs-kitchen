import React from 'react';

import printStyles from '@/styles/print.module.css';

const PrintSalesDailySummary = ({ data, salesSummary }) => {
  return (
    <div className={printStyles.print_container}>
      <div className={printStyles.print_head_container}>
        <div className={printStyles.print_head_logo}>Bebeng's Kitchen</div>
        <div>
          Daily Sales Report for <u>October 29, 2023</u>
        </div>
        <div className={printStyles.print_head_summary}>
          <div>Total Cash: {salesSummary?.cashTotal.toLocaleString('en-US')}</div>
          <div>Total G-cash: {salesSummary?.gCashTotal.toLocaleString('en-US')}</div>
          <div>
            <b>Total Sales: {salesSummary?.dailyTotal.toLocaleString('en-US')}</b>
          </div>
        </div>
      </div>
      <div className={printStyles.print_body_container}>
        <table className={printStyles.table}>
          <thead>
            <tr className={printStyles.table_row}>
              <th className={printStyles.header_text_container}>
                <div className={printStyles.cell_inner} style={{ width: '50px' }}>
                  name
                </div>
                <div className={printStyles.cell_inner} style={{ width: '180px' }}>
                  item
                </div>
                <div className={printStyles.cell_inner} style={{ width: '150px' }}>
                  size
                </div>
                <div className={printStyles.cell_inner} style={{ width: '120px' }}>
                  qty
                </div>
                <div className={printStyles.cell_inner} style={{ width: '80px' }}>
                  price
                </div>
                <div className={printStyles.cell_inner} style={{ width: '80px' }}>
                  sub-total
                </div>
              </th>

              <th className={printStyles.table_head}>Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, index) => {
              return (
                <tr key={index} className={printStyles.table_row}>
                  <td className={printStyles.cell}>
                    <div className={printStyles.print_cell_name}>{order.orderDetails.customer.name}</div>
                    <div className={printStyles.table_inner_container}>
                      <table className={printStyles.table_inner}>
                        <tbody>
                          {order?.orderDetails?.items?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className={printStyles.cell_inner} style={{ width: '180px' }}>
                                  {item.itemName}
                                </td>
                                <td className={printStyles.cell_inner} style={{ width: '130px' }}>
                                  {item.size}
                                </td>
                                <td className={printStyles.cell_inner} style={{ width: '70px' }}>
                                  {item.qty}
                                </td>
                                <td className={printStyles.cell_inner} style={{ width: '60px' }}>
                                  {item.price}
                                </td>
                                <td className={printStyles.cell_inner} style={{ width: '40px' }}>
                                  {item.qty * item.price}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </td>
                  <td className={printStyles.cell_total}>{order.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintSalesDailySummary;
