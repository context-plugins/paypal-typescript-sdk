import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  payPalWalletCustomerRequestSchema,
  type PayPalWalletCustomerRequest,
} from "./pay-pal-wallet-customer-request.js";
import {
  payPalWalletVaultInstructionSchema,
  type PayPalWalletVaultInstruction,
} from "./pay-pal-wallet-vault-instruction.js";

export type PayPalWalletAttributes = {
  customer?: PayPalWalletCustomerRequest;
  vault?: PayPalWalletVaultInstruction;
};

export const payPalWalletAttributesSchema: Schema<PayPalWalletAttributes> = s.object<PayPalWalletAttributes>({
  customer: s.optional(s.lazy(() => payPalWalletCustomerRequestSchema)),
  vault: s.optional(s.lazy(() => payPalWalletVaultInstructionSchema)),
});
