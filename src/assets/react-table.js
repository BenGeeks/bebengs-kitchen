import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { RiDeleteBin4Line, RiEditLine, RiAddCircleLine } from 'react-icons/ri';

import styles from './react-table.module.css';

const ReactTable = ({ COLUMNS, DATA, onDelete, onAdd, onEdit, enableActions, enableAdd }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className={styles.table_head_row}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={styles.table_head}>
                <div className={styles.table_head_text}>{column.render('Header')}</div>
              </th>
            ))}
            {(enableActions || enableAdd) && (
              <th className={styles.table_head}>
                <div className={styles.table_head_text}>Actions</div>
              </th>
            )}
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
                    {cell.column.Header === 'image' && <img src={cell.value} className={styles.image} />}
                    {cell.column.Header !== 'image' && cell.render('Cell')}
                  </td>
                );
              })}
              {enableActions && (
                <td className={styles.cell}>
                  <div className={styles.icons_container}>
                    <div className={styles.delete_icon_holder} onClick={() => onDelete(row.original._id)}>
                      <RiDeleteBin4Line />
                    </div>
                    <div className={styles.edit_icon_holder} onClick={() => onEdit(row.original)}>
                      <RiEditLine />
                    </div>
                  </div>
                </td>
              )}
              {enableAdd && (
                <td className={styles.cell}>
                  <div className={styles.icons_container}>
                    <div className={styles.add_icon_holder} onClick={() => onAdd(row.original)}>
                      <RiAddCircleLine />
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

export default ReactTable;
