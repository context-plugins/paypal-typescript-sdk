import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type AuctionInformation = {
  auctionSite?: string;
  auctionItemSite?: string;
  auctionBuyerId?: string;
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
