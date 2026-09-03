import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { networkTransactionSchema, type NetworkTransaction } from "./network-transaction.js";
import { paymentInitiatorSchema, type PaymentInitiator } from "./payment-initiator.js";
import {
  storedPaymentSourcePaymentTypeSchema,
  type StoredPaymentSourcePaymentType,
} from "./stored-payment-source-payment-type.js";
import {
  storedPaymentSourceUsageTypeSchema,
  type StoredPaymentSourceUsageType,
} from "./stored-payment-source-usage-type.js";

export type StoredPaymentSource = {
  paymentInitiator: PaymentInitiator;
  paymentType: StoredPaymentSourcePaymentType;
  usage?: StoredPaymentSourceUsageType;
  previousNetworkTransactionReference?: NetworkTransaction;
};

export const storedPaymentSourceSchema: Schema<StoredPaymentSource> = s.object<StoredPaymentSource>({
  paymentInitiator: paymentInitiatorSchema,
  paymentType: storedPaymentSourcePaymentTypeSchema,
  usage: s.optional(s.lazy(() => storedPaymentSourceUsageTypeSchema)),
  previousNetworkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
  _keysMap: {
    paymentInitiator: "payment_initiator",
    paymentType: "payment_type",
    previousNetworkTransactionReference: "previous_network_transaction_reference",
  },
});
