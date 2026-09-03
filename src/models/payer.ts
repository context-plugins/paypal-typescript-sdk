import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { nameSchema, type Name } from "./name.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";
import { taxInfoSchema, type TaxInfo } from "./tax-info.js";

export type Payer = {
  emailAddress?: string;
  payerId?: string;
  name?: Name;
  phone?: PhoneWithType;
  birthDate?: string;
  taxInfo?: TaxInfo;
  address?: Address;
};

export const payerSchema: Schema<Payer> = s.object<Payer>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  birthDate: s.optional(s.string()),
  taxInfo: s.optional(s.lazy(() => taxInfoSchema)),
  address: s.optional(s.lazy(() => addressSchema)),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
    birthDate: "birth_date",
    taxInfo: "tax_info",
  },
});
