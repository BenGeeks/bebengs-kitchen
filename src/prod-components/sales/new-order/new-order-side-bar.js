import moment from 'moment';

import Table from '@/assets/table';
import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import newOrderStyles from '@/styles/new-order.module.css';

const NewOrderSideBar = ({ selectedCustomer, orderDetails, items, step, setStep, onCancel, onSave, edit, setEdit, title }) => {
  let total = items.reduce((total, data) => +data.subTotal + total, 0) - +orderDetails.downPayment;

  console.log('ORDER DETAILS: ', orderDetails);
  const customerClickHandler = () => {
    if (step === 1) {
      setStep(2);
      setEdit(2);
    } else {
      setEdit(1);
    }
  };
  return (
    <div className={newOrderStyles.container}>
      <div className={newOrderStyles.main_box}>
        <h2 className={newOrderStyles.header}>{title}</h2>
        {selectedCustomer && (
          <div className={newOrderStyles.customer_box} onClick={customerClickHandler}>
            <div className={newOrderStyles.sub_header}>Customer's Info:</div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Name: </div>
              {selectedCustomer?.name}
            </div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Address: </div>
              {selectedCustomer?.address}
            </div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Block: </div>
              {selectedCustomer?.block}
            </div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Lot: </div>
              {selectedCustomer?.lot}
            </div>
          </div>
        )}
        {orderDetails && step >= 2 && (
          <div className={newOrderStyles.customer_box} onClick={() => setEdit(2)}>
            <div className={newOrderStyles.sub_header}>Order Details:</div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Delivery Date: </div>
              {moment(orderDetails.deliveryDate).format('MMM DD, yyyy')}
            </div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Delivery Time: </div>
              {orderDetails?.deliveryTime}
            </div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Is Delivered: </div>
              {orderDetails?.isDelivered ? '🟢' : '🔴'}
            </div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Is G-Cash: </div>
              {orderDetails?.isGcash ? '🟢' : '🔴'}
            </div>
            <div className={newOrderStyles.info_container}>
              <div className={newOrderStyles.title}>Is Paid: </div>
              {orderDetails?.isPaid ? '🟢' : '🔴'}
            </div>
            {orderDetails.isPaid && (
              <div className={newOrderStyles.info_container}>
                <div className={newOrderStyles.title}>Payment Date: </div>
                {orderDetails.paymentDate && moment(orderDetails.paymentDate).format('MMM DD, yyyy')}
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div className={newOrderStyles.customer_box} onClick={() => (edit === 3 ? setEdit(4) : setEdit(3))}>
            <div className={newOrderStyles.sub_header}>Shopping Cart:</div>
            <div className={newOrderStyles.table_container}>
              <Table headers={ORDER_ITEMS_HEADER} data={items} />
            </div>
          </div>
        )}
      </div>
      {selectedCustomer && items.length !== 0 && (
        <div className={newOrderStyles.bottom_container}>
          <div className={newOrderStyles.total_container}>
            <div className={newOrderStyles.total}>TOTAL: </div>
            <div className={newOrderStyles.total}>₱ {total.toLocaleString()}</div>
          </div>
          <div className={newOrderStyles.action_container}>
            <div className={newOrderStyles.cancel} onClick={onCancel}>
              CANCEL
            </div>
            <div className={newOrderStyles.save} onClick={onSave}>
              SAVE
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrderSideBar;
