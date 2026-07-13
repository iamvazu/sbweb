# Stronger Built Learning Center — Content & SEO / AEO / GEO Blueprint

*A complete plan to build a content hub on strongerbuilt.us that out-ranks The Bid Lab's Learning Center. Includes the strategy, the architecture, a reusable template, all 30 state bid guides with real portal data, a master article calendar, and schema templates.*

> **Verify-before-publish note:** State procurement systems migrate (states regularly move to new ERP/eProcurement platforms). The portal names below are accurate as of writing, but confirm each portal's current name and URL when you publish or refresh a guide — link-checking is part of the workflow, and it also signals freshness to search and generative engines.

---

## 1. The goal (and how this beats Bid Lab)

Bid Lab's Learning Center is 164 articles strong, and its **state bid guides are the traffic engine** — each one captures a high-intent long-tail query ("how to bid on Texas RFPs") from a business owner who is one step from needing a proposal written. That reader is your exact customer.

We win by doing three things Bid Lab does *not* do well:
1. **Answer-first formatting** — every guide opens with a 2–3 sentence direct answer that featured snippets, voice assistants, and AI Overviews can lift verbatim. (Bid Lab buries the answer under a jokey local-trivia intro.)
2. **Structured, citable facts** — exact portal names, registration steps, agencies, and thresholds, marked up with schema so generative engines cite *us*.
3. **The pay-when-you-win CTA** in every article — Bid Lab sends readers to a $6,000 quote; we send them to a $450 start. Lower friction, higher conversion.

---

## 2. SEO / AEO / GEO — what each is, and how every article wins it

These three overlap but optimize for different surfaces. Build for all three at once.

### SEO (Search Engine Optimization) — ranking in the blue links
- **Target one primary long-tail keyword per article** (e.g., "Texas RFP guide") plus 3–5 secondary terms.
- Keyword in the **H1, URL slug, first 100 words, one H2, and meta title**.
- **Title ≤ 60 characters**, **meta description ≤ 155 characters**, both with the keyword.
- **1,200–1,800 words** for state guides; real depth, no padding.
- **Internal links**: every state guide links to 3+ other guides + the Pricing and "How It Works" pages.
- **Fast, mobile-first, clean HTML headings** (one H1, logical H2/H3).

### AEO (Answer Engine Optimization) — winning featured snippets, "People Also Ask," and voice
- **Quick Answer box** at the very top: a 40–55 word direct answer to the title question. This is what gets read aloud and pulled into snippets.
- **Question-phrased H2s** ("Where do I find government RFPs in Texas?").
- **A FAQ section** at the bottom with 4–5 Q&As, marked up with **FAQPage schema** (see §7). This is the single highest-ROI AEO tactic.
- **Concise, self-contained answers** — each answer makes sense lifted out of context.

### GEO (Generative Engine Optimization) — getting cited by ChatGPT, Gemini, Perplexity, and Google AI Overviews
- **State facts plainly and authoritatively** with named entities (exact portal names, agency names, statute references). Generative engines prefer specific, verifiable claims over vague prose.
- **Include numbers and dates** (registration fees, thresholds, "as of 2026") — quantified, fresh content gets cited more.
- **E-E-A-T signals**: a visible author byline ("Reviewed by the Stronger Built proposal team — a veteran-owned firm"), a last-updated date, and cited primary sources (link to the official state portal).
- **Structured data** (Article + FAQPage + Breadcrumb schema) so models can parse entities cleanly.
- **Definition-style sentences** ("Cal eProcure is California's official eProcurement portal…") — these get quoted directly.

### The on-page formula EVERY article follows
1. H1 with primary keyword
2. **Quick Answer box** (40–55 words) — AEO + GEO
3. 1-sentence "why this matters" hook (local flavor, kept short)
4. Body with question-phrased H2s — SEO + AEO
5. A **facts table** (portal, registration, key agencies, fees) — GEO
6. CTA block → "Start My Bid — $450"
7. **FAQ section** (4–5 Q&As) with FAQPage schema — AEO
8. Author byline + last-updated date + link to official portal — GEO/E-E-A-T
9. 3+ internal links to related guides

---

## 3. Information architecture

**Hub:** `strongerbuilt.us/learning-center` — the index page (search + category filters + recent + state-guide grid), mirroring Bid Lab's layout.

**Categories** (use these as both filters and `/category/` hub pages for topical authority):
- Getting Started (basic terms & concepts)
- The Bidding Process
- Proposal Writing
- Winning Strategies
- Government Contracting
- Industry Guides
- **State Bid Guides** ← the SEO workhorse

**URL structure:**
- Index: `/learning-center`
- Category hub: `/learning-center/category/state-bid-guides`
- State guide: `/learning-center/[state]-rfp-guide` (e.g., `/learning-center/texas-rfp-guide`)
- Other article: `/learning-center/[descriptive-slug]`

