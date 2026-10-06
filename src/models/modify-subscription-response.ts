import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { planOverrideSchema, type PlanOverride } from "./plan-override.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";

/**
 * The response to a request to update the quantity of the product or service in a subscription. You
 * can also use this method to switch the plan and update the `shipping_amount` and
 * `shipping_address` values for the subscription. This type of update requires the buyer's consent.
 */
export type ModifySubscriptionResponse = {
  /** The unique PayPal-generated ID for the plan. */
  planId?: string;
  /** The quantity of the product or service in the subscription. */
  quantity?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shippingAmount?: Money;
  /** The shipping details. */
  shippingAddress?: ShippingDetails;
  /**
   * An inline plan object to customise the subscription. You can override plan level default
   * attributes by providing customised values for the subscription in this object.
   */
  plan?: PlanOverride;
  /** Indicates whether the subscription has overridden any plan attributes. */
  planOverridden?: boolean;
  /**
   * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
   */
  links?: LinkDescription[];
};

export const modifySubscriptionResponseSchema: Schema<ModifySubscriptionResponse> =
  s.object<ModifySubscriptionResponse>({
    planId: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
    planOverridden: s.optional(s.boolean()),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
      planId: "plan_id",
      shippingAmount: "shipping_amount",
      shippingAddress: "shipping_address",
      planOverridden: "plan_overridden",
    },
  });
