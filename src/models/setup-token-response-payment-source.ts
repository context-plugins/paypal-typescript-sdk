import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { payPalPaymentTokenSchema, type PayPalPaymentToken } from "./pay-pal-payment-token.js";
import { setupTokenResponseCardSchema, type SetupTokenResponseCard } from "./setup-token-response-card.js";
import { venmoPaymentTokenSchema, type VenmoPaymentToken } from "./venmo-payment-token.js";

export type SetupTokenResponsePaymentSource = {
  card?: SetupTokenResponseCard;
  paypal?: PayPalPaymentToken;
  venmo?: VenmoPaymentToken;
};

export const setupTokenResponsePaymentSourceSchema: Schema<SetupTokenResponsePaymentSource> =
  s.object<SetupTokenResponsePaymentSource>({
    card: s.optional(s.lazy(() => setupTokenResponseCardSchema)),
    paypal: s.optional(s.lazy(() => payPalPaymentTokenSchema)),
    venmo: s.optional(s.lazy(() => venmoPaymentTokenSchema)),
  });
