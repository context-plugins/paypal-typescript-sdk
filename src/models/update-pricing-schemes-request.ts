import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { updatePricingSchemeSchema, type UpdatePricingScheme } from "./update-pricing-scheme.js";

/** The update pricing scheme request details. */
export type UpdatePricingSchemesRequest = {
  /** An array of pricing schemes. */
  pricingSchemes: UpdatePricingScheme[];
};

export const updatePricingSchemesRequestSchema: Schema<UpdatePricingSchemesRequest> =
  s.object<UpdatePricingSchemesRequest>({
    pricingSchemes: s.array(s.lazy(() => updatePricingSchemeSchema)),
    _keysMap: {
      pricingSchemes: "pricing_schemes",
    },
  });
