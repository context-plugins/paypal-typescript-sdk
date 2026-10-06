import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingPlanSchema, type BillingPlan } from "./billing-plan.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";

/** The list of plans with details. */
export type PlanCollection = {
  /** An array of plans. */
  plans?: BillingPlan[];
  /** The total number of items. */
  totalItems?: number;
  /** The total number of pages. */
  totalPages?: number;
  /**
   * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
   */
  links?: LinkDescription[];
};

export const planCollectionSchema: Schema<PlanCollection> = s.object<PlanCollection>({
  plans: s.optional(s.array(s.lazy(() => billingPlanSchema))),
  totalItems: s.optional(s.int()),
  totalPages: s.optional(s.int()),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    totalItems: "total_items",
    totalPages: "total_pages",
  },
});
