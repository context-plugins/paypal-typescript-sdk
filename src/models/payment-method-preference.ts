import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  payeePaymentMethodPreferenceSchema,
  type PayeePaymentMethodPreference,
} from "./payee-payment-method-preference.js";
import { standardEntryClassCodeSchema, type StandardEntryClassCode } from "./standard-entry-class-code.js";

export type PaymentMethodPreference = {
  payeePreferred?: PayeePaymentMethodPreference;
  standardEntryClassCode?: StandardEntryClassCode;
};

export const paymentMethodPreferenceSchema: Schema<PaymentMethodPreference> =
  s.object<PaymentMethodPreference>({
    payeePreferred: s.optional(s.lazy(() => payeePaymentMethodPreferenceSchema)),
    standardEntryClassCode: s.optional(s.lazy(() => standardEntryClassCodeSchema)),
    _keysMap: {
      payeePreferred: "payee_preferred",
      standardEntryClassCode: "standard_entry_class_code",
    },
  });
