import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";
import { phoneTypeSchema, type PhoneType } from "./phone-type.js";

export type PhoneWithType = {
  phoneType?: PhoneType;
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
