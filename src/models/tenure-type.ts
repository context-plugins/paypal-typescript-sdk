import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const TenureType = {
  Regular: "REGULAR",
  Trial: "TRIAL",
} as const;
export type TenureType = (typeof TenureType)[keyof typeof TenureType] | (string & {});

export const tenureTypeSchema: EnumSchema<TenureType> = s.enumOf<TenureType>(TenureType);
