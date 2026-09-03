import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { payerNameSchema, type PayerName } from "./payer-name.js";
import { phoneSchema, type Phone } from "./phone.js";
import {
  simplePostalAddressCoarseGrainedSchema,
  type SimplePostalAddressCoarseGrained,
} from "./simple-postal-address-coarse-grained.js";

export type PayerInformation = {
  accountId?: string;
  emailAddress?: string;
  phoneNumber?: Phone;
  addressStatus?: string;
  payerStatus?: string;
  payerName?: PayerName;
  countryCode?: string;
  address?: SimplePostalAddressCoarseGrained;
};

export const payerInformationSchema: Schema<PayerInformation> = s.object<PayerInformation>({
  accountId: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => phoneSchema)),
  addressStatus: s.optional(s.string()),
  payerStatus: s.optional(s.string()),
  payerName: s.optional(s.lazy(() => payerNameSchema)),
  countryCode: s.optional(s.string()),
  address: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedSchema)),
  _keysMap: {
    accountId: "account_id",
    emailAddress: "email_address",
    phoneNumber: "phone_number",
    addressStatus: "address_status",
    payerStatus: "payer_status",
    payerName: "payer_name",
    countryCode: "country_code",
  },
});
