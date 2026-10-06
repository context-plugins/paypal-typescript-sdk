import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardVaultResponseSchema, type CardVaultResponse } from "./card-vault-response.js";

/** Additional attributes associated with the use of this card. */
export type CardAttributesResponse = {
  /** The details about a saved Card payment source. */
  vault?: CardVaultResponse;
};

export const cardAttributesResponseSchema: Schema<CardAttributesResponse> = s.object<CardAttributesResponse>({
  vault: s.optional(s.lazy(() => cardVaultResponseSchema)),
});
