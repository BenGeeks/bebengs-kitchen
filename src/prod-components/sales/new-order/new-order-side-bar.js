import moment from 'moment';

import Table from '@/assets/table';
import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import styles from './new-order.module.css';

const NewOrderSideBar = ({ selectedCustomer, orderDetails, items, step, setStep, onCancel, onSave, edit, setEdit, title }) => {
  let total = items.reduce((total, data) => +data.subTotal + total, 0) - +orderDetails.downPayment;

  const customerClickHandler = () => {
    if (step === 1) {
      setStep(2);
      setEdit(2);
    } else {
      setEdit(1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <h2 className={styles.header}>{title}</h2>
        {selectedCustomer && (
          <div className={styles.customer_box} onClick={customerClickHandler}>
            <div className={styles.sub_header}>Customer's Info:</div>
            <div className={styles.info_container}>
              <div className={styles.title}>Name: </div>
              {selectedCustomer?.name}
            </div>
            <div className={styles.info_container}>
              <div className={styles.title}>Address: </div>
              {selectedCustomer?.address}
            </div>
            <div className={styles.info_container}>
              <div className={styles.title}>Block: </div>
              {selectedCustomer?.block}
            </div>
            <div className={styles.info_container}>
              <div className={styles.title}>Lot: </div>
              {selectedCustomer?.lot}
            </div>
          </div>
        )}
        {orderDetails && step >= 2 && (
          <div className={styles.customer_box} onClick={() => setEdit(2)}>
            <div className={styles.sub_header}>Order Details:</div>
            <div className={styles.info_container}>
              <div className={styles.title}>Delivery Date: </div>
              {moment(orderDetails.deliveryDate).format('MMM DD, yyyy')}
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
              {orderDetails?.isGcash ? '🟢' : '🔴'}
            </div>
            <div className={styles.info_container}>
              <div className={styles.title}>Is Paid: </div>
              {orderDetails?.isPaid ? '🟢' : '🔴'}
            </div>
            {orderDetails.isPaid && (
              <div className={styles.info_container}>
                <div className={styles.title}>Payment Date: </div>
                {orderDetails.paymentDate && moment(orderDetails.paymentDate).format('MMM DD, yyyy')}
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div className={styles.customer_box} onClick={() => (edit === 3 ? setEdit(4) : setEdit(3))}>
            <div className={styles.sub_header}>Shopping Cart:</div>
            <div className={styles.table_container}>
              <Table headers={ORDER_ITEMS_HEADER} data={items} isShoppingCart={true} />
            </div>
          </div>
        )}
      </div>
      {selectedCustomer && items.length !== 0 && (
        <div className={styles.bottom_container}>
          <div className={styles.total_container}>
            <div className={styles.total}>TOTAL: </div>
            <div className={styles.total}>₱ {total.toLocaleString()}</div>
          </div>
          <div className={styles.action_container}>
            <div className={styles.cancel} onClick={onCancel}>
              CANCEL
            </div>
            <div className={styles.save} onClick={onSave}>
              SAVE
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrderSideBar;
