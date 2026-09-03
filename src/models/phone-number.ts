import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type PhoneNumber = {
  nationalNumber: string;
};

export const phoneNumberSchema: Schema<PhoneNumber> = s.object<PhoneNumber>({
  nationalNumber: s.string(),
  _keysMap: {
    nationalNumber: "national_number",
  },
});
