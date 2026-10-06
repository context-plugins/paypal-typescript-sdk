import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { upcTypeSchema, type UpcType } from "./upc-type.js";

/** The Universal Product Code of the item. */
export type UniversalProductCode = {
  /** The Universal Product Code type. */
  type: UpcType;
  /** The UPC product code of the item. */
  code: string;
};

export const universalProductCodeSchema: Schema<UniversalProductCode> = s.object<UniversalProductCode>({
  type: upcTypeSchema,
  code: s.string(),
});
