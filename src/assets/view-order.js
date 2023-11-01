import { RiCloseCircleLine, RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';
import { LiaMoneyBillWaveAltSolid } from 'react-icons/lia';
import moment from 'moment';

import ModalWide from './modal-wide';
import Table from '@/assets/table';

import { ORDER_ITEMS_HEADER } from '@/resources/orders';

import assetStyles from '@/styles/assets.module.css';
import iconStyles from '@/styles/icons.module.css';

const ViewOrderDetailsModal = ({ open, close, enableDelete, onDelete, enableEdit, onEdit, enabledPaid, onPaid, orderDetails }) => {
  let total = orderDetails?.orderDetails?.items.reduce((total, data) => +data.subTotal + total, 0);

  return (
    <ModalWide open={open} close={close}>
      <div className={assetStyles.container}>
        <div className={assetStyles.modal_header_bar}>
          <h2 className={assetStyles.modal_header_text}>Order Details</h2>
          <div className={assetStyles.modal_header_icon_container}>
            {enableEdit && (
              <div className={iconStyles.icon_box} title="edit" onClick={() => onEdit(orderDetails)}>
                <div className={iconStyles.icon}>
                  <RiEditLine />
                </div>
                <p className={iconStyles.icon_text}>Edit</p>
              </div>
            )}
            {enableDelete && (
              <div className={iconStyles.icon_box} title="delete" onClick={() => onDelete(orderDetails._id)}>
                <div className={iconStyles.icon}>
                  <RiDeleteBin4Line />
                </div>
                <p className={iconStyles.icon_text}>Delete</p>
              </div>
            )}
            {enabledPaid && (
              <div className={iconStyles.icon_box} title="paid" onClick={onPaid}>
                <div className={iconStyles.icon}>
                  <LiaMoneyBillWaveAltSolid />
                </div>
                <p className={iconStyles.icon_text}>Paid</p>
              </div>
            )}

            <div className={iconStyles.icon_box} title="close" onClick={close}>
              <div className={iconStyles.icon}>
                <RiCloseCircleLine />
              </div>
              <p className={iconStyles.icon_text}>Close</p>
            </div>
          </div>
        </div>
        <div className={assetStyles.main_box}>
          <div className={assetStyles.customer_box}>
            <div className={assetStyles.sub_header}>Customer's Info:</div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Name: </div>
              {orderDetails?.orderDetails?.customer?.name}
            </div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Address: </div>
              {orderDetails?.orderDetails?.customer?.address}
            </div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Block: </div>
              {orderDetails?.orderDetails?.customer?.block}
            </div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Lot: </div>
              {orderDetails?.orderDetails?.customer?.lot}
            </div>
          </div>
          <div className={assetStyles.customer_box}>
            <div className={assetStyles.sub_header}>Order Details:</div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Delivery Date: </div>
              {moment(orderDetails?.deliveryDate).format('MMM DD, yyyy')}
            </div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Delivery Time: </div>
              {orderDetails?.deliveryTime}
            </div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Is Delivered: </div>
              {orderDetails?.isDelivered ? '🟢' : '🔴'}
            </div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Is G-Cash: </div>
              {orderDetails?.isGcash ? '🔵' : '🟢'}
            </div>
            <div className={assetStyles.info_container}>
              <div className={assetStyles.title}>Is Paid: </div>
              {orderDetails?.isPaid ? '🟢' : '🔴'}
            </div>
            {orderDetails?.isPaid && (
              <div className={assetStyles.info_container}>
                <div className={assetStyles.title}>Payment Date: </div>
                {orderDetails.paymentDate && moment(orderDetails.paymentDate).format('MMM DD, yyyy')}
              </div>
            )}
          </div>
          <div className={assetStyles.customer_box}>
            <div className={assetStyles.sub_header}>Shopping Cart:</div>
            <div className={assetStyles.table_container}>
              <Table headers={ORDER_ITEMS_HEADER} data={orderDetails?.orderDetails?.items} />
            </div>
          </div>
          <div className={assetStyles.bottom_container}>
            <div className={assetStyles.total_container}>
              <div className={assetStyles.total}>TOTAL: </div>
              <div className={assetStyles.total}>₱ {total?.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </ModalWide>
  );
};

export default ViewOrderDetailsModal;
