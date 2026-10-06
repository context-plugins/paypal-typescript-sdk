import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The vault status. */
export const VaultStatus = {
  /**
   * The payment source has been saved in your customer's vault. This vault status reflects
   * `/v3/vault` status.
   */
  Vaulted: "VAULTED",
  /**
   * DEPRECATED. The payment source has been saved in your customer's vault. This status applies to
   * deprecated integration patterns and will not be returned for v3/vault integrations.
   */
  Created: "CREATED",
  /**
   * Customer has approved the action of saving the specified payment_source into their vault. Use
   * v3/vault/payment-tokens with given setup_token to save the payment source in the vault
   */
  Approved: "APPROVED",
} as const;
export type VaultStatus = (typeof VaultStatus)[keyof typeof VaultStatus] | (string & {});

export const vaultStatusSchema: EnumSchema<VaultStatus> = s.enumOf<VaultStatus>(VaultStatus);
