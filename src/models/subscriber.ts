import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import {
  subscriptionPaymentSourceResponseSchema,
  type SubscriptionPaymentSourceResponse,
} from "./subscription-payment-source-response.js";

/** The subscriber response information. */
export type Subscriber = {
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /** The account identifier for a PayPal account. */
  payerId?: string;
  /** The name of the party. */
  name?: Name;
  /** The shipping details. */
  shippingAddress?: ShippingDetails;
  /** The payment source used to fund the payment. */
  paymentSource?: SubscriptionPaymentSourceResponse;
};

export const subscriberSchema: Schema<Subscriber> = s.object<Subscriber>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
  paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceResponseSchema)),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
    shippingAddress: "shipping_address",
    paymentSource: "payment_source",
  },
});
