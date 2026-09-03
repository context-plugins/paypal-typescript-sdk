import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { experienceStatusSchema, type ExperienceStatus } from "./experience-status.js";
import { nameSchema, type Name } from "./name.js";
import {
  payPalWalletAccountVerificationStatusSchema,
  type PayPalWalletAccountVerificationStatus,
} from "./pay-pal-wallet-account-verification-status.js";
import {
  payPalWalletAttributesResponseSchema,
  type PayPalWalletAttributesResponse,
} from "./pay-pal-wallet-attributes-response.js";
import {
  payPalWalletStoredCredentialSchema,
  type PayPalWalletStoredCredential,
} from "./pay-pal-wallet-stored-credential.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";
import { phoneTypeSchema, type PhoneType } from "./phone-type.js";
import { taxInfoSchema, type TaxInfo } from "./tax-info.js";

export type PayPalWalletResponse = {
  emailAddress?: string;
  accountId?: string;
  accountStatus?: PayPalWalletAccountVerificationStatus;
  name?: Name;
  phoneType?: PhoneType;
  phoneNumber?: PhoneNumber;
  birthDate?: string;
  businessName?: string;
  taxInfo?: TaxInfo;
  address?: Address;
  attributes?: PayPalWalletAttributesResponse;
  storedCredential?: PayPalWalletStoredCredential;
  experienceStatus?: ExperienceStatus;
};

export const payPalWalletResponseSchema: Schema<PayPalWalletResponse> = s.object<PayPalWalletResponse>({
  emailAddress: s.optional(s.string()),
  accountId: s.optional(s.string()),
  accountStatus: s.optional(s.lazy(() => payPalWalletAccountVerificationStatusSchema)),
  name: s.optional(s.lazy(() => nameSchema)),
  phoneType: s.optional(s.lazy(() => phoneTypeSchema)),
  phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
  birthDate: s.optional(s.string()),
  businessName: s.optional(s.string()),
  taxInfo: s.optional(s.lazy(() => taxInfoSchema)),
  address: s.optional(s.lazy(() => addressSchema)),
  attributes: s.optional(s.lazy(() => payPalWalletAttributesResponseSchema)),
  storedCredential: s.optional(s.lazy(() => payPalWalletStoredCredentialSchema)),
  experienceStatus: s.optional(s.lazy(() => experienceStatusSchema)),
  _keysMap: {
    emailAddress: "email_address",
    accountId: "account_id",
    accountStatus: "account_status",
    phoneType: "phone_type",
    phoneNumber: "phone_number",
    birthDate: "birth_date",
    businessName: "business_name",
    taxInfo: "tax_info",
    storedCredential: "stored_credential",
    experienceStatus: "experience_status",
  },
});
