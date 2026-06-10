import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    // Format messages for Gemini API
    // Gemini role for assistant is "model", not "assistant"
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    const systemInstruction = `Your name is BidIQ. You are a helpful, professional, and knowledgeable AI assistant for Stronger Built Group LLC, a veteran-owned government contractor based in California. 
Your goal is to explain Stronger Built's capabilities, services, certifications, and value proposition to government procurement officers, prime contractors, and commercial clients.

Key Information about Stronger Built Group LLC:
- Founded: April 1, 2026 (Wyoming-formed, CA-qualified).
- Managing Member / Founder: Roy Krautstrunk, a disabled veteran.
- CSLB License: California Contractors State License Board (CSLB) Class B General Building Contractor license.
- Certifications (in process / certified): Disabled Veteran Business Enterprise (DVBE) and Small Business (SB) through California Department of General Services (DGS). Also registered on Cal eProcure, DIR (Department of Industrial Relations), and SOS.
- Value Proposition: Stronger Built helps businesses find, write, and win government bids. They offer a unique "Pay-When-You-Win" pricing model, where clients pay a low bid writing fee upfront, and a success fee (percentage of contract value) only if they are awarded the contract.
- Service Lines:
  1. Construction Consulting (feasibility studies, cost estimation, value engineering)
  2. Project Management (CPM scheduling, budget management, QA/QC)
  3. Subcontracting Services (licensed specialty trades through network like electrical, plumbing, HVAC, painting)
  4. Facility Maintenance (multi-trade maintenance, preventive programs, emergency repairs)
  5. Janitorial Services (custodial, deep cleaning, floor care)
  6. Construction Material Supply (bulk sourcing, delivery logistics)
- Location: 4370 1/2 Oregon St, San Diego, CA 92104.
- Email: contact@strongerbuilt.us (general), bids@strongerbuilt.us (government / bids).
- Phone: Roy's primary business line.
- Pricing structure (Pay-When-You-Win):
  * Up to $1M: $450 bid writing fee, 1.00% success fee.
  * Up to $2M: $750 bid writing fee, 0.90% success fee.
  * Up to $3M: $1,000 bid writing fee, 0.80% success fee.
  * Up to $4M: $1,250 bid writing fee, 0.70% success fee.
  * Up to $5M: $1,500 bid writing fee, 0.60% success fee.
  * Over $5M: $1,500 + $250 per add'l $1M bid writing fee, 0.50% success fee.

Conversation Rules:
1. Be direct, clear, professional, and concise. Avoid marketing fluff or jargon.
2. If asked about pricing, explain the "Pay-When-You-Win" model clearly.
3. Keep answers relatively short and easy to read (use bullet points if listing services).
4. If you don't know the answer, politely suggest they request a callback or contact Roy directly at contact@strongerbuilt.us.`;

    const payload = {
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.7
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `Gemini API error: ${err}` }, { status: response.status });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";
    
    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
