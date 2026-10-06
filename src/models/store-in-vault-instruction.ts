import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Defines how and when the payment source gets vaulted. */
export const StoreInVaultInstruction = {
  /**
   * Defines that the payment_source will be vaulted only when at least one authorization or capture
   * using that payment_source is successful.
   */
  OnSuccess: "ON_SUCCESS",
} as const;
export type StoreInVaultInstruction =
  | (typeof StoreInVaultInstruction)[keyof typeof StoreInVaultInstruction]
  | (string & {});

export const storeInVaultInstructionSchema: EnumSchema<StoreInVaultInstruction> =
  s.enumOf<StoreInVaultInstruction>(StoreInVaultInstruction);
