import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { paymentInitiatorSchema, type PaymentInitiator } from "./payment-initiator.js";
import {
  storedPaymentSourceUsageTypeSchema,
  type StoredPaymentSourceUsageType,
} from "./stored-payment-source-usage-type.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";

export type PayPalWalletStoredCredential = {
  paymentInitiator: PaymentInitiator;
  chargePattern?: UsagePattern;
  usagePattern?: UsagePattern;
  usage?: StoredPaymentSourceUsageType;
};

export const payPalWalletStoredCredentialSchema: Schema<PayPalWalletStoredCredential> =
  s.object<PayPalWalletStoredCredential>({
    paymentInitiator: paymentInitiatorSchema,
    chargePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usage: s.optional(s.lazy(() => storedPaymentSourceUsageTypeSchema)),
    _keysMap: {
      paymentInitiator: "payment_initiator",
      chargePattern: "charge_pattern",
      usagePattern: "usage_pattern",
    },
  });
