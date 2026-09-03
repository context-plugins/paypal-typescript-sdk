import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardCustomerInformationSchema, type CardCustomerInformation } from "./card-customer-information.js";
import { cardVerificationSchema, type CardVerification } from "./card-verification.js";
import { vaultInstructionBaseSchema, type VaultInstructionBase } from "./vault-instruction-base.js";

export type CardAttributes = {
  customer?: CardCustomerInformation;
  vault?: VaultInstructionBase;
  verification?: CardVerification;
};

export const cardAttributesSchema: Schema<CardAttributes> = s.object<CardAttributes>({
  customer: s.optional(s.lazy(() => cardCustomerInformationSchema)),
  vault: s.optional(s.lazy(() => vaultInstructionBaseSchema)),
  verification: s.optional(s.lazy(() => cardVerificationSchema)),
});
