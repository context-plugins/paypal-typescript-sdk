import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type SubscriptionPayerName = {
  prefix?: string;
  givenName?: string;
  surname?: string;
  middleName?: string;
  suffix?: string;
  fullName?: string;
};

export const subscriptionPayerNameSchema: Schema<SubscriptionPayerName> = s.object<SubscriptionPayerName>({
  prefix: s.optional(s.string()),
  givenName: s.optional(s.string()),
  surname: s.optional(s.string()),
  middleName: s.optional(s.string()),
  suffix: s.optional(s.string()),
  fullName: s.optional(s.string()),
  _keysMap: {
    givenName: "given_name",
    middleName: "middle_name",
    fullName: "full_name",
  },
});
