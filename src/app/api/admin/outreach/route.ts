import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateOutreachEmail } from '@/lib/email-templates';
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const { prospect, bid } = await req.json();

    if (!prospect || !bid) {
      return NextResponse.json({ error: 'Missing prospect or bid data' }, { status: 400 });
    }

    const { legal_name, email, cert_types, city } = prospect;
    const { event_name, department_name, end_date, estimated_value_max, portal_link } = bid;

    if (!email) {
      return NextResponse.json({ error: 'Prospect has no email' }, { status: 400 });
    }

    const { subject, text, html } = generateOutreachEmail(prospect, bid);

    const response = await resend.emails.send({
      from: 'BidIQ <hello@strongerbuilt.us>',
      to: email,
      subject: subject,
      html: html,
      text: text
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error("Outreach API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
