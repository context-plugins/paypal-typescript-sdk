import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";

export type NetworkTransactionReferenceEntity = {
  id: string;
  date?: string;
  network?: CardBrand;
  time?: string;
};

export const networkTransactionReferenceEntitySchema: Schema<NetworkTransactionReferenceEntity> =
  s.object<NetworkTransactionReferenceEntity>({
    id: s.string(),
    date: s.optional(s.string()),
    network: s.optional(s.lazy(() => cardBrandSchema)),
    time: s.optional(s.string()),
  });
