import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  googlePayAuthenticationMethodSchema,
  type GooglePayAuthenticationMethod,
} from "./google-pay-authentication-method.js";
import { googlePayCardSchema, type GooglePayCard } from "./google-pay-card.js";
import { googlePayPaymentMethodSchema, type GooglePayPaymentMethod } from "./google-pay-payment-method.js";

/**
 * Details shared by Google for the merchant to be shared with PayPal. This is required to process
 * the transaction using the Google Pay payment method.
 */
export type GooglePayDecryptedTokenData = {
  /**
   * A unique ID that identifies the message in case it needs to be revoked or located at a later
   * time.
   */
  messageId?: string;
  /**
   * Date and time at which the message expires as UTC milliseconds since epoch. Integrators should
   * reject any message that's expired.
   */
  messageExpiration?: string;
  /** The type of the payment credential. Currently, only CARD is supported. */
  paymentMethod: GooglePayPaymentMethod;
  /** The payment card used to fund a Google Pay payment. Can be a credit or debit card. */
  card: GooglePayCard;
  /** Authentication Method which is used for the card transaction. */
  authenticationMethod: GooglePayAuthenticationMethod;
  /**
   * Base-64 cryptographic identifier used by card schemes to validate the token verification
   * result. This is a conditionally required field if authentication_method is CRYPTOGRAM_3DS.
   */
  cryptogram?: string;
  /**
   * Electronic Commerce Indicator may not always be present. It is only returned for tokens on the
   * Visa card network. This value is passed through in the payment authorization request.
   */
  eciIndicator?: string;
};

export const googlePayDecryptedTokenDataSchema: Schema<GooglePayDecryptedTokenData> =
  s.object<GooglePayDecryptedTokenData>({
    messageId: s.optional(s.string()),
    messageExpiration: s.optional(s.string()),
    paymentMethod: googlePayPaymentMethodSchema,
    card: googlePayCardSchema,
    authenticationMethod: googlePayAuthenticationMethodSchema,
    cryptogram: s.optional(s.string()),
    eciIndicator: s.optional(s.string()),
    _keysMap: {
      messageId: "message_id",
      messageExpiration: "message_expiration",
      paymentMethod: "payment_method",
      authenticationMethod: "authentication_method",
      eciIndicator: "eci_indicator",
    },
  });
