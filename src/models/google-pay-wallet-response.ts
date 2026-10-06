import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { googlePayCardResponseSchema, type GooglePayCardResponse } from "./google-pay-card-response.js";
import {
  phoneNumberWithCountryCodeSchema,
  type PhoneNumberWithCountryCode,
} from "./phone-number-with-country-code.js";

/** Google Pay Wallet payment data. */
export type GooglePayWalletResponse = {
  /** The full name representation like Mr J Smith. */
  name?: string;
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /**
   * The phone number in its canonical international [E.164 numbering plan
   * format](https://www.itu.int/rec/T-REC-E.164/en).
   */
  phoneNumber?: PhoneNumberWithCountryCode;
  /**
   * The payment card to use to fund a Google Pay payment response. Can be a credit or debit card.
   */
  card?: GooglePayCardResponse;
};

export const googlePayWalletResponseSchema: Schema<GooglePayWalletResponse> =
  s.object<GooglePayWalletResponse>({
    name: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
    card: s.optional(s.lazy(() => googlePayCardResponseSchema)),
    _keysMap: {
      emailAddress: "email_address",
      phoneNumber: "phone_number",
    },
  });
