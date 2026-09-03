import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { upcTypeSchema, type UpcType } from "./upc-type.js";

export type UniversalProductCode = {
  type: UpcType;
  code: string;
};

export const universalProductCodeSchema: Schema<UniversalProductCode> = s.object<UniversalProductCode>({
  type: upcTypeSchema,
  code: s.string(),
});
