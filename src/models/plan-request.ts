import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { merchantPreferencesSchema, type MerchantPreferences } from "./merchant-preferences.js";
import { paymentPreferencesSchema, type PaymentPreferences } from "./payment-preferences.js";
import { PlanRequestStatus, planRequestStatusSchema } from "./plan-request-status.js";
import {
  subscriptionBillingCycleSchema,
  type SubscriptionBillingCycle,
} from "./subscription-billing-cycle.js";
import { taxesSchema, type Taxes } from "./taxes.js";

/** The create plan request details. */
export type PlanRequest = {
  /** The ID of the product created through Catalog Products API. */
  productId: string;
  /** The plan name. */
  name: string;
  /**
   * The initial state of the plan. Allowed input values are CREATED and ACTIVE.
   *
   * @default PlanRequestStatus.Active
   */
  status?: PlanRequestStatus;
  /** The detailed description of the plan. */
  description?: string;
  /**
   * An array of billing cycles for trial billing and regular billing. A plan can have at most two
   * trial cycles and only one regular cycle.
   */
  billingCycles: SubscriptionBillingCycle[];
  /** The payment preferences for a subscription. */
  paymentPreferences: PaymentPreferences;
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

export const planRequestSchema: Schema<PlanRequest> = s.object<PlanRequest>({
  productId: s.string(),
  name: s.string(),
  status: s.defaulted(planRequestStatusSchema, PlanRequestStatus.Active),
  description: s.optional(s.string()),
  billingCycles: s.array(s.lazy(() => subscriptionBillingCycleSchema)),
  paymentPreferences: paymentPreferencesSchema,
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
