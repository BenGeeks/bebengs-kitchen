import { RiAddCircleLine } from 'react-icons/ri';

import iconStyles from '@/styles/icons-bar.module.css';

const FutureOrdersIconBar = ({ setCurrentPage }) => {
  return (
    <div className={iconStyles.icon_bar_container}>
      <div className={iconStyles.icon_box} title="Add order" onClick={() => setCurrentPage('new-order')}>
        <div className={iconStyles.icon}>
          <RiAddCircleLine />
        </div>
        <p className={iconStyles.icon_text}>New Order</p>
      </div>
    </div>
  );
};

export default FutureOrdersIconBar;
