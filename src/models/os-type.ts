import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const OsType = {
  Android: "ANDROID",
  Ios: "IOS",
  Other: "OTHER",
} as const;
export type OsType = (typeof OsType)[keyof typeof OsType] | (string & {});

export const osTypeSchema: EnumSchema<OsType> = s.enumOf<OsType>(OsType);
