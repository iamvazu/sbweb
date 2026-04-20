# BidIQ | Powered by StrongerBuilt
### AI-Driven Procurement Intelligence for California Government Contracts

**BidIQ** is a high-performance, agentic intelligence platform engineered for StrongerBuilt LLC. It automates the discovery, extraction, and strategic analysis of California government procurement opportunities, with a specialized focus on Janitorial, Maintenance, and Public Works contracts.

---

## 🚀 The Intelligence Engine (Agentic Pipeline)

The platform is powered by a modular **7-Agent Pipeline** that runs autonomously on GitHub Actions to provide real-time monitoring and high-fidelity bid analysis.

| Agent | Function | Capability |
| :--- | :--- | :--- |
| **1. Harvester** | Discovery | Monitors Cal eProcure and PlanetBids for new solicitations. |
| **2. Delta Detector** | Delta Management | Tracks changes in bid statuses and generates daily intelligence digests. |
| **3. Deep Scraper** | Detail Extraction | Performs multi-template (AUC/WV) scraping of event descriptions, contacts, and meta-data. |
| **4. PDF Extractor** | Document Intelligence | Stages solicitation packages and extracts text from technical PDFs. |
| **5. Compliance Screener** | AI Audit | Automatically reviews bids for Prevailing Wage, Bonding, and DVBE requirements. |
| **6. Strategic Analyst** | Decision Support | Generates a Go/No-Go analysis and correlation score based on past performance. |
| **7. Match Engine** | Strategic Fit | Scores every bid against StrongerBuilt’s core competencies and capacity. |

---

## 💎 Core Feature Sets

### 🏛️ Advanced Cal eProcure Intelligence
*   **Dual-Template Support**: Robust handling of both "Formal" (AUC) and "Simplified" (WV) solicitation structures.
*   **Smart Table Parsing**: Automated extraction of **UNSPSC Classifications** and **Geographic Service Areas** (Counties).
*   **Pre-Bid Conference Tracking**: Automatic detection of Mandatory vs. Non-Mandatory site walks, including dates, times, and locations.
*   **Contractor License Validation**: Instant identification of CSLB license requirements (Class B, C-27, etc.).

### 🤖 AI-Powered Analysis Panels
*   **Strategic Go/No-Go**: AI-generated assessment of project risk and profitability.
*   **Correlation Scoring**: Visual 0-100% score representing the strategic fit for the StrongerBuilt portfolio.
*   **Compliance Dashboard**: Instant visibility into project mandates like bonding, SBE/DVBE goals, and prevailing wage status.

### 💼 Portfolio Management Portal
*   **Status Tracking**: Manage the bid lifecycle from *New Match* to *Reviewing*, *Pursuing*, and *Submitted*.
*   **Centralized Docs**: One-click access to all official solicitation packages and AI-extracted summaries.
*   **Stripe Integration**: Tiered payment gateways for Prime Contractors to secure mandatory site-walk deposits ($750 - $3,500).

---

## 🛠️ Technical Architecture

*   **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router, Server Components)
*   **Backend & DB**: [Supabase](https://supabase.com/) (PostgreSQL, Realtime, Auth)
*   **Agents / Scraping**: [Playwright](https://playwright.dev/) + Python 3.10
*   **Intelligence**: OpenAI GPT-4o / Claude 3.5 Sonnet Integration
*   **Automation**: GitHub Actions (Scheduled 3-hour intelligence cycles)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)

---

## 🔐 Role-Based Access Control (RBAC)

The platform employs a domain-driven simulation for secure access:
*   **Super Admin (`roy@strongerbuilt.us`)**: Full pipeline control and strategic oversight.
*   **Internal Ops (`@strongerbuilt.us`)**: Bid management and compliance review.
*   **Agency Users (`.gov` / `.mil`)**: Direct credential verification and capability statement access.
*   **Vendors/Partners**: Managed access to shared bid assets and on-boarding.

---

## 📄 Credentials & Compliance
**Stronger Built Group LLC**
*   **CSLB License**: #1057434 (Class B, C-6, C-36)
*   **CA SOS Entity**: B20260157630
*   **SBE/DVBE Certified**: California Department of General Services.
*   **Location**: 4370 1/2 Oregon St, San Diego, CA 92104