**Topic clusters:** each category hub is a pillar; articles link up to the pillar and across to siblings. The State Bid Guides cluster is the biggest — 30 spokes linking to one "How to Win Government Bids in Any State" pillar.

---

## 4. The State Bid Guide template (reusable for all 30 — and the other 20 later)

Replace `{{State}}`, `{{Portal}}`, etc. with the per-state data in §5.

```
H1: {{State}} RFPs: How to Find & Win {{State}} Government Bids

[QUICK ANSWER BOX]
To bid on government contracts in {{State}}, register as a vendor on {{Portal}},
search active solicitations there, and submit your proposal before the listed
deadline. Most opportunities are posted by {{KeyAgencies}}. Registration is
{{free/paid}}.

[HOOK — one sentence, light local flavor, then pivot to business]

H2: Where do I find government RFPs in {{State}}?
   → {{Portal}} is the official source. Describe what's posted and how to search.

H2: How do I register as a vendor in {{State}}?
   → Step-by-step on {{RegistrationSystem}}. Note NIGP/UNSPSC commodity codes.

H2: Which {{State}} agencies award the most contracts?
   → List {{KeyAgencies}} and common industries.

H2: What does it take to win a {{State}} bid?
   → Compliance, deadlines, evaluation criteria. Bridge to our service.

[FACTS TABLE: Official portal | Vendor registration | Key agencies | Registration fee | Bid threshold notes]

[CTA BLOCK: "Don't have time to write the proposal? We do — and you mostly pay
when you win. Start My Bid — $450."]

H2: {{State}} RFP FAQs
   → 4–5 Q&As (from §5), marked up with FAQPage schema.

[BYLINE: Reviewed by the Stronger Built proposal team · Veteran-owned · Updated {{Month Year}} · Source: {{official portal link}}]

[INTERNAL LINKS: 3 neighboring state guides + How It Works + Pricing]
```

---

## 5. The 30 State Bid Guides

*States chosen for the largest economies and procurement volume (highest search demand + business value). Each entry gives you everything needed to publish. Keyword pattern for all: primary "{state} RFP guide / {state} government bids"; secondary "{state} RFPs", "how to bid on {state} contracts", "{state} vendor registration", "{state} procurement portal".*

### 1. California
- **SEO title:** California RFPs: How to Find & Win California Government Bids
- **Slug:** `/learning-center/california-rfp-guide`
- **Meta:** Find, register for, and win California government RFPs. Portals, agencies, deadlines, and expert tips — free guide from Stronger Built.
- **Official portal:** Cal eProcure · **Registration:** Cal eProcure supplier registration (+ SB/DVBE certification) · **Key agencies:** DGS, Caltrans, DHCS, CDCR · **Fee:** Free
- **Quick answer:** Register and search on Cal eProcure, California's official eProcurement site. Most state contracts run through the Dept. of General Services; small-business and DVBE certification unlock set-aside opportunities.
- **FAQs:** (1) Where are California RFPs posted? → Cal eProcure. (2) How do I register? → Free supplier registration on Cal eProcure. (3) What is SB/DVBE certification? → State programs giving certified small and disabled-veteran businesses preference. (4) Is registration free? → Yes.

### 2. Texas
- **SEO title:** Texas RFPs: How to Find & Win Texas Government Bids
- **Slug:** `/learning-center/texas-rfp-guide`
- **Meta:** A free guide to winning Texas government RFPs — the ESBD, CMBL registration, key agencies, and how to submit a winning bid.
- **Official portal:** Electronic State Business Daily (ESBD) + TxSmartBuy · **Registration:** Centralized Master Bidders List (CMBL) · **Key agencies:** TxDOT, HHSC, TFC · **Fee:** CMBL has an annual fee
- **Quick answer:** Search Texas solicitations on the Electronic State Business Daily (ESBD) and register on the Centralized Master Bidders List (CMBL) to receive bid notices. TxSmartBuy hosts purchasing for many state agencies.
- **FAQs:** (1) Where are Texas RFPs posted? → ESBD. (2) What is the CMBL? → The state's master bidders list; registering gets you notified. (3) Is there a fee? → CMBL charges an annual registration fee. (4) Who buys the most? → TxDOT and HHSC.

### 3. New York
- **SEO title:** New York RFPs: How to Find & Win NY Government Bids
- **Slug:** `/learning-center/new-york-rfp-guide`
- **Meta:** Win New York State RFPs — the NYS Contract Reporter, OGS registration, key agencies, and bidding tips. Free guide from Stronger Built.
- **Official portal:** NYS Contract Reporter · **Registration:** NY State Vendor / OGS · **Key agencies:** OGS, DOT, MTA, DASNY · **Fee:** Free to search
- **Quick answer:** New York posts solicitations over $50,000 in the NYS Contract Reporter. The Office of General Services (OGS) manages statewide contracts; large authorities like the MTA and DASNY run their own.
- **FAQs:** (1) Where are NY RFPs posted? → NYS Contract Reporter. (2) What threshold requires posting? → Generally contracts over $50,000. (3) Who is OGS? → The agency managing centralized state contracts. (4) Free to search? → Yes.

