import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { taxIdTypeSchema, type TaxIdType } from "./tax-id-type.js";

/**
 * The tax ID of the customer. The customer is also known as the payer. Both `tax_id` and
 * `tax_id_type` are required.
 */
export type TaxInfo = {
  /** The customer's tax ID value. */
  taxId: string;
  /** The customer's tax ID type. */
  taxIdType: TaxIdType;
};

export const taxInfoSchema: Schema<TaxInfo> = s.object<TaxInfo>({
  taxId: s.string(),
  taxIdType: taxIdTypeSchema,
  _keysMap: {
    taxId: "tax_id",
    taxIdType: "tax_id_type",
  },
});
