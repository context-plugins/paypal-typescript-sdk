import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerInformationSchema, type CustomerInformation } from "./customer-information.js";
import { vaultInstructionSchema, type VaultInstruction } from "./vault-instruction.js";

/** Additional attributes associated with apple pay. */
export type ApplePayAttributes = {
  /**
   * This object represents a merchant’s customer, allowing them to store contact details, and track
   * all payments associated with the same customer.
   */
  customer?: CustomerInformation;
  /**
   * Base vaulting specification. The object can be extended for specific use cases within each
   * payment_source that supports vaulting.
   */
  vault?: VaultInstruction;
};

export const applePayAttributesSchema: Schema<ApplePayAttributes> = s.object<ApplePayAttributes>({
  customer: s.optional(s.lazy(() => customerInformationSchema)),
  vault: s.optional(s.lazy(() => vaultInstructionSchema)),
});
