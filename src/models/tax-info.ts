import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { taxIdTypeSchema, type TaxIdType } from "./tax-id-type.js";

export type TaxInfo = {
  taxId: string;
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
