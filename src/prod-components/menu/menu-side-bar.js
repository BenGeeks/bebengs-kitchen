import React from 'react';
import { RiCloseCircleLine, RiAddBoxLine } from 'react-icons/ri';

import Table from '@/assets/table';
import { VARIATION_HEADERS } from '@/resources/menu';
import menuStyles from '@/styles/menu.module.css';

const MenuSideBar = ({ isHalf, selectedMenu, setSelectedMenu, variationQuery }) => {
  return (
    <div className={isHalf ? menuStyles.page_container_half : menuStyles.page_container_closed}>
      <div className={menuStyles.main_page}>
        <div className={menuStyles.header_bar}>
          <h3 className={menuStyles.header_bar_title}>
            {selectedMenu?.itemName} {selectedMenu ? 'Details' : ''}
          </h3>
          <div className={menuStyles.small_icon} onClick={() => setSelectedMenu(null)}>
            <RiCloseCircleLine />
          </div>
        </div>
        <div className={menuStyles.image_container}>
          <img src="/images/jabe_value_meal.jpeg" alt="Menu image" />
          <p className={menuStyles.description}>{selectedMenu?.description}</p>
        </div>
        <div className={menuStyles.header_bar}>
          <h3 className={menuStyles.header_bar_title}>Variations:</h3>
          <div className={menuStyles.small_icon} onClick={() => setSelectedMenu(null)}>
            <RiAddBoxLine />
          </div>
        </div>
        <Table
          headers={VARIATION_HEADERS}
          data={variationQuery}
          enableDelete={false}
          enableEdit={false}
          enableRowClick={true}
          onRowClick={(variant) => console.log(variant)}
        />
      </div>
    </div>
  );
};

export default MenuSideBar;
