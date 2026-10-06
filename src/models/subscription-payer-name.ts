import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The name of the party. */
export type SubscriptionPayerName = {
  /** The prefix, or title, to the party's name. */
  prefix?: string;
  /** When the party is a person, the party's given, or first, name. */
  givenName?: string;
  /**
   * When the party is a person, the party's surname or family name. Also known as the last name.
   * Required when the party is a person. Use also to store multiple surnames including the
   * matronymic, or mother's, surname.
   */
  surname?: string;
  /**
   * When the party is a person, the party's middle name. Use also to store multiple middle names
   * including the patronymic, or father's, middle name.
   */
  middleName?: string;
  /** The suffix for the party's name. */
  suffix?: string;
  /** When the party is a person, the party's full name. */
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
