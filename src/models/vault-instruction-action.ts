import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Vault Instruction on action to be performed after a successful payer approval. */
export const VaultInstructionAction = {
  /** Vault the payment method after API caller performs a successful POST on Payment Tokens. */
  OnCreatePaymentTokens: "ON_CREATE_PAYMENT_TOKENS",
  /** Vault the payment method on successful payer authentication and approval. */
  OnPayerApproval: "ON_PAYER_APPROVAL",
} as const;
export type VaultInstructionAction =
  | (typeof VaultInstructionAction)[keyof typeof VaultInstructionAction]
  | (string & {});

export const vaultInstructionActionSchema: EnumSchema<VaultInstructionAction> =
  s.enumOf<VaultInstructionAction>(VaultInstructionAction);
