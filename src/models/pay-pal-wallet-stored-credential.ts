import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { paymentInitiatorSchema, type PaymentInitiator } from "./payment-initiator.js";
import {
  StoredPaymentSourceUsageType,
  storedPaymentSourceUsageTypeSchema,
} from "./stored-payment-source-usage-type.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";

/**
 * Provides additional details to process a payment using the PayPal wallet billing agreement or a
 * vaulted payment method that has been stored or is intended to be stored.
 */
export type PayPalWalletStoredCredential = {
  /** The person or party who initiated or triggered the payment. */
  paymentInitiator: PaymentInitiator;
  /**
   * DEPRECATED. Expected business/pricing model for the billing agreement, Please use usage_pattern
   * instead.
   *
   * @deprecated
   */
  chargePattern?: UsagePattern;
  /** Expected business/pricing model for the billing agreement. */
  usagePattern?: UsagePattern;
  /**
   * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also
   * referred to as stored credential or card on file).
   *
   * @default StoredPaymentSourceUsageType.Derived
   */
  usage?: StoredPaymentSourceUsageType;
};

export const payPalWalletStoredCredentialSchema: Schema<PayPalWalletStoredCredential> =
  s.object<PayPalWalletStoredCredential>({
    paymentInitiator: paymentInitiatorSchema,
    chargePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usage: s.defaulted(storedPaymentSourceUsageTypeSchema, StoredPaymentSourceUsageType.Derived),
    _keysMap: {
      paymentInitiator: "payment_initiator",
      chargePattern: "charge_pattern",
      usagePattern: "usage_pattern",
    },
  });
