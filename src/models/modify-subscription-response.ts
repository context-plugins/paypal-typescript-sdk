import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { planOverrideSchema, type PlanOverride } from "./plan-override.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";

export type ModifySubscriptionResponse = {
  planId?: string;
  quantity?: string;
  shippingAmount?: Money;
  shippingAddress?: ShippingDetails;
  plan?: PlanOverride;
  planOverridden?: boolean;
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
