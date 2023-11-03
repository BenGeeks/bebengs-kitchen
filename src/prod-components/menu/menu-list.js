import React, { useState, useEffect } from 'react';

import Table from '@/assets/table';

import { MENU_HEADER } from '@/resources/menu';

import styles from './menu.module.css';

const MenuList = ({ menuQuery, selectMenuHandler, width }) => {
  const [menuList, setMenuList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const sortData = (menu) => {
    let sortedData = menu.sort((a, b) => {
      if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) return 1;
      if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) return -1;
      return 0;
    });
    return sortedData;
  };

  useEffect(() => {
    let data = menuQuery?.data ? menuQuery.data : [];
    let tempData = data.filter((menu) => menu.itemName.toLowerCase().includes(searchValue.toLowerCase()));
    searchValue.length === 0 ? setMenuList(data) : setMenuList([...tempData]);
  }, [searchValue, menuQuery]);

  return (
    <div className={styles.page_container} style={{ width: width }}>
      <div className={styles.main_page}>
        <div className={styles.header_bar}>
          <h3 className={styles.header_bar_title}>Menu List:</h3>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <Table
          headers={MENU_HEADER}
          data={sortData(menuList)}
          enableDelete={false}
          enableEdit={false}
          enableRowClick={true}
          onRowClick={selectMenuHandler}
          isLoading={menuQuery?.isLoading}
          isError={menuQuery?.isError}
        />
      </div>
    </div>
  );
};

export default MenuList;
