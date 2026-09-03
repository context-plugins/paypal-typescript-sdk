import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { nameSchema, type Name } from "./name.js";
import { payPalWalletAttributesSchema, type PayPalWalletAttributes } from "./pay-pal-wallet-attributes.js";
import {
  payPalWalletExperienceContextSchema,
  type PayPalWalletExperienceContext,
} from "./pay-pal-wallet-experience-context.js";
import {
  payPalWalletStoredCredentialSchema,
  type PayPalWalletStoredCredential,
} from "./pay-pal-wallet-stored-credential.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";
import { taxInfoSchema, type TaxInfo } from "./tax-info.js";

export type PayPalWallet = {
  vaultId?: string;
  emailAddress?: string;
  name?: Name;
  phone?: PhoneWithType;
  birthDate?: string;
  taxInfo?: TaxInfo;
  address?: Address;
  attributes?: PayPalWalletAttributes;
  experienceContext?: PayPalWalletExperienceContext;
  billingAgreementId?: string;
  storedCredential?: PayPalWalletStoredCredential;
};

export const payPalWalletSchema: Schema<PayPalWallet> = s.object<PayPalWallet>({
  vaultId: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  birthDate: s.optional(s.string()),
  taxInfo: s.optional(s.lazy(() => taxInfoSchema)),
  address: s.optional(s.lazy(() => addressSchema)),
  attributes: s.optional(s.lazy(() => payPalWalletAttributesSchema)),
  experienceContext: s.optional(s.lazy(() => payPalWalletExperienceContextSchema)),
  billingAgreementId: s.optional(s.string()),
  storedCredential: s.optional(s.lazy(() => payPalWalletStoredCredentialSchema)),
  _keysMap: {
    vaultId: "vault_id",
    emailAddress: "email_address",
    birthDate: "birth_date",
    taxInfo: "tax_info",
    experienceContext: "experience_context",
    billingAgreementId: "billing_agreement_id",
    storedCredential: "stored_credential",
  },
});
