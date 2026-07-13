export interface StateGuide {
  slug: string;
  name: string;
  description: string;
}

export const stateGuides: StateGuide[] = [
  {
    slug: "california-government-contracting",
    name: "California",
    description: "Guide to bidding with Cal eProcure, Caltrans, and local CA municipalities."
  },
  {
    slug: "texas-government-contracting",
    name: "Texas",
    description: "Navigate the Texas SmartBuy system and win state and local bids."
  }
];
