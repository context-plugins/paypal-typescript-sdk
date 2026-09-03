import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VaultInstructionAction = {
  OnCreatePaymentTokens: "ON_CREATE_PAYMENT_TOKENS",
  OnPayerApproval: "ON_PAYER_APPROVAL",
} as const;
export type VaultInstructionAction =
  | (typeof VaultInstructionAction)[keyof typeof VaultInstructionAction]
  | (string & {});

export const vaultInstructionActionSchema: EnumSchema<VaultInstructionAction> =
  s.enumOf<VaultInstructionAction>(VaultInstructionAction);
