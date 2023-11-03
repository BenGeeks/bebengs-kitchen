import { RiMapPin2Line, RiMapPinAddLine } from 'react-icons/ri';
import { BiUserPlus, BiUser } from 'react-icons/bi';

import iconStyles from '@/styles/icons-bar.module.css';

const CustomerIconBar = ({ onAdd, onAddAddress, currentPage, setCurrentPage }) => {
  return (
    <div className={iconStyles.icon_bar_container}>
      <div className={iconStyles.icon_box} title="Customers" onClick={() => setCurrentPage('customer')}>
        <div className={currentPage === 'customer' ? iconStyles.icon_active : iconStyles.icon}>
          <BiUser />
        </div>
        <p className={iconStyles.icon_text}>Customers</p>
      </div>
      <div className={iconStyles.icon_box} title="Address" onClick={() => setCurrentPage('address')}>
        <div className={currentPage === 'address' ? iconStyles.icon_active : iconStyles.icon}>
          <RiMapPin2Line />
        </div>
        <p className={iconStyles.icon_text}>Address</p>
      </div>

      {currentPage === 'customer' && (
        <div className={iconStyles.icon_box} title="Add customer" onClick={onAdd}>
          <div className={iconStyles.icon}>
            <BiUserPlus />
          </div>
          <p className={iconStyles.icon_text}>+ Customer</p>
        </div>
      )}
      {currentPage === 'address' && (
        <div className={iconStyles.icon_box} title="Add address" onClick={onAddAddress}>
          <div className={iconStyles.icon}>
            <RiMapPinAddLine />
          </div>
          <p className={iconStyles.icon_text}>+ Address</p>
        </div>
      )}
    </div>
  );
};

export default CustomerIconBar;
