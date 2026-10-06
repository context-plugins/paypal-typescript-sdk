import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  PayeePaymentMethodPreference,
  payeePaymentMethodPreferenceSchema,
} from "./payee-payment-method-preference.js";
import { StandardEntryClassCode, standardEntryClassCodeSchema } from "./standard-entry-class-code.js";

/** The customer and merchant payment preferences. */
export type PaymentMethodPreference = {
  /** The merchant-preferred payment methods. @default PayeePaymentMethodPreference.Unrestricted */
  payeePreferred?: PayeePaymentMethodPreference;
  /**
   * NACHA (the regulatory body governing the ACH network) requires that API callers (merchants,
   * partners) obtain the consumer’s explicit authorization before initiating a transaction. To stay
   * compliant, you’ll need to make sure that you retain a compliant authorization for each
   * transaction that you originate to the ACH Network using this API. ACH transactions are
   * categorized (using SEC codes) by how you capture authorization from the Receiver (the person
   * whose bank account is being debited or credited). PayPal supports the following SEC codes.
   *
   * @default StandardEntryClassCode.Web
   */
  standardEntryClassCode?: StandardEntryClassCode;
};

export const paymentMethodPreferenceSchema: Schema<PaymentMethodPreference> =
  s.object<PaymentMethodPreference>({
    payeePreferred: s.defaulted(
      payeePaymentMethodPreferenceSchema,
      PayeePaymentMethodPreference.Unrestricted,
    ),
    standardEntryClassCode: s.defaulted(standardEntryClassCodeSchema, StandardEntryClassCode.Web),
    _keysMap: {
      payeePreferred: "payee_preferred",
      standardEntryClassCode: "standard_entry_class_code",
    },
  });
