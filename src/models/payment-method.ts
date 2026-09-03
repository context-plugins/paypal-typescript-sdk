import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  payeePaymentMethodPreferenceSchema,
  type PayeePaymentMethodPreference,
} from "./payee-payment-method-preference.js";

export type PaymentMethod = {
  payeePreferred?: PayeePaymentMethodPreference;
};

export const paymentMethodSchema: Schema<PaymentMethod> = s.object<PaymentMethod>({
  payeePreferred: s.optional(s.lazy(() => payeePaymentMethodPreferenceSchema)),
  _keysMap: {
    payeePreferred: "payee_preferred",
  },
});
