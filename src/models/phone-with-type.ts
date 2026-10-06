import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";
import { phoneTypeSchema, type PhoneType } from "./phone-type.js";

/** The phone information. */
export type PhoneWithType = {
  /** The phone type. */
  phoneType?: PhoneType;
  /**
   * The phone number in its canonical international [E.164 numbering plan
   * format](https://www.itu.int/rec/T-REC-E.164/en).
   */
  phoneNumber: PhoneNumber;
};

export const phoneWithTypeSchema: Schema<PhoneWithType> = s.object<PhoneWithType>({
  phoneType: s.optional(s.lazy(() => phoneTypeSchema)),
  phoneNumber: phoneNumberSchema,
  _keysMap: {
    phoneType: "phone_type",
    phoneNumber: "phone_number",
  },
});
