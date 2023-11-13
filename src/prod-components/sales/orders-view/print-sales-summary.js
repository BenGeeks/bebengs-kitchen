'use client';
import React from 'react';
import moment from 'moment';

import styles from './print-sales-summary.module.css';

const PrintSalesDailySummary = ({ data, salesSummary, date }) => {
  return (
    <div className={styles.print_container}>
      <div className={styles.print_head_container}>
        <header>
          <div className={styles.print_head_logo}>Bebeng's Kitchen</div>
          <div>
            Daily Sales Report for <u>{moment(date).format('LL')}</u>
          </div>
        </header>
        <div className={styles.print_head_summary}>
          <div>Total Cash: {salesSummary?.cashTotal.toLocaleString('en-US')}</div>
          <div>Total G-cash: {salesSummary?.gCashTotal.toLocaleString('en-US')}</div>
          <div>
            <b>Total Sales: {salesSummary?.dailyTotal.toLocaleString('en-US')}</b>
          </div>
        </div>
      </div>
      <div className={styles.print_body_container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.table_row}>
              <th className={styles.header_text_container}>
                <div className={styles.cell_inner} style={{ width: '50px' }}>
                  name
                </div>
                <div className={styles.cell_inner} style={{ width: '180px' }}>
                  item
                </div>
                <div className={styles.cell_inner} style={{ width: '150px' }}>
                  size
                </div>
                <div className={styles.cell_inner} style={{ width: '120px' }}>
                  qty
                </div>
                <div className={styles.cell_inner} style={{ width: '80px' }}>
                  price
                </div>
                <div className={styles.cell_inner} style={{ width: '80px' }}>
                  sub-total
                </div>
              </th>

              <th className={styles.table_head}>Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, index) => {
              return (
                <tr key={index} className={styles.table_row}>
                  <td className={styles.cell}>
                    <div className={styles.print_cell_name}>{order.orderDetails.customer.name}</div>
                    <div className={styles.table_inner_container}>
                      <table className={styles.table_inner}>
                        <tbody>
                          {order?.orderDetails?.items?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className={styles.cell_inner} style={{ width: '180px' }}>
                                  {item.itemName}
                                </td>
                                <td className={styles.cell_inner} style={{ width: '130px' }}>
                                  {item.size}
                                </td>
                                <td className={styles.cell_inner} style={{ width: '70px' }}>
                                  {item.qty}
                                </td>
                                <td className={styles.cell_inner} style={{ width: '60px' }}>
                                  {item.price}
                                </td>
                                <td className={styles.cell_inner} style={{ width: '40px' }}>
                                  {item.qty * item.price}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </td>
                  <td className={styles.cell_total}>{order.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <footer>
          <span class="page_number"></span>
        </footer>
      </div>
    </div>
  );
};

export default PrintSalesDailySummary;
