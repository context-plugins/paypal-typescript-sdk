import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerInformationSchema, type CustomerInformation } from "./customer-information.js";
import { vaultInstructionSchema, type VaultInstruction } from "./vault-instruction.js";

export type ApplePayAttributes = {
  customer?: CustomerInformation;
  vault?: VaultInstruction;
};

export const applePayAttributesSchema: Schema<ApplePayAttributes> = s.object<ApplePayAttributes>({
  customer: s.optional(s.lazy(() => customerInformationSchema)),
  vault: s.optional(s.lazy(() => vaultInstructionSchema)),
});
