import { RiCloseCircleLine, RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';
import { LiaMoneyBillWaveAltSolid } from 'react-icons/lia';
import moment from 'moment';

import { ORDER_ITEMS_HEADER } from './resources';
import styles from './view-order.module.css';
import ModalWide from './modal-wide';
import Table from '@/assets/table';

const ViewOrderDetailsModal = ({ open, close, enableDelete, onDelete, enableEdit, onEdit, enabledPaid, onPaid, orderDetails }) => {
  return (
    <ModalWide open={open} close={close}>
      <div className={styles.container}>
        <div className={styles.header_bar}>
          <h2 className={styles.header_text}>Order Details</h2>
          <div className={styles.header_icon_container}>
            {enableEdit && (
              <div className={styles.icon_box_edit} title="edit" onClick={() => onEdit(orderDetails)}>
                <div className={styles.icon}>
                  <RiEditLine />
                </div>
                <p className={styles.icon_text}>Edit</p>
              </div>
            )}
            {enableDelete && (
              <div className={styles.icon_box_delete} title="delete" onClick={() => onDelete(orderDetails._id)}>
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
            <div className={styles.icon_box} title="close" onClick={close}>
              <div className={styles.icon}>
                <RiCloseCircleLine />
              </div>
              <p className={styles.icon_text}>Close</p>
            </div>
          </div>
        </div>
        <div className={styles.customer_box}>
          <div className={styles.customer_info_container}>
            <div className={styles.customer_info}>{orderDetails?.orderDetails?.customer?.name}</div>
            <div
              className={styles.customer_info}
            >{`${orderDetails?.orderDetails?.customer?.address} ${orderDetails?.orderDetails?.customer?.block} ${orderDetails?.orderDetails?.customer?.lot}`}</div>
          </div>
        </div>
        <div className={styles.customer_box}>
          <div className={styles.sub_header}>Order Details:</div>
          <div className={styles.info_container}>
            <div className={styles.title}>Delivery Date: </div>
            {moment(orderDetails?.deliveryDate).format('ll')}
          </div>
          <div className={styles.info_container}>
            <div className={styles.title}>Delivery Time: </div>
            {orderDetails?.deliveryTime}
          </div>
          {orderDetails?.isDownPayment && (
            <div className={styles.info_container}>
              <div className={styles.title}>DP Date: </div>
              {moment(orderDetails?.downPaymentDate).format('ll')}
            </div>
          )}
          {orderDetails?.isPaid && (
            <div className={styles.info_container}>
              <div className={styles.title}>Payment Date: </div>
              {orderDetails.paymentDate && moment(orderDetails.paymentDate).format('ll')}
            </div>
          )}
          <div className={styles.info_container}>
            <div className={styles.title}>Delivered: {orderDetails?.isDelivered ? '🟢' : '🔴'}</div>
            <div className={styles.title}>G-Cash: {orderDetails?.isGcash ? '🔵' : '🟢'}</div>
            <div className={styles.title}>Paid: {orderDetails?.isPaid ? '🟢' : '🔴'}</div>
          </div>
        </div>
        <div className={styles.customer_box}>
          <div className={styles.sub_header}>Shopping Cart:</div>
          <Table headers={ORDER_ITEMS_HEADER} data={orderDetails?.orderDetails?.items} />
        </div>
        {!(!orderDetails?.deliveryCharge || orderDetails?.deliveryCharge === 0) && (
          <div className={styles.customer_box}>
            <div className={styles.additional_info_container}>
              <div>Delivery Charge:</div>
              <div>{orderDetails?.deliveryCharge?.toLocaleString('en-US')}</div>
            </div>
          </div>
        )}
        {!(!orderDetails?.discount || orderDetails?.discount === 0) && (
          <div className={styles.customer_box}>
            <div className={styles.additional_info_container}>
              <div>Discount:</div>
              <div>{orderDetails?.discount?.toLocaleString('en-US')}</div>
            </div>
          </div>
        )}
        {!(!orderDetails?.downPayment || orderDetails?.downPayment === 0) && (
          <div className={styles.customer_box}>
            <div className={styles.additional_info_container}>
              <div>Down Payment:</div>
              <div>{`( ${orderDetails?.downPayment?.toLocaleString('en-US')} )`}</div>
            </div>
          </div>
        )}
        <div className={styles.bottom_container}>
          <div className={styles.total_container}>
            <div className={styles.total}>TOTAL: </div>
            <div className={styles.total}>₱ {orderDetails?.total?.toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
    </ModalWide>
  );
};

export default ViewOrderDetailsModal;
