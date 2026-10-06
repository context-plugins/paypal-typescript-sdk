import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { planOverrideSchema, type PlanOverride } from "./plan-override.js";
import { subscriberRequestSchema, type SubscriberRequest } from "./subscriber-request.js";
import {
  subscriptionApplicationContextSchema,
  type SubscriptionApplicationContext,
} from "./subscription-application-context.js";

/** The create subscription request details. */
export type CreateSubscriptionRequest = {
  /** The ID of the plan. */
  planId: string;
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
  /** The subscriber request information . */
  subscriber?: SubscriberRequest;
  /**
   * DEPRECATED. Indicates whether the subscription auto-renews after the billing cycles complete.
   *
   * @deprecated
   *
   * @default false
   */
  autoRenewal?: boolean;
  /**
   * DEPRECATED. The application context, which customizes the payer experience during the
   * subscription approval process with PayPal.
   *
   * @deprecated
   */
  applicationContext?: SubscriptionApplicationContext;
  /** The custom id for the subscription. Can be invoice id. */
  customId?: string;
  /**
   * An inline plan object to customise the subscription. You can override plan level default
   * attributes by providing customised values for the subscription in this object.
   */
  plan?: PlanOverride;
};

export const createSubscriptionRequestSchema: Schema<CreateSubscriptionRequest> =
  s.object<CreateSubscriptionRequest>({
    planId: s.string(),
    startTime: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    subscriber: s.optional(s.lazy(() => subscriberRequestSchema)),
    autoRenewal: s.defaulted(s.boolean(), false),
    applicationContext: s.optional(s.lazy(() => subscriptionApplicationContextSchema)),
    customId: s.optional(s.string()),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
    _keysMap: {
      planId: "plan_id",
      startTime: "start_time",
      shippingAmount: "shipping_amount",
      autoRenewal: "auto_renewal",
      applicationContext: "application_context",
      customId: "custom_id",
    },
  });
