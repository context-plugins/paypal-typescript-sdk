import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardCustomerSchema, type CardCustomer } from "./card-customer.js";
import { cardVerificationSchema, type CardVerification } from "./card-verification.js";
import { vaultInstructionBaseSchema, type VaultInstructionBase } from "./vault-instruction-base.js";

export type SubscriptionsCardAttributes = {
  customer?: CardCustomer;
  vault?: VaultInstructionBase;
  verification?: CardVerification;
};

export const subscriptionsCardAttributesSchema: Schema<SubscriptionsCardAttributes> =
  s.object<SubscriptionsCardAttributes>({
    customer: s.optional(s.lazy(() => cardCustomerSchema)),
    vault: s.optional(s.lazy(() => vaultInstructionBaseSchema)),
    verification: s.optional(s.lazy(() => cardVerificationSchema)),
  });
