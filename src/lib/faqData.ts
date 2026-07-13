export interface FAQItem {
  question: string;
  answer: string;
}

export const generalFaqs: FAQItem[] = [
  {
    question: "Do you guarantee a win?",
    answer: "No firm can guarantee a win, as the final decision rests with the government agency. However, our Pay-When-You-Win model means we share the risk with you. If you don't win, we don't collect our success fee.",
  },
  {
    question: "What is your success rate?",
    answer: "Our win rate varies by industry and agency, but we only take on clients and bids where we believe there is a strong, mathematically sound chance of winning.",
  },
  {
    question: "Do you write state and local proposals, or just federal?",
    answer: "We cover all 50 states and local municipalities (counties, cities, school districts), as well as federal bids. Local bids often have fewer competitors and can be highly lucrative.",
  },
  {
    question: "How long does it take to write a proposal?",
    answer: "Ideally, we need 2-3 weeks before the deadline to conduct discovery, write the narrative, build the pricing strategy, and ensure absolute compliance. We can do rush jobs, but standard timelines yield the highest win rates.",
  },
];