### 4. Florida
- **SEO title:** Florida RFPs: How to Find & Win Florida Government Bids
- **Slug:** `/learning-center/florida-rfp-guide`
- **Meta:** A free guide to Florida government RFPs — MyFloridaMarketPlace, the Vendor Bid System, agencies, and winning tips.
- **Official portal:** Vendor Bid System (VBS) + MyFloridaMarketPlace (MFMP) · **Registration:** MyFloridaMarketPlace Vendor Registration · **Key agencies:** FDOT, DMS, AHCA · **Fee:** Free; a transaction fee applies on awards
- **Quick answer:** Search Florida solicitations on the Vendor Bid System and register in MyFloridaMarketPlace to bid. The Dept. of Management Services oversees state purchasing; FDOT is a major buyer.
- **FAQs:** (1) Where are Florida bids posted? → Vendor Bid System. (2) How do I register? → MyFloridaMarketPlace. (3) Any fees? → A transaction fee applies to awarded contracts. (4) Who buys most? → FDOT and AHCA.

### 5. Illinois
- **SEO title:** Illinois RFPs: How to Find & Win Illinois Government Bids
- **Slug:** `/learning-center/illinois-rfp-guide`
- **Meta:** Win Illinois government RFPs — the Illinois Procurement Bulletin, BidBuy registration, agencies, and expert tips.
- **Official portal:** Illinois Procurement Bulletin + BidBuy · **Registration:** BidBuy vendor registration · **Key agencies:** IDOT, CMS, DHS · **Fee:** Free
- **Quick answer:** Illinois posts solicitations in the Illinois Procurement Bulletin and runs purchasing through BidBuy. Register in BidBuy to bid; Central Management Services oversees statewide procurement.
- **FAQs:** (1) Where are Illinois RFPs posted? → Procurement Bulletin / BidBuy. (2) Registration? → Free in BidBuy. (3) Who oversees procurement? → CMS. (4) Major buyers? → IDOT.

### 6. Pennsylvania
- **SEO title:** Pennsylvania RFPs: How to Win PA Government Bids
- **Slug:** `/learning-center/pennsylvania-rfp-guide`
- **Meta:** A free guide to Pennsylvania government RFPs — PA eMarketplace, supplier registration, key agencies, and winning strategy.
- **Official portal:** PA eMarketplace (eMarketplace) · **Registration:** PA Supplier Portal (SAP/JAGGAER) · **Key agencies:** PennDOT, DGS, DHS · **Fee:** Free
- **Quick answer:** Pennsylvania posts bids on PA eMarketplace; register in the PA Supplier Portal to participate. The Dept. of General Services manages statewide contracts and PennDOT is a leading buyer.
- **FAQs:** (1) Where are PA bids? → PA eMarketplace. (2) How to register? → PA Supplier Portal. (3) Fee? → Free. (4) Top buyer? → PennDOT.

### 7. Ohio
- **SEO title:** Ohio RFPs: How to Find & Win Ohio Government Bids
- **Slug:** `/learning-center/ohio-rfp-guide`
- **Meta:** Win Ohio government RFPs — Ohio|Buys registration, the procurement portal, agencies, and expert bidding tips. Free guide.
- **Official portal:** Ohio|Buys · **Registration:** Ohio Supplier (Ohio|Buys) · **Key agencies:** ODOT, DAS, ODM · **Fee:** Free
- **Quick answer:** Ohio centralizes state purchasing in Ohio|Buys, where vendors register, find solicitations, and submit bids. The Dept. of Administrative Services oversees procurement; ODOT is a major buyer.
- **FAQs:** (1) Where are Ohio bids? → Ohio|Buys. (2) Registration? → Free in Ohio|Buys. (3) Who oversees it? → DAS. (4) Big buyer? → ODOT.

### 8. Georgia
- **SEO title:** Georgia RFPs: How to Find & Win Georgia Government Bids
- **Slug:** `/learning-center/georgia-rfp-guide`
- **Meta:** A free guide to Georgia government RFPs — the Georgia Procurement Registry, Team Georgia Marketplace, agencies, and tips.
- **Official portal:** Georgia Procurement Registry (GPR) + Team Georgia Marketplace · **Registration:** Team Georgia Marketplace supplier registration · **Key agencies:** GDOT, DOAS, DCH · **Fee:** Free
- **Quick answer:** Georgia lists open bids in the Georgia Procurement Registry and processes them through Team Georgia Marketplace. The Dept. of Administrative Services manages statewide purchasing.
- **FAQs:** (1) Where are GA bids? → Georgia Procurement Registry. (2) Registration? → Team Georgia Marketplace. (3) Fee? → Free. (4) Top buyer? → GDOT.

