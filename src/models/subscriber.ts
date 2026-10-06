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
  /** The name of the party. */
  name?: Name;
  /** The shipping details. */
  shippingAddress?: ShippingDetails;
  /** The payment source used to fund the payment. */
  paymentSource?: SubscriptionPaymentSourceResponse;
};

export const subscriberSchema: Schema<Subscriber> = s.object<Subscriber>({
  name: s.optional(s.lazy(() => nameSchema)),
  shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
  paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceResponseSchema)),
  _keysMap: {
    shippingAddress: "shipping_address",
    paymentSource: "payment_source",
  },
});
