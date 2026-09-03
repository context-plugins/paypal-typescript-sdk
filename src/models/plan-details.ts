import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { merchantPreferencesSchema, type MerchantPreferences } from "./merchant-preferences.js";
import { paymentPreferencesSchema, type PaymentPreferences } from "./payment-preferences.js";
import {
  subscriptionBillingCycleSchema,
  type SubscriptionBillingCycle,
} from "./subscription-billing-cycle.js";
import { taxesSchema, type Taxes } from "./taxes.js";

export type PlanDetails = {
  productId?: string;
  name?: string;
  description?: string;
  billingCycles?: SubscriptionBillingCycle[];
  paymentPreferences?: PaymentPreferences;
  merchantPreferences?: MerchantPreferences;
  taxes?: Taxes;
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
  quantitySupported: s.optional(s.boolean()),
  _keysMap: {
    productId: "product_id",
    billingCycles: "billing_cycles",
    paymentPreferences: "payment_preferences",
    merchantPreferences: "merchant_preferences",
    quantitySupported: "quantity_supported",
  },
});
