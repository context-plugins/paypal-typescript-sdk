import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The auction information. */
export type AuctionInformation = {
  /** The name of the auction site. */
  auctionSite?: string;
  /** The auction site URL. */
  auctionItemSite?: string;
  /**
   * The ID of the buyer who makes the purchase in the auction. This ID might be different from the
   * payer ID provided for the payment.
   */
  auctionBuyerId?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  auctionClosingDate?: string;
};

export const auctionInformationSchema: Schema<AuctionInformation> = s.object<AuctionInformation>({
  auctionSite: s.optional(s.string()),
  auctionItemSite: s.optional(s.string()),
  auctionBuyerId: s.optional(s.string()),
  auctionClosingDate: s.optional(s.string()),
  _keysMap: {
    auctionSite: "auction_site",
    auctionItemSite: "auction_item_site",
    auctionBuyerId: "auction_buyer_id",
    auctionClosingDate: "auction_closing_date",
  },
});
