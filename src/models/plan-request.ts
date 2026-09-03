import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { merchantPreferencesSchema, type MerchantPreferences } from "./merchant-preferences.js";
import { paymentPreferencesSchema, type PaymentPreferences } from "./payment-preferences.js";
import { planRequestStatusSchema, type PlanRequestStatus } from "./plan-request-status.js";
import {
  subscriptionBillingCycleSchema,
  type SubscriptionBillingCycle,
} from "./subscription-billing-cycle.js";
import { taxesSchema, type Taxes } from "./taxes.js";

export type PlanRequest = {
  productId: string;
  name: string;
  status?: PlanRequestStatus;
  description?: string;
  billingCycles: SubscriptionBillingCycle[];
  paymentPreferences: PaymentPreferences;
  merchantPreferences?: MerchantPreferences;
  taxes?: Taxes;
  quantitySupported?: boolean;
};

export const planRequestSchema: Schema<PlanRequest> = s.object<PlanRequest>({
  productId: s.string(),
  name: s.string(),
  status: s.optional(s.lazy(() => planRequestStatusSchema)),
  description: s.optional(s.string()),
  billingCycles: s.array(s.lazy(() => subscriptionBillingCycleSchema)),
  paymentPreferences: paymentPreferencesSchema,
  merchantPreferences: s.optional(s.lazy(() => merchantPreferencesSchema)),
  taxes: s.optional(s.lazy(() => taxesSchema)),
  quantitySupported: s.optional(s.boolean()),
  _keysMap: {
    productId: "product_id",
    billingCycles: "billing_cycles",
    paymentPreferences: "payment_preferences",
    merchantPreferences: "merchant_preferences",
    quantitySupported: "quantity_supported",
  },
});
