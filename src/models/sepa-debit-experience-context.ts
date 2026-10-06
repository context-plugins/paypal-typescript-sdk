import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Customizes the payer experience during the approval process for the SEPA Debit payment. */
export type SepaDebitExperienceContext = {
  /**
   * The [language tag](https://tools.ietf.org/html/bcp47#section-2) for the language in which to
   * localize the error-related strings, such as messages, issues, and suggested actions. The tag is
   * made up of the [ISO 639-2 language
   * code](https://www.loc.gov/standards/iso639-2/php/code_list.php), the optional [ISO-15924 script
   * tag](https://www.unicode.org/iso15924/codelists.html), and the [ISO-3166 alpha-2 country
   * code](/api/rest/reference/country-codes/) or [M49 region
   * code](https://unstats.un.org/unsd/methodology/m49/).
   */
  locale?: string;
  /** Describes the URL. */
  returnUrl: string;
  /** Describes the URL. */
  cancelUrl: string;
};

export const sepaDebitExperienceContextSchema: Schema<SepaDebitExperienceContext> =
  s.object<SepaDebitExperienceContext>({
    locale: s.optional(s.string()),
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
    },
  });
