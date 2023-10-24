'use client';
import React, { useState, useEffect } from 'react';

import Table from '@/assets/table';
import LoadingPage from '@/assets/loading';
import ErrorPage from '@/assets/error';
import { MENU_HEADER } from '@/resources/menu';
import menuStyles from '@/styles/menu.module.css';

const MenuList = ({ menuQuery, selectMenuHandler, isHalf }) => {
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

  if (menuQuery.isLoading) return <LoadingPage />;
  if (menuQuery.isError) return <ErrorPage error={JSON.stringify(menuQuery.error)} />;

  return (
    <div className={isHalf ? menuStyles.page_container_half : menuStyles.page_container_full}>
      <div className={menuStyles.main_page}>
        <div className={menuStyles.header_bar}>
          <h3 className={menuStyles.header_bar_title}>Menu List:</h3>
          <input
            className={menuStyles.search_input}
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
        />
      </div>
    </div>
  );
};

export default MenuList;
