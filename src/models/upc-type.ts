import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const UpcType = {
  UpcA: "UPC-A",
  UpcB: "UPC-B",
  UpcC: "UPC-C",
  UpcD: "UPC-D",
  UpcE: "UPC-E",
  Upc2: "UPC-2",
  Upc5: "UPC-5",
} as const;
export type UpcType = (typeof UpcType)[keyof typeof UpcType] | (string & {});

export const upcTypeSchema: EnumSchema<UpcType> = s.enumOf<UpcType>(UpcType);
