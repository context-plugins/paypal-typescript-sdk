import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardCustomerSchema, type CardCustomer } from "./card-customer.js";
import { cardVerificationSchema, type CardVerification } from "./card-verification.js";
import { vaultInstructionBaseSchema, type VaultInstructionBase } from "./vault-instruction-base.js";

/** Additional attributes associated with the use of this card. */
export type SubscriptionsCardAttributes = {
  /** The details about a customer in PayPal's system of record. */
  customer?: CardCustomer;
  /**
   * Basic vault instruction specification that can be extended by specific payment sources that
   * supports vaulting.
   */
  vault?: VaultInstructionBase;
  /**
   * The API caller can opt in to verify the card through PayPal offered verification services (e.g.
   * Smart Dollar Auth, 3DS).
   */
  verification?: CardVerification;
};

export const subscriptionsCardAttributesSchema: Schema<SubscriptionsCardAttributes> =
  s.object<SubscriptionsCardAttributes>({
    customer: s.optional(s.lazy(() => cardCustomerSchema)),
    vault: s.optional(s.lazy(() => vaultInstructionBaseSchema)),
    verification: s.optional(s.lazy(() => cardVerificationSchema)),
  });
