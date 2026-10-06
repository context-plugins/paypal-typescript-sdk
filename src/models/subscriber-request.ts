import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import {
  subscriptionPaymentSourceSchema,
  type SubscriptionPaymentSource,
} from "./subscription-payment-source.js";

/** The subscriber request information . */
export type SubscriberRequest = {
  /** The name of the party. */
  name?: Name;
  /** The phone information. */
  phone?: PhoneWithType;
  /** The shipping details. */
  shippingAddress?: ShippingDetails;
  /**
   * The payment source definition. To be eligible to create subscription using debit or credit
   * card, you will need to sign up here (https://www.paypal.com/bizsignup/entry/product/ppcp).
   * Please note, its available only for non-3DS cards and for merchants in US and AU regions.
   */
  paymentSource?: SubscriptionPaymentSource;
};

export const subscriberRequestSchema: Schema<SubscriberRequest> = s.object<SubscriberRequest>({
  name: s.optional(s.lazy(() => nameSchema)),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
  paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceSchema)),
  _keysMap: {
    shippingAddress: "shipping_address",
    paymentSource: "payment_source",
  },
});
