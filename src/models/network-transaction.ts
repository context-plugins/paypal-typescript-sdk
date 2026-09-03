import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";

export type NetworkTransaction = {
  id?: string;
  date?: string;
  network?: CardBrand;
  acquirerReferenceNumber?: string;
};

export const networkTransactionSchema: Schema<NetworkTransaction> = s.object<NetworkTransaction>({
  id: s.optional(s.string()),
  date: s.optional(s.string()),
  network: s.optional(s.lazy(() => cardBrandSchema)),
  acquirerReferenceNumber: s.optional(s.string()),
  _keysMap: {
    acquirerReferenceNumber: "acquirer_reference_number",
  },
});