### 9. North Carolina
- **SEO title:** North Carolina RFPs: How to Win NC Government Bids
- **Slug:** `/learning-center/north-carolina-rfp-guide`
- **Meta:** Win North Carolina government RFPs — NC eProcurement, the Electronic Vendor Portal, agencies, and expert tips.
- **Official portal:** NC eProcurement + Electronic Vendor Portal (eVP) · **Registration:** eVP vendor registration · **Key agencies:** NCDOT, DOA, DHHS · **Fee:** Free; a small e-procurement transaction fee may apply
- **Quick answer:** North Carolina runs purchasing through NC eProcurement; register in the Electronic Vendor Portal (eVP) to receive bid notices and submit. NCDOT and DHHS are major buyers.
- **FAQs:** (1) Where are NC bids? → NC eProcurement / eVP. (2) Registration? → eVP. (3) Fees? → A small transaction fee may apply. (4) Top buyer? → NCDOT.

### 10. New Jersey
- **SEO title:** New Jersey RFPs: How to Win NJ Government Bids
- **Slug:** `/learning-center/new-jersey-rfp-guide`
- **Meta:** A free guide to New Jersey government RFPs — NJSTART registration, the procurement portal, agencies, and winning tips.
- **Official portal:** NJSTART · **Registration:** NJSTART vendor registration · **Key agencies:** NJDOT, Treasury (Purchase & Property), NJ Transit · **Fee:** Free
- **Quick answer:** New Jersey centralizes procurement in NJSTART, where vendors register, search solicitations, and submit quotes. The Division of Purchase and Property runs statewide contracts.
- **FAQs:** (1) Where are NJ bids? → NJSTART. (2) Registration? → Free in NJSTART. (3) Who oversees it? → Purchase & Property. (4) Big buyer? → NJDOT / NJ Transit.

