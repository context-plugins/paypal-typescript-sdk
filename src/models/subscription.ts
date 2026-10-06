import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { planDetailsSchema, type PlanDetails } from "./plan-details.js";
import { subscriberSchema, type Subscriber } from "./subscriber.js";
import {
  subscriptionBillingInformationSchema,
  type SubscriptionBillingInformation,
} from "./subscription-billing-information.js";

/** The subscription details. */
export type Subscription = {
  /** The PayPal-generated ID for the subscription. */
  id?: string;
  /** The ID of the plan. */
  planId?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  startTime?: string;
  /** The quantity of the product in the subscription. */
  quantity?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shippingAmount?: Money;
  /** The subscriber response information. */
  subscriber?: Subscriber;
  /**
   * The billing details for the subscription. If the subscription was or is active, these fields
   * are populated.
   */
  billingInfo?: SubscriptionBillingInformation;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  createTime?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  updateTime?: string;
  /** The custom id for the subscription. Can be invoice id. */
  customId?: string;
  /** Indicates whether the subscription has overridden any plan attributes. */
  planOverridden?: boolean;
  /** The plan details. */
  plan?: PlanDetails;
  /**
   * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
   */
  links?: LinkDescription[];
};

export const subscriptionSchema: Schema<Subscription> = s.object<Subscription>({
  id: s.optional(s.string()),
  planId: s.optional(s.string()),
  startTime: s.optional(s.string()),
  quantity: s.optional(s.string()),
  shippingAmount: s.optional(s.lazy(() => moneySchema)),
  subscriber: s.optional(s.lazy(() => subscriberSchema)),
  billingInfo: s.optional(s.lazy(() => subscriptionBillingInformationSchema)),
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  customId: s.optional(s.string()),
  planOverridden: s.optional(s.boolean()),
  plan: s.optional(s.lazy(() => planDetailsSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    planId: "plan_id",
    startTime: "start_time",
    shippingAmount: "shipping_amount",
    billingInfo: "billing_info",
    createTime: "create_time",
    updateTime: "update_time",
    customId: "custom_id",
    planOverridden: "plan_overridden",
  },
});
