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
  /**
   * The payment source definition. To be eligible to create subscription using debit or credit
   * card, you will need to sign up here (https://www.paypal.com/bizsignup/entry/product/ppcp).
   * Please note, its available only for non-3DS cards and for merchants in US and AU regions.
   */
  paymentSource?: SubscriptionPaymentSource;
  /** The phone information. */
  phone?: PhoneWithType;
};

export const subscriberRequestSchema: Schema<SubscriberRequest> = s.object<SubscriberRequest>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
  paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceSchema)),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
    shippingAddress: "shipping_address",
    paymentSource: "payment_source",
  },
});