### 11. Washington
- **SEO title:** Washington RFPs: How to Win Washington State Bids
- **Slug:** `/learning-center/washington-rfp-guide`
- **Meta:** Win Washington State RFPs — WEBS registration, the procurement portal, agencies, and expert bidding tips. Free guide.
- **Official portal:** Washington's Electronic Business Solution (WEBS) · **Registration:** WEBS vendor registration · **Key agencies:** WSDOT, DES, HCA · **Fee:** Free
- **Quick answer:** Washington posts bids through WEBS (Washington's Electronic Business Solution); register there to receive notices matched to your commodity codes. The Dept. of Enterprise Services manages statewide contracts.
- **FAQs:** (1) Where are WA bids? → WEBS. (2) Registration? → Free in WEBS. (3) Who oversees it? → DES. (4) Top buyer? → WSDOT.

### 12. Virginia
- **SEO title:** Virginia RFPs: How to Find & Win Virginia Government Bids
- **Slug:** `/learning-center/virginia-rfp-guide`
- **Meta:** A free guide to Virginia government RFPs — eVA registration, the procurement portal, agencies, and winning strategy.
- **Official portal:** eVA · **Registration:** eVA vendor registration · **Key agencies:** VDOT, DGS, DBHDS · **Fee:** eVA charges vendor transaction fees
- **Quick answer:** Virginia runs nearly all state purchasing through eVA, the statewide eProcurement portal. Register in eVA to find and bid on solicitations; note eVA's transaction-fee structure on awards.
- **FAQs:** (1) Where are VA bids? → eVA. (2) Registration? → eVA. (3) Fees? → eVA charges transaction fees. (4) Top buyer? → VDOT.

### 13. Massachusetts
- **SEO title:** Massachusetts RFPs: How to Win MA Government Bids
- **Slug:** `/learning-center/massachusetts-rfp-guide`
- **Meta:** Win Massachusetts government RFPs — COMMBUYS registration, the procurement portal, agencies, and expert tips.
- **Official portal:** COMMBUYS · **Registration:** COMMBUYS vendor registration · **Key agencies:** MassDOT, OSD, EOHHS · **Fee:** Free
- **Quick answer:** Massachusetts centralizes procurement in COMMBUYS, the state's official market center. Register to search solicitations and submit quotes; the Operational Services Division manages statewide contracts.
- **FAQs:** (1) Where are MA bids? → COMMBUYS. (2) Registration? → Free. (3) Who oversees it? → OSD. (4) Top buyer? → MassDOT.

### 14. Michigan
- **SEO title:** Michigan RFPs: How to Find & Win Michigan Government Bids
- **Slug:** `/learning-center/michigan-rfp-guide`
- **Meta:** A free guide to Michigan government RFPs — SIGMA VSS registration, the procurement portal, agencies, and tips.
- **Official portal:** SIGMA Vendor Self Service (VSS) · **Registration:** SIGMA VSS · **Key agencies:** MDOT, DTMB, MDHHS · **Fee:** Free
- **Quick answer:** Michigan posts solicitations in SIGMA Vendor Self Service (VSS); register there to bid and get matched notices. The Dept. of Technology, Management & Budget oversees procurement.
- **FAQs:** (1) Where are MI bids? → SIGMA VSS. (2) Registration? → Free in SIGMA VSS. (3) Who oversees it? → DTMB. (4) Top buyer? → MDOT.

### 15. Arizona
- **SEO title:** Arizona RFPs: How to Find & Win Arizona Government Bids
- **Slug:** `/learning-center/arizona-rfp-guide`
- **Meta:** Win Arizona government RFPs — the Arizona Procurement Portal (APP), registration, agencies, and expert tips.
- **Official portal:** Arizona Procurement Portal (APP) · **Registration:** APP supplier registration · **Key agencies:** ADOT, SPO, AHCCCS · **Fee:** Free
- **Quick answer:** Arizona runs statewide purchasing through the Arizona Procurement Portal (APP); register as a supplier to find and bid on solicitations. The State Procurement Office sets policy.
- **FAQs:** (1) Where are AZ bids? → Arizona Procurement Portal. (2) Registration? → Free in APP. (3) Who oversees it? → State Procurement Office. (4) Top buyer? → ADOT.

### 16. Tennessee
- **SEO title:** Tennessee RFPs: How to Win Tennessee Government Bids
- **Slug:** `/learning-center/tennessee-rfp-guide`
- **Meta:** A free guide to Tennessee government RFPs — the Edison Supplier Portal, registration, agencies, and winning tips.
- **Official portal:** Edison Supplier Portal · **Registration:** Edison supplier registration · **Key agencies:** TDOT, Central Procurement Office, TennCare · **Fee:** Free
- **Quick answer:** Tennessee centralizes procurement in the Edison Supplier Portal; register to find bids and submit responses. The Central Procurement Office manages statewide contracts.
- **FAQs:** (1) Where are TN bids? → Edison Supplier Portal. (2) Registration? → Free. (3) Who oversees it? → Central Procurement Office. (4) Top buyer? → TDOT.

### 17. Indiana
- **SEO title:** Indiana RFPs: How to Find & Win Indiana Government Bids
- **Slug:** `/learning-center/indiana-rfp-guide`
- **Meta:** Win Indiana government RFPs — the IDOA supplier portal, registration, agencies, and expert bidding tips. Free guide.
- **Official portal:** Indiana Dept. of Administration (IDOA) Supplier Portal · **Registration:** IDOA bidder registration · **Key agencies:** INDOT, IDOA, FSSA · **Fee:** Free
- **Quick answer:** Indiana's Dept. of Administration posts solicitations in its supplier portal; register as a bidder to receive notices and respond. INDOT is a leading buyer.
- **FAQs:** (1) Where are IN bids? → IDOA supplier portal. (2) Registration? → Free. (3) Who oversees it? → IDOA. (4) Top buyer? → INDOT.

### 18. Maryland
- **SEO title:** Maryland RFPs: How to Win Maryland Government Bids
- **Slug:** `/learning-center/maryland-rfp-guide`
- **Meta:** A free guide to Maryland government RFPs — eMaryland Marketplace Advantage (eMMA), registration, agencies, and tips.
- **Official portal:** eMaryland Marketplace Advantage (eMMA) · **Registration:** eMMA vendor registration · **Key agencies:** MDOT, DGS, MDH · **Fee:** Free
- **Quick answer:** Maryland centralizes procurement in eMaryland Marketplace Advantage (eMMA); register to find solicitations and submit bids. MDOT and the Dept. of General Services are major buyers.
- **FAQs:** (1) Where are MD bids? → eMMA. (2) Registration? → Free in eMMA. (3) Who oversees it? → DGS. (4) Top buyer? → MDOT.

### 19. Missouri
- **SEO title:** Missouri RFPs: How to Find & Win Missouri Government Bids
- **Slug:** `/learning-center/missouri-rfp-guide`
- **Meta:** Win Missouri government RFPs — MissouriBUYS registration, the procurement portal, agencies, and expert tips.
- **Official portal:** MissouriBUYS · **Registration:** MissouriBUYS supplier registration · **Key agencies:** MoDOT, OA, DSS · **Fee:** Free
- **Quick answer:** Missouri runs statewide purchasing through MissouriBUYS; register as a supplier to find and bid on solicitations. The Office of Administration's Division of Purchasing manages contracts.
- **FAQs:** (1) Where are MO bids? → MissouriBUYS. (2) Registration? → Free. (3) Who oversees it? → Office of Administration. (4) Top buyer? → MoDOT.

### 20. Colorado
- **SEO title:** Colorado RFPs: How to Find & Win Colorado Government Bids
- **Slug:** `/learning-center/colorado-rfp-guide`
- **Meta:** A free guide to Colorado government RFPs — the Colorado VSS / BIDS portal, registration, agencies, and winning tips.
- **Official portal:** Colorado VSS + BIDS · **Registration:** Colorado Vendor Self Service · **Key agencies:** CDOT, OSC, HCPF · **Fee:** Free
- **Quick answer:** Colorado posts solicitations in BIDS and processes vendors through Vendor Self Service (VSS); register to bid. The State Purchasing Office sets statewide policy and CDOT is a major buyer.
- **FAQs:** (1) Where are CO bids? → BIDS / Colorado VSS. (2) Registration? → Free in VSS. (3) Who oversees it? → State Purchasing Office. (4) Top buyer? → CDOT.

### 21. Minnesota
- **SEO title:** Minnesota RFPs: How to Win Minnesota Government Bids
- **Slug:** `/learning-center/minnesota-rfp-guide`
- **Meta:** Win Minnesota government RFPs — the SWIFT Supplier Portal, registration, agencies, and expert bidding tips.
- **Official portal:** SWIFT Supplier Portal · **Registration:** SWIFT supplier registration · **Key agencies:** MnDOT, Admin (Office of State Procurement), DHS · **Fee:** Free
- **Quick answer:** Minnesota centralizes procurement in the SWIFT Supplier Portal; register to find solicitations and submit responses. The Office of State Procurement manages statewide contracts.
- **FAQs:** (1) Where are MN bids? → SWIFT Supplier Portal. (2) Registration? → Free. (3) Who oversees it? → Office of State Procurement. (4) Top buyer? → MnDOT.

### 22. Wisconsin
- **SEO title:** Wisconsin RFPs: How to Find & Win Wisconsin Government Bids
- **Slug:** `/learning-center/wisconsin-rfp-guide`
- **Meta:** A free guide to Wisconsin government RFPs — VendorNet registration, the procurement portal, agencies, and tips.
- **Official portal:** VendorNet · **Registration:** VendorNet vendor registration · **Key agencies:** WisDOT, DOA, DHS · **Fee:** Free
- **Quick answer:** Wisconsin posts solicitations on VendorNet; register to receive bid notices matched to your commodity codes and submit responses. The Dept. of Administration oversees procurement.
- **FAQs:** (1) Where are WI bids? → VendorNet. (2) Registration? → Free in VendorNet. (3) Who oversees it? → DOA. (4) Top buyer? → WisDOT.

### 23. South Carolina
- **SEO title:** South Carolina RFPs: How to Win SC Government Bids
- **Slug:** `/learning-center/south-carolina-rfp-guide`
- **Meta:** Win South Carolina government RFPs — South Carolina Business Opportunities (SCBO), registration, agencies, and tips.
- **Official portal:** South Carolina Business Opportunities (SCBO) · **Registration:** SCEIS / SC vendor registration · **Key agencies:** SCDOT, MMO, DHHS · **Fee:** Free
- **Quick answer:** South Carolina publishes solicitations in South Carolina Business Opportunities (SCBO); register as a state vendor to bid. The Materials Management Office manages statewide procurement.
- **FAQs:** (1) Where are SC bids? → SCBO. (2) Registration? → SC vendor registration. (3) Who oversees it? → Materials Management Office. (4) Top buyer? → SCDOT.

### 24. Alabama
- **SEO title:** Alabama RFPs: How to Find & Win Alabama Government Bids
- **Slug:** `/learning-center/alabama-rfp-guide`
- **Meta:** A free guide to Alabama government RFPs — STAARS Vendor Self Service, registration, agencies, and winning tips.
- **Official portal:** STAARS Vendor Self Service · **Registration:** STAARS VSS · **Key agencies:** ALDOT, Purchasing Division, Medicaid · **Fee:** Free
- **Quick answer:** Alabama posts solicitations through STAARS Vendor Self Service; register to bid and receive notices. The State Purchasing Division manages statewide contracts and ALDOT is a major buyer.
- **FAQs:** (1) Where are AL bids? → STAARS VSS. (2) Registration? → Free. (3) Who oversees it? → State Purchasing Division. (4) Top buyer? → ALDOT.

### 25. Louisiana
- **SEO title:** Louisiana RFPs: How to Win Louisiana Government Bids
- **Slug:** `/learning-center/louisiana-rfp-guide`
- **Meta:** Win Louisiana government RFPs — LaPAC, the LaGov supplier portal, registration, agencies, and expert tips.
- **Official portal:** LaPAC (Louisiana Procurement & Contract network) · **Registration:** LaGov Supplier Portal · **Key agencies:** DOTD, Office of State Procurement, LDH · **Fee:** Free
- **Quick answer:** Louisiana publishes solicitations in LaPAC and processes vendors through the LaGov Supplier Portal; register to bid. The Office of State Procurement oversees statewide contracts.
- **FAQs:** (1) Where are LA bids? → LaPAC. (2) Registration? → LaGov Supplier Portal. (3) Who oversees it? → Office of State Procurement. (4) Top buyer? → DOTD.

### 26. Kentucky
- **SEO title:** Kentucky RFPs: How to Find & Win Kentucky Government Bids
- **Slug:** `/learning-center/kentucky-rfp-guide`
- **Meta:** A free guide to Kentucky government RFPs — the eMARS Vendor Self Service portal, registration, agencies, and tips.
- **Official portal:** Kentucky eProcurement (eMARS) Vendor Self Service · **Registration:** eMARS VSS · **Key agencies:** KYTC, Finance & Administration Cabinet, CHFS · **Fee:** Free
- **Quick answer:** Kentucky runs procurement through eMARS Vendor Self Service; register to find solicitations and submit bids. The Finance and Administration Cabinet oversees statewide purchasing.
- **FAQs:** (1) Where are KY bids? → eMARS VSS. (2) Registration? → Free. (3) Who oversees it? → Finance & Administration Cabinet. (4) Top buyer? → KYTC.

### 27. Oregon
- **SEO title:** Oregon RFPs: How to Find & Win Oregon Government Bids
- **Slug:** `/learning-center/oregon-rfp-guide`
- **Meta:** Win Oregon government RFPs — OregonBuys registration, the procurement portal, agencies, and expert bidding tips.
- **Official portal:** OregonBuys · **Registration:** OregonBuys supplier registration · **Key agencies:** ODOT, DAS Procurement Services, OHA · **Fee:** Free
- **Quick answer:** Oregon centralizes procurement in OregonBuys; register as a supplier to find solicitations and submit bids. DAS Procurement Services manages statewide contracts.
- **FAQs:** (1) Where are OR bids? → OregonBuys. (2) Registration? → Free. (3) Who oversees it? → DAS Procurement Services. (4) Top buyer? → ODOT.

### 28. Oklahoma
- **SEO title:** Oklahoma RFPs: How to Win Oklahoma Government Bids
- **Slug:** `/learning-center/oklahoma-rfp-guide`
- **Meta:** A free guide to Oklahoma government RFPs — OMES vendor registration, the procurement portal, agencies, and tips.
- **Official portal:** OMES Central Purchasing / OK CommerceConnect · **Registration:** OMES vendor registration · **Key agencies:** ODOT, OMES, OHCA · **Fee:** Free
- **Quick answer:** Oklahoma's Office of Management and Enterprise Services (OMES) Central Purchasing posts solicitations; register as a vendor to bid. ODOT is a leading buyer.
- **FAQs:** (1) Where are OK bids? → OMES Central Purchasing. (2) Registration? → Free. (3) Who oversees it? → OMES. (4) Top buyer? → ODOT.

### 29. Connecticut
- **SEO title:** Connecticut RFPs: How to Win Connecticut Government Bids
- **Slug:** `/learning-center/connecticut-rfp-guide`
- **Meta:** Win Connecticut government RFPs — the CTsource / BizNet portal, registration, agencies, and expert tips. Free guide.
- **Official portal:** CTsource · **Registration:** BizNet vendor registration · **Key agencies:** CTDOT, DAS Procurement, DSS · **Fee:** Free
- **Quick answer:** Connecticut publishes solicitations in CTsource and registers vendors through BizNet; register to bid. DAS Procurement Services manages statewide contracts.
- **FAQs:** (1) Where are CT bids? → CTsource. (2) Registration? → BizNet. (3) Who oversees it? → DAS Procurement. (4) Top buyer? → CTDOT.

### 30. Nevada
- **SEO title:** Nevada RFPs: How to Find & Win Nevada Government Bids
- **Slug:** `/learning-center/nevada-rfp-guide`
- **Meta:** A free guide to Nevada government RFPs — NevadaEPro registration, the procurement portal, agencies, and winning tips.
- **Official portal:** NevadaEPro · **Registration:** NevadaEPro vendor registration · **Key agencies:** NDOT, State Purchasing Division, DHHS · **Fee:** Free
- **Quick answer:** Nevada centralizes procurement in NevadaEPro; register as a vendor to find solicitations and submit bids. The State Purchasing Division manages statewide contracts.
- **FAQs:** (1) Where are NV bids? → NevadaEPro. (2) Registration? → Free in NevadaEPro. (3) Who oversees it? → State Purchasing Division. (4) Top buyer? → NDOT.

> **To reach all 50:** repeat the template for the remaining 20 (AK, AR, CT done, DE, HI, IA, ID, KS, ME, MS, MT, ND, NE, NH, NM, RI, SD, UT, VT, WV) using their portals (e.g., DE MyMarketplace, HI HIePRO, IA IowaBids, KS eSupplier, ME VendorLink, MS MAGIC, MT eMACS, ND Bidder Registration, NE eBid, NH NH First, NM Vendor Portal, RI Ocean State Procures, SD State Bid System, UT U3P, VT Bid System, WV wvOASIS, AR ARBuy, ID Luma/IPRO).

---

## 6. Master article calendar (the non-state content, modeled on Bid Lab's 7 categories)

Publish these alongside the state guides to build topical authority. ~40 to start; expand toward 150+ over time.

**Getting Started / Basic Terms**
- What is an RFP? A plain-English guide for small businesses
- RFP vs. RFQ vs. IFB vs. RFI: the differences explained
- What is a government bid? How public procurement works
- NIGP and UNSPSC commodity codes explained
- What is a set-aside contract? (small business, veteran, women-owned, HUBZone, 8(a))

**The Bidding Process**
- The bid lifecycle: from solicitation to award, step by step
- How to read an RFP without missing a disqualifier
- What is a compliance matrix and why it wins bids
- Pre-bid meetings and Q&A periods: how to use them
- Bid bonds, performance bonds, and insurance requirements

**Proposal Writing**
- How to write a winning executive summary
- Writing the technical approach section
- Key staff and past-performance sections that score
- Pricing your bid to win without leaving money behind
- Proofreading and formatting: the details that disqualify

**Winning Strategies**
- Win themes: how to make evaluators choose you
- Go/no-go: how to decide which bids to chase
- How to win your first government contract
- Debriefs: how to turn a loss into the next win
- Should you outsource proposal writing? (→ pay-when-you-win CTA)

**Government Contracting**
- Federal vs. state vs. local contracting: what's different
- How to register on SAM.gov (federal) — step by step
- Understanding set-asides and socioeconomic certifications
- Prevailing wage and Davis-Bacon basics
- Teaming agreements and subcontracting

**Industry Guides** (pages that capture vertical search demand)
- IT & software RFPs · Construction & facilities RFPs · Healthcare & staffing RFPs · Janitorial & maintenance RFPs · Security services RFPs · Professional services RFPs · Transportation RFPs · Education RFPs

**Pillar pages (link hubs)**
- The Complete Small Business Guide to Winning Government Bids
- How to Win Government Bids in Any State (links to all 30+ state guides)

---

## 7. Structured data / schema templates (paste into each article's `<head>`)

**Article + Breadcrumb (every article):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{SEO title}}",
  "datePublished": "{{ISO date}}",
  "dateModified": "{{ISO date}}",
  "author": { "@type": "Organization", "name": "Stronger Built LLC" },
  "publisher": {
    "@type": "Organization",
    "name": "Stronger Built LLC",
    "logo": { "@type": "ImageObject", "url": "https://strongerbuilt.us/logo.png" }
  },
  "mainEntityOfPage": "https://strongerbuilt.us/learning-center/{{slug}}"
}
```

**FAQPage (the AEO workhorse — add to every state guide):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where do I find government RFPs in {{State}}?",
      "acceptedAnswer": { "@type": "Answer", "text": "{{Answer}}" }
    }
    // repeat for each FAQ
  ]
}
```

