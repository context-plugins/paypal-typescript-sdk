import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { incentiveDetailsSchema, type IncentiveDetails } from "./incentive-details.js";

/** The incentive details. */
export type IncentiveInformation = {
  /** An array of incentive details. */
  incentiveDetails?: IncentiveDetails[];
};

export const incentiveInformationSchema: Schema<IncentiveInformation> = s.object<IncentiveInformation>({
  incentiveDetails: s.optional(s.array(s.lazy(() => incentiveDetailsSchema))),
  _keysMap: {
    incentiveDetails: "incentive_details",
  },
});
