import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The name of the party. */
export type Name = {
  /** When the party is a person, the party's given, or first, name. */
  givenName?: string;
  /**
   * When the party is a person, the party's surname or family name. Also known as the last name.
   * Required when the party is a person. Use also to store multiple surnames including the
   * matronymic, or mother's, surname.
   */
  surname?: string;
};

export const nameSchema: Schema<Name> = s.object<Name>({
  givenName: s.optional(s.string()),
  surname: s.optional(s.string()),
  _keysMap: {
    givenName: "given_name",
  },
});
