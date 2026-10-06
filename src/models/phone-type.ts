import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The phone type. */
export const PhoneType = {
  /** Fax number. */
  Fax: "FAX",
  /** Home phone number. */
  Home: "HOME",
  /** Mobile phone number. */
  Mobile: "MOBILE",
  /** Other phone number. */
  Other: "OTHER",
  /** Pager number. */
  Pager: "PAGER",
} as const;
export type PhoneType = (typeof PhoneType)[keyof typeof PhoneType] | (string & {});

export const phoneTypeSchema: EnumSchema<PhoneType> = s.enumOf<PhoneType>(PhoneType);
