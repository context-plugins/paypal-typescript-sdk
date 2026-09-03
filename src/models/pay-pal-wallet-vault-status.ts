import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalWalletVaultStatus = {
  Vaulted: "VAULTED",
  Created: "CREATED",
  Approved: "APPROVED",
} as const;
export type PayPalWalletVaultStatus =
  | (typeof PayPalWalletVaultStatus)[keyof typeof PayPalWalletVaultStatus]
  | (string & {});

export const payPalWalletVaultStatusSchema: EnumSchema<PayPalWalletVaultStatus> =
  s.enumOf<PayPalWalletVaultStatus>(PayPalWalletVaultStatus);
