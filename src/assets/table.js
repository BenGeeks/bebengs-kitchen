import React from 'react';
import { RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';

import styles from './table.module.css';

const Table = ({ headers, data, enableActions, onDelete, onEdit }) => {
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
          {enableActions && (
            <th className={styles.table_head}>
              <div className={styles.table_head_text}>Actions</div>
            </th>
          )}
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
                      {row[header.name]}
                    </td>
                  );
                })}
                {enableActions && (
                  <td className={styles.cell}>
                    <div className={styles.icons_container}>
                      <div className={styles.delete_icon_holder} onClick={() => onDelete(row._id)}>
                        <RiDeleteBin4Line />
                      </div>
                      <div className={styles.edit_icon_holder} onClick={() => onEdit(row)}>
                        <RiEditLine />
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
