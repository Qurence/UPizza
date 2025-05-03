import crypto from 'crypto';

const WAYFORPAY_CONFIG = {
  merchantAccount: 'test_merch_n1',
  merchantSecretKey: 'flk3409refn54t54t*FNJRET',
  merchantDomainName: 'upizza.com', // DOMEN !
  apiUrl: 'https://secure.wayforpay.com/pay',
};

interface WayForPayRequest {
  merchantAccount: string;
  merchantDomainName: string;
  orderReference: string;
  orderDate: number;
  amount: number;
  currency: string;
  productName: string[];
  productCount: number[];
  productPrice: number[];
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  merchantSignature: string;
}

export function generateWayForPaySignature(data: string[]): string {
  const signatureString = [
    data[0], // merchantAccount
    data[1], // merchantDomainName
    data[2], // orderReference
    data[3], // orderDate
    data[4], // amount
    data[5], // currency
    data[6], // productName
    data[7], // productCount
    data[8], // productPrice
  ].join(';');
  
  return crypto
    .createHmac('md5', WAYFORPAY_CONFIG.merchantSecretKey)
    .update(signatureString)
    .digest('hex');
}

export function createPaymentRequest(orderData: {
  orderId: string;
  amount: number;
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
}): WayForPayRequest {
  const { orderId, amount, clientFirstName, clientLastName, clientEmail, clientPhone, clientAddress } = orderData;
  
  const requestData = {
    merchantAccount: WAYFORPAY_CONFIG.merchantAccount,
    merchantDomainName: WAYFORPAY_CONFIG.merchantDomainName,
    orderReference: orderId,
    orderDate: Math.floor(Date.now() / 1000),
    amount: amount,
    currency: 'UAH',
    productName: ['Заказ в UPizza'],
    productCount: [1],
    productPrice: [amount],
    clientFirstName,
    clientLastName,
    clientEmail,
    clientPhone,
    clientAddress,
  };

  const signatureData = [
    requestData.merchantAccount,
    requestData.merchantDomainName,
    requestData.orderReference,
    requestData.orderDate.toString(),
    requestData.amount.toString(),
    requestData.currency,
    requestData.productName.join(';'),
    requestData.productCount.join(';'),
    requestData.productPrice.join(';'),
  ];

  const merchantSignature = generateWayForPaySignature(signatureData);

  return {
    ...requestData,
    merchantSignature,
  };
}

export function getPaymentUrl(orderData: {
  orderId: string;
  amount: number;
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
}): string {
  const paymentRequest = createPaymentRequest(orderData);
  const queryParams = new URLSearchParams();
  
  Object.entries(paymentRequest).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value.forEach((item, index) => {
        queryParams.append(`${key}[]`, item.toString());
      });
    } else {
      queryParams.append(key, value.toString());
    }
  });

  return `${WAYFORPAY_CONFIG.apiUrl}?${queryParams.toString()}`;
} 