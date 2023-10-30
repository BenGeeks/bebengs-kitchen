import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine, RiBitCoinLine } from 'react-icons/ri';
import { BsCartCheck, BsCartX, BsCashCoin } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import apiRequest from '@/lib/axios';

import assetStyles from '@/styles/assets.module.css';
import orderStyles from '@/styles/order.module.css';
import ModalWide from '@/assets/modal-wide';

const OrderStatus = ({ order, index }) => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [delivered, setDelivered] = useState(order.isDelivered);
  const [paid, setPaid] = useState(order.isPaid);
  const [gCash, setGCash] = useState(order.isGcash);

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const statusUpdateHandler = () => {
    updateOrderMutation.mutate({
      id: order._id,
      data: {
        ...order,
        isDelivered: delivered,
        isPaid: paid,
        isGcash: gCash,
        paymentDate: paid ? moment() : null,
      },
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
              onClick={() => setDelivered((prev) => !prev)}
            >
              <TbTruckDelivery />
              <span className={orderStyles.status_icon_text}>{delivered ? 'Delivered' : 'Ordered'}</span>
            </div>
            <div
              className={`${orderStyles.status_icon} ${gCash ? orderStyles.status_icon_blue : orderStyles.status_icon_green}`}
              onClick={() => setGCash((prev) => !prev)}
            >
              {gCash ? <RiBitCoinLine /> : <BsCashCoin />}
              <span className={orderStyles.status_icon_text}>{gCash ? 'G-Cash' : 'Cash'}</span>
            </div>
            <div
              className={`${orderStyles.status_icon} ${paid ? orderStyles.status_icon_green : orderStyles.status_icon_red}`}
              onClick={() => setPaid((prev) => !prev)}
            >
              {paid ? <BsCartCheck /> : <BsCartX />}
              <span className={orderStyles.status_icon_text}>{paid ? 'Paid' : 'Not Paid'}</span>
            </div>
          </div>
          <div className={orderStyles.button_container}>
            <button type="reset" className={orderStyles.button_cancel} onClick={cancelHandler}>
              Cancel
            </button>
            <button className={orderStyles.button_save} type="submit" onClick={statusUpdateHandler}>
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
