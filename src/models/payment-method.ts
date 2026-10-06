import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  PayeePaymentMethodPreference,
  payeePaymentMethodPreferenceSchema,
} from "./payee-payment-method-preference.js";

/** The customer and merchant payment preferences. */
export type PaymentMethod = {
  /** The merchant-preferred payment methods. @default PayeePaymentMethodPreference.Unrestricted */
  payeePreferred?: PayeePaymentMethodPreference;
};

export const paymentMethodSchema: Schema<PaymentMethod> = s.object<PaymentMethod>({
  payeePreferred: s.defaulted(payeePaymentMethodPreferenceSchema, PayeePaymentMethodPreference.Unrestricted),
  _keysMap: {
    payeePreferred: "payee_preferred",
  },
});
