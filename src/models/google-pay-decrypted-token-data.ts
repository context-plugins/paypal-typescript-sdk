import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  googlePayAuthenticationMethodSchema,
  type GooglePayAuthenticationMethod,
} from "./google-pay-authentication-method.js";
import { googlePayCardSchema, type GooglePayCard } from "./google-pay-card.js";
import { googlePayPaymentMethodSchema, type GooglePayPaymentMethod } from "./google-pay-payment-method.js";

export type GooglePayDecryptedTokenData = {
  messageId?: string;
  messageExpiration?: string;
  paymentMethod: GooglePayPaymentMethod;
  card: GooglePayCard;
  authenticationMethod: GooglePayAuthenticationMethod;
  cryptogram?: string;
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
