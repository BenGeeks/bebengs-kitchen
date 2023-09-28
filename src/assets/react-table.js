'use client';
import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import styles from './react-table.module.css';

const ReactTable = ({ COLUMNS, DATA }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
  return (
    <div className={styles.table_container}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={styles.table_head_row}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={styles.table_head}>
                  <div className={styles.table_head_text}>{column.render('Header')}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={styles.table_row}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className={styles.cell}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;
