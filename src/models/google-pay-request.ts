import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { assuranceDetailsSchema, type AssuranceDetails } from "./assurance-details.js";
import {
  googlePayDecryptedTokenDataSchema,
  type GooglePayDecryptedTokenData,
} from "./google-pay-decrypted-token-data.js";
import {
  googlePayExperienceContextSchema,
  type GooglePayExperienceContext,
} from "./google-pay-experience-context.js";
import { googlePayRequestCardSchema, type GooglePayRequestCard } from "./google-pay-request-card.js";
import {
  phoneNumberWithCountryCodeSchema,
  type PhoneNumberWithCountryCode,
} from "./phone-number-with-country-code.js";

/** Information needed to pay using Google Pay. */
export type GooglePayRequest = {
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
  /** The payment card used to fund a Google Pay payment. Can be a credit or debit card. */
  card?: GooglePayRequestCard;
  /**
   * Details shared by Google for the merchant to be shared with PayPal. This is required to process
   * the transaction using the Google Pay payment method.
   */
  decryptedToken?: GooglePayDecryptedTokenData;
  /**
   * Information about cardholder possession validation and cardholder identification and
   * verifications (ID&V).
   */
  assuranceDetails?: AssuranceDetails;
  /** Customizes the payer experience during the approval process for the payment. */
  experienceContext?: GooglePayExperienceContext;
};

export const googlePayRequestSchema: Schema<GooglePayRequest> = s.object<GooglePayRequest>({
  name: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
  card: s.optional(s.lazy(() => googlePayRequestCardSchema)),
  decryptedToken: s.optional(s.lazy(() => googlePayDecryptedTokenDataSchema)),
  assuranceDetails: s.optional(s.lazy(() => assuranceDetailsSchema)),
  experienceContext: s.optional(s.lazy(() => googlePayExperienceContextSchema)),
  _keysMap: {
    emailAddress: "email_address",
    phoneNumber: "phone_number",
    decryptedToken: "decrypted_token",
    assuranceDetails: "assurance_details",
    experienceContext: "experience_context",
  },
});
