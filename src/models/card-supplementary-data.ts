import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  level2CardProcessingDataSchema,
  type Level2CardProcessingData,
} from "./level2-card-processing-data.js";
import {
  level3CardProcessingDataSchema,
  type Level3CardProcessingData,
} from "./level3-card-processing-data.js";

/**
 * Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment
 * processing costs. For more information about processing payments, see checkout or multiparty
 * checkout.
 */
export type CardSupplementaryData = {
  /**
   * The level 2 card processing data collections. If your merchant account has been configured for
   * Level 2 processing this field will be passed to the processor on your behalf. Please contact
   * your PayPal Technical Account Manager to define level 2 data for your business.
   */
  level2?: Level2CardProcessingData;
  /**
   * The level 3 card processing data collections, If your merchant account has been configured for
   * Level 3 processing this field will be passed to the processor on your behalf. Please contact
   * your PayPal Technical Account Manager to define level 3 data for your business.
   */
  level3?: Level3CardProcessingData;
};

export const cardSupplementaryDataSchema: Schema<CardSupplementaryData> = s.object<CardSupplementaryData>({
  level2: s.optional(s.lazy(() => level2CardProcessingDataSchema)),
  level3: s.optional(s.lazy(() => level3CardProcessingDataSchema)),
  _keysMap: {
    level2: "level_2",
    level3: "level_3",
  },
});
