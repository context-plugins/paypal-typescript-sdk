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

export type Subscription = {
  id?: string;
  planId?: string;
  startTime?: string;
  quantity?: string;
  shippingAmount?: Money;
  subscriber?: Subscriber;
  billingInfo?: SubscriptionBillingInformation;
  createTime?: string;
  updateTime?: string;
  customId?: string;
  planOverridden?: boolean;
  plan?: PlanDetails;
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
