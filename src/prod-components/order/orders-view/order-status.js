import moment from 'moment';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiBitCoinLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { BsCartCheck, BsCartX, BsCashCoin } from 'react-icons/bs';

import ModalWide from '@/assets/modal-wide';
import orderStyles from '@/styles/order.module.css';
import assetStyles from '@/styles/assets.module.css';

const OrderStatus = ({ order, index, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [delivered, setDelivered] = useState(order.isDelivered);
  const [paid, setPaid] = useState(order.isPaid);
  const [gCash, setGCash] = useState(order.isGcash);

  const onSubmitHandler = () => {
    onUpdate({
      isDelivered: delivered,
      isPaid: paid,
      isGcash: gCash,
      _id: order._id,
      paymentDate: paid ? moment().add(8, 'h') : null,
    });
    setModalOpen(false);
  };

  const cancelHandler = () => {
    setDelivered(order.isDelivered);
    setPaid(order.isPaid);
    setGCash(order.isGcash);
    setModalOpen(false);
  };
  const getStatusColor = (data) => {
    if (data && !data.isPaid && data.isDelivered && data.isGcash) return orderStyles.red;
    if (data && !data.isPaid && data.isDelivered && !data.isGcash) return orderStyles.purple;

    if (data && data.isPaid && !data.isDelivered && !data.isGcash) return orderStyles.turquoise;
    if (data && data.isPaid && !data.isDelivered && data.isGcash) return orderStyles.pink;

    if (data && data.isPaid && data.isDelivered && data.isGcash) return orderStyles.blue;
    if (data && data.isPaid && data.isDelivered && !data.isGcash) return orderStyles.green;

    return orderStyles.orange;
  };

  return (
    <>
      <ModalWide open={modalOpen}>
        <div className={assetStyles.modal_header_bar}>
          <h2 className={assetStyles.modal_header_text}>Update Order Status</h2>
          <div className={assetStyles.modal_header_icon_container}>
            <div className={assetStyles.modal_header_icon} onClick={() => setModalOpen(false)}>
              <RiCloseCircleLine />
            </div>
          </div>
        </div>
        <div className={assetStyles.modal_body}>
          <div className={orderStyles.status_icon_container}>
            <div
              className={`${orderStyles.status_icon} ${delivered ? orderStyles.status_icon_green : orderStyles.status_icon_red}`}
              onClick={() => setDelivered(!delivered)}
            >
              <TbTruckDelivery />
              <span className={orderStyles.status_icon_text}>{delivered ? 'Delivered' : 'Ordered'}</span>
            </div>
            <div
              className={`${orderStyles.status_icon} ${gCash ? orderStyles.status_icon_blue : orderStyles.status_icon_green}`}
              onClick={() => setGCash(!gCash)}
            >
              {gCash ? <RiBitCoinLine /> : <BsCashCoin />}
              <span className={orderStyles.status_icon_text}>{gCash ? 'G-Cash' : 'Cash'}</span>
            </div>
            <div
              className={`${orderStyles.status_icon} ${paid ? orderStyles.status_icon_green : orderStyles.status_icon_red}`}
              onClick={() => setPaid(!paid)}
            >
              {paid ? <BsCartCheck /> : <BsCartX />}
              <span className={orderStyles.status_icon_text}>{paid ? 'Paid' : 'Not Paid'}</span>
            </div>
          </div>
          <div className={orderStyles.button_container}>
            <button type="reset" className={orderStyles.button_cancel} onClick={cancelHandler}>
              Cancel
            </button>
            <button className={orderStyles.button_save} type="submit" onClick={onSubmitHandler}>
              Save
            </button>
          </div>
        </div>
      </ModalWide>
      <div className={`${orderStyles.cell_order_number_container} ${getStatusColor(order)}`} onClick={() => setModalOpen(true)}>
        {index + 1}
      </div>
    </>
  );
};

export default OrderStatus;
