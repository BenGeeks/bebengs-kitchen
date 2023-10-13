import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import ViewVariationList from './variation-view-list';
import NewVariation from './variation-new';
import styles from '@/assets/modal.module.css';

const Variation = ({ menu_id }) => {
  const [onAdd, setOnAdd] = useState(false);

  return (
    <>
      <div className={styles.modal_sub_header}>
        <h3 className={styles.modal_sub_header_text}>Variations</h3>
        {!onAdd && (
          <div className={styles.modal_sub_header_icon} onClick={() => setOnAdd(true)}>
            <RiAddCircleLine />
          </div>
        )}
      </div>
      {onAdd ? <NewVariation onCancel={() => setOnAdd(false)} menu_id={menu_id} /> : <ViewVariationList menu_id={menu_id} />}
    </>
  );
};

export default Variation;
