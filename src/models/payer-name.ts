import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type PayerName = {
  prefix?: string;
  givenName?: string;
  surname?: string;
  middleName?: string;
  suffix?: string;
  alternateFullName?: string;
  fullName?: string;
};

export const payerNameSchema: Schema<PayerName> = s.object<PayerName>({
  prefix: s.optional(s.string()),
  givenName: s.optional(s.string()),
  surname: s.optional(s.string()),
  middleName: s.optional(s.string()),
  suffix: s.optional(s.string()),
  alternateFullName: s.optional(s.string()),
  fullName: s.optional(s.string()),
  _keysMap: {
    givenName: "given_name",
    middleName: "middle_name",
    alternateFullName: "alternate_full_name",
    fullName: "full_name",
  },
});
