import { callAPi } from "./http-common";

const sharePaymentId = (id) => callAPi.post('/payment/createPayement', { id });

const PaymentService = {
    sharePaymentId,
};

export default PaymentService;
