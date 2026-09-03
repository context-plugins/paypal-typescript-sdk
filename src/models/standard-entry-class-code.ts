import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const StandardEntryClassCode = {
  Tel: "TEL",
  Web: "WEB",
  Ccd: "CCD",
  Ppd: "PPD",
} as const;
export type StandardEntryClassCode =
  | (typeof StandardEntryClassCode)[keyof typeof StandardEntryClassCode]
  | (string & {});

export const standardEntryClassCodeSchema: EnumSchema<StandardEntryClassCode> =
  s.enumOf<StandardEntryClassCode>(StandardEntryClassCode);
