import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Operating System type of the device that the buyer is using. */
export const OsType = {
  /** Google Android OS. */
  Android: "ANDROID",
  /** Apple OS typically found in Apple mobile devices. */
  Ios: "IOS",
  /** Any other OS type. */
  Other: "OTHER",
} as const;
export type OsType = (typeof OsType)[keyof typeof OsType] | (string & {});

export const osTypeSchema: EnumSchema<OsType> = s.enumOf<OsType>(OsType);
