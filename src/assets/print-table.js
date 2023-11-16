import React from 'react';

import styles from './print-table.module.css';

const PrintTable = ({ headers, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.table_head_row}>
          {headers.map((header) => {
            return (
              <th className={styles.table_head} key={header.name}>
                <div className={styles.table_head_text}>{header.display}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row, index) => {
            return (
              <tr key={index} className={styles.table_row}>
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={styles.cell}>
                      {row[header.name].toLocaleString()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default PrintTable;
