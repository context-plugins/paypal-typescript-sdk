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

export type CardSupplementaryData = {
  level2?: Level2CardProcessingData;
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
