import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type BinDetails = {
  bin?: string;
  issuingBank?: string;
  binCountryCode?: string;
  products?: string[];
};

export const binDetailsSchema: Schema<BinDetails> = s.object<BinDetails>({
  bin: s.optional(s.string()),
  issuingBank: s.optional(s.string()),
  binCountryCode: s.optional(s.string()),
  products: s.optional(s.array(s.string())),
  _keysMap: {
    issuingBank: "issuing_bank",
    binCountryCode: "bin_country_code",
  },
});
