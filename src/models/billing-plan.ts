import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { merchantPreferencesSchema, type MerchantPreferences } from "./merchant-preferences.js";
import { paymentPreferencesSchema, type PaymentPreferences } from "./payment-preferences.js";
import {
  subscriptionBillingCycleSchema,
  type SubscriptionBillingCycle,
} from "./subscription-billing-cycle.js";
import { subscriptionPlanStatusSchema, type SubscriptionPlanStatus } from "./subscription-plan-status.js";
import { taxesSchema, type Taxes } from "./taxes.js";

/** The plan details. */
export type BillingPlan = {
  /** The unique PayPal-generated ID for the plan. */
  id?: string;
  /** The ID for the product. */
  productId?: string;
  /** The plan name. */
  name?: string;
  /** The plan status. */
  status?: SubscriptionPlanStatus;
  /** The detailed description of the plan. */
  description?: string;
  /**
   * An array of billing cycles for trial billing and regular billing. A plan can have at most two
   * trial cycles and only one regular cycle.
   */
  billingCycles?: SubscriptionBillingCycle[];
  /** The payment preferences for a subscription. */
  paymentPreferences?: PaymentPreferences;
  /** The merchant preferences for a subscription. */
  merchantPreferences?: MerchantPreferences;
  /** The tax details. */
  taxes?: Taxes;
  /**
   * Indicates whether you can subscribe to this plan by providing a quantity for the goods or
   * service.
   *
   * @default false
   */
  quantitySupported?: boolean;
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
  /**
   * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
   */
  links?: LinkDescription[];
};

export const billingPlanSchema: Schema<BillingPlan> = s.object<BillingPlan>({
  id: s.optional(s.string()),
  productId: s.optional(s.string()),
  name: s.optional(s.string()),
  status: s.optional(s.lazy(() => subscriptionPlanStatusSchema)),
  description: s.optional(s.string()),
  billingCycles: s.optional(s.array(s.lazy(() => subscriptionBillingCycleSchema))),
  paymentPreferences: s.optional(s.lazy(() => paymentPreferencesSchema)),
  merchantPreferences: s.optional(s.lazy(() => merchantPreferencesSchema)),
  taxes: s.optional(s.lazy(() => taxesSchema)),
  quantitySupported: s.defaulted(s.boolean(), false),
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    productId: "product_id",
    billingCycles: "billing_cycles",
    paymentPreferences: "payment_preferences",
    merchantPreferences: "merchant_preferences",
    quantitySupported: "quantity_supported",
    createTime: "create_time",
    updateTime: "update_time",
  },
});
