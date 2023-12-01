import React from 'react';
import { RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';

import styles from './table.module.css';

const Table = ({ headers, data, enableDelete, enableEdit, onDelete, onEdit, enableRowClick, onRowClick, small, x_small, alignRight }) => {
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
          {(enableDelete || enableEdit) && (
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
              <tr
                key={index}
                className={enableRowClick ? styles.table_row_clickable : styles.table_row}
                onClick={enableRowClick ? () => onRowClick(row) : null}
              >
                {headers.map((header, index) => {
                  return (
                    <td
                      key={index}
                      className={x_small ? styles.cell_x_small : styles.cell}
                      style={{ fontSize: small && '1rem', textAlign: alignRight ? 'right' : 'left' }}
                    >
                      {typeof row[header.name] === 'boolean' ? (row[header.name] ? '🟢' : '🔴') : row[header.name]}
                    </td>
                  );
                })}
                {(enableDelete || enableEdit) && (
                  <td className={styles.cell}>
                    <div className={styles.icons_container}>
                      {enableDelete && (
                        <div className={styles.delete_icon_holder} onClick={() => onDelete(row._id)}>
                          <RiDeleteBin4Line />
                        </div>
                      )}
                      {enableEdit && (
                        <div className={styles.edit_icon_holder} onClick={() => onEdit(row)}>
                          <RiEditLine />
                        </div>
                      )}
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
