import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The tokenization method that generated the ID. */
export const VaultTokenRequestType = {
  /** The setup token, which is a temporary reference to payment source. */
  SetupToken: "SETUP_TOKEN",
} as const;
export type VaultTokenRequestType =
  | (typeof VaultTokenRequestType)[keyof typeof VaultTokenRequestType]
  | (string & {});

export const vaultTokenRequestTypeSchema: EnumSchema<VaultTokenRequestType> =
  s.enumOf<VaultTokenRequestType>(VaultTokenRequestType);
