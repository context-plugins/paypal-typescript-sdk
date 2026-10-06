import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { merchantPreferencesSchema, type MerchantPreferences } from "./merchant-preferences.js";
import { paymentPreferencesSchema, type PaymentPreferences } from "./payment-preferences.js";
import {
  subscriptionBillingCycleSchema,
  type SubscriptionBillingCycle,
} from "./subscription-billing-cycle.js";
import { taxesSchema, type Taxes } from "./taxes.js";

/** The plan details. */
export type PlanDetails = {
  /** The ID for the product. */
  productId?: string;
  /** The plan name. */
  name?: string;
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
};

export const planDetailsSchema: Schema<PlanDetails> = s.object<PlanDetails>({
  productId: s.optional(s.string()),
  name: s.optional(s.string()),
  description: s.optional(s.string()),
  billingCycles: s.optional(s.array(s.lazy(() => subscriptionBillingCycleSchema))),
  paymentPreferences: s.optional(s.lazy(() => paymentPreferencesSchema)),
  merchantPreferences: s.optional(s.lazy(() => merchantPreferencesSchema)),
  taxes: s.optional(s.lazy(() => taxesSchema)),
  quantitySupported: s.defaulted(s.boolean(), false),
  _keysMap: {
    productId: "product_id",
    billingCycles: "billing_cycles",
    paymentPreferences: "payment_preferences",
    merchantPreferences: "merchant_preferences",
    quantitySupported: "quantity_supported",
  },
});