**Organization (site-wide, on the home page):** include name, url, logo, contactPoint, and `sameAs` links to your social profiles — this defines your brand entity for generative engines.

---

## 8. Internal linking & topic-cluster strategy
- Every **state guide** links to: 3 neighboring state guides, the "Win Government Bids in Any State" pillar, How It Works, and Pricing.
- Every **process/writing article** links to: its category pillar + 2 sibling articles + one relevant state guide.
- The **pillar pages** link down to every spoke; spokes link back up. This cluster structure is what builds topical authority and lifts the whole hub.
- Use **descriptive anchor text** with keywords ("how to register on Cal eProcure"), never "click here."

---

## 9. Publishing & measurement checklist

**Per article, before publishing:**
- [ ] Primary keyword in H1, slug, first 100 words, one H2, meta title
- [ ] Title ≤ 60 chars · meta description ≤ 155 chars
- [ ] Quick Answer box at top (40–55 words)
- [ ] Question-phrased H2s
- [ ] Facts table with portal/registration/agencies/fees
- [ ] FAQ section + FAQPage schema
- [ ] Article + Breadcrumb schema
- [ ] Author byline + last-updated date + link to official state portal (verified live)
- [ ] 3+ internal links · 1+ CTA to "Start My Bid — $450"
- [ ] Mobile-friendly, fast-loading, one H1 only

**Site-wide:**
- [ ] Submit an XML sitemap and the Learning Center to Google Search Console + Bing Webmaster
- [ ] Add the Learning Center to the main nav (replace/duplicate Bid Lab's "Learning Center" slot)
- [ ] Refresh each state guide at least annually (re-verify portals; update the "dateModified")

**Measure:** organic impressions & clicks per guide (Search Console), featured-snippet/PAA captures, AI-Overview/Perplexity citations, and assisted conversions to "Start My Bid."

---

### Suggested launch order
1. The 8–10 largest-economy states first (CA, TX, NY, FL, IL, PA, OH, GA) — biggest search demand.
2. The two pillar pages (so the cluster has a center to link to).
3. The remaining 22 state guides.
4. The Getting Started + Proposal Writing articles (these convert readers already mid-process).
5. Industry guides + the rest, expanding toward 150+ to match and beat Bid Lab's footprint.
