import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { planOverrideSchema, type PlanOverride } from "./plan-override.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import {
  subscriptionPatchApplicationContextSchema,
  type SubscriptionPatchApplicationContext,
} from "./subscription-patch-application-context.js";

/**
 * The request to update the quantity of the product or service in a subscription. You can also use
 * this method to switch the plan and update the `shipping_amount` and `shipping_address` values for
 * the subscription. This type of update requires the buyer's consent.
 */
export type ModifySubscriptionRequest = {
  /** The unique PayPal-generated ID for the plan. */
  planId?: string;
  /** The quantity of the product or service in the subscription. */
  quantity?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shippingAmount?: Money;
  /** The shipping details. */
  shippingAddress?: ShippingDetails;
  /**
   * The application context, which customizes the payer experience during the subscription approval
   * process with PayPal.
   */
  applicationContext?: SubscriptionPatchApplicationContext;
  /**
   * An inline plan object to customise the subscription. You can override plan level default
   * attributes by providing customised values for the subscription in this object.
   */
  plan?: PlanOverride;
};

export const modifySubscriptionRequestSchema: Schema<ModifySubscriptionRequest> =
  s.object<ModifySubscriptionRequest>({
    planId: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
    applicationContext: s.optional(s.lazy(() => subscriptionPatchApplicationContextSchema)),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
    _keysMap: {
      planId: "plan_id",
      shippingAmount: "shipping_amount",
      shippingAddress: "shipping_address",
      applicationContext: "application_context",
    },
  });
