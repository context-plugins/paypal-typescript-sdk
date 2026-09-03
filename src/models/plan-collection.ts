import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingPlanSchema, type BillingPlan } from "./billing-plan.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";

export type PlanCollection = {
  plans?: BillingPlan[];
  totalItems?: number;
  totalPages?: number;
  links?: LinkDescription[];
};

export const planCollectionSchema: Schema<PlanCollection> = s.object<PlanCollection>({
  plans: s.optional(s.array(s.lazy(() => billingPlanSchema))),
  totalItems: s.optional(s.number()),
  totalPages: s.optional(s.number()),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    totalItems: "total_items",
    totalPages: "total_pages",
  },
});
