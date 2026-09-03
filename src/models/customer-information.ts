import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";

export type CustomerInformation = {
  id?: string;
  emailAddress?: string;
  phone?: PhoneWithType;
  name?: Name;
};

export const customerInformationSchema: Schema<CustomerInformation> = s.object<CustomerInformation>({
  id: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  name: s.optional(s.lazy(() => nameSchema)),
  _keysMap: {
    emailAddress: "email_address",
  },
});
