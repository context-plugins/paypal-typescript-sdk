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

export type BillingPlan = {
  id?: string;
  productId?: string;
  name?: string;
  status?: SubscriptionPlanStatus;
  description?: string;
  billingCycles?: SubscriptionBillingCycle[];
  paymentPreferences?: PaymentPreferences;
  merchantPreferences?: MerchantPreferences;
  taxes?: Taxes;
  quantitySupported?: boolean;
  createTime?: string;
  updateTime?: string;
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
  quantitySupported: s.optional(s.boolean()),
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
