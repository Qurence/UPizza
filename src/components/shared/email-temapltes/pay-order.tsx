import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
    orderId,
    totalAmount,
    paymentUrl
}) => (
  <div>
    <h1>Замовлення №{orderId}</h1>

    <p>Оплатіть замовлення на суму: {totalAmount} ₴. <br/> Перейдіть за <a href={paymentUrl}>цим посиланням</a> для оплати.</p>
  </div>
);