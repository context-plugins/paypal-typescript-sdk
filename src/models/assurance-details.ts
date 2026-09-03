import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type AssuranceDetails = {
  accountVerified?: boolean;
  cardHolderAuthenticated?: boolean;
};

export const assuranceDetailsSchema: Schema<AssuranceDetails> = s.object<AssuranceDetails>({
  accountVerified: s.optional(s.boolean()),
  cardHolderAuthenticated: s.optional(s.boolean()),
  _keysMap: {
    accountVerified: "account_verified",
    cardHolderAuthenticated: "card_holder_authenticated",
  },
});
