import { RiCloseCircleLine, RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';
import { LiaMoneyBillWaveAltSolid } from 'react-icons/lia';
import moment from 'moment';

import ModalWide from './modal-wide';
import Table from '@/assets/table';

import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import styles from './view-order.module.css';

const ViewOrderDetailsModal = ({ open, close, enableDelete, onDelete, enableEdit, onEdit, enabledPaid, onPaid, orderDetails }) => {
  let total = orderDetails?.orderDetails?.items.reduce((total, data) => +data.subTotal + total, 0);

  return (
    <ModalWide open={open} close={close}>
      <div className={styles.container}>
        <div className={styles.header_bar}>
          <h2 className={styles.header_text}>Order Details</h2>
          <div className={styles.header_icon_container}>
            {enableEdit && (
              <div className={styles.icon_box} title="edit" onClick={() => onEdit(orderDetails)}>
                <div className={styles.icon}>
                  <RiEditLine />
                </div>
                <p className={styles.icon_text}>Edit</p>
              </div>
            )}
            {enableDelete && (
              <div className={styles.icon_box} title="delete" onClick={() => onDelete(orderDetails._id)}>
                <div className={styles.icon}>
                  <RiDeleteBin4Line />
                </div>
                <p className={styles.icon_text}>Delete</p>
              </div>
            )}
            {enabledPaid && (
              <div className={styles.icon_box} title="paid" onClick={onPaid}>
                <div className={styles.icon}>
                  <LiaMoneyBillWaveAltSolid />
                </div>
                <p className={styles.icon_text}>Paid</p>
              </div>
            )}
          </div>
          <div className={styles.icon_box} title="close" onClick={close}>
            <div className={styles.icon}>
              <RiCloseCircleLine />
            </div>
            <p className={styles.icon_text}>Close</p>
          </div>
        </div>
        <div className={styles.customer_box}>
          <div className={styles.sub_header}>Customer's Info:</div>
          <div className={styles.info_container}>
            <div className={styles.title}>Name: </div>
            {orderDetails?.orderDetails?.customer?.name}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Address: </div>
            {orderDetails?.orderDetails?.customer?.address}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Block: </div>
            {orderDetails?.orderDetails?.customer?.block}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Lot: </div>
            {orderDetails?.orderDetails?.customer?.lot}
          </div>
        </div>
        <div className={styles.customer_box}>
          <div className={styles.sub_header}>Order Details:</div>
          <div className={styles.info_container}>
            <div className={styles.title}>Delivery Date: </div>
            {moment(orderDetails?.deliveryDate).format('MMM DD, yyyy')}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Delivery Time: </div>
            {orderDetails?.deliveryTime}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Is Delivered: </div>
            {orderDetails?.isDelivered ? '🟢' : '🔴'}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Is G-Cash: </div>
            {orderDetails?.isGcash ? '🔵' : '🟢'}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Is Paid: </div>
            {orderDetails?.isPaid ? '🟢' : '🔴'}
          </div>
          {orderDetails?.isPaid && (
            <div className={styles.info_container}>
              <div className={styles.title}>Payment Date: </div>
              {orderDetails.paymentDate && moment(orderDetails.paymentDate).format('MMM DD, yyyy')}
            </div>
          )}
        </div>
        <div className={styles.customer_box}>
          <div className={styles.sub_header}>Shopping Cart:</div>
          <Table headers={ORDER_ITEMS_HEADER} data={orderDetails?.orderDetails?.items} />
        </div>
        <div className={styles.bottom_container}>
          <div className={styles.total_container}>
            <div className={styles.total}>TOTAL: </div>
            <div className={styles.total}>₱ {total?.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </ModalWide>
  );
};

export default ViewOrderDetailsModal;
