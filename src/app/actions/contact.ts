"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Stronger Built <noreply@strongerbuilt.us>";
const ADMIN_NOTIFICATION_EMAIL = "hello@strongerbuilt.xyz";

interface ContactSubmission {
  fullName: string;
  email: string;
  inquiryType: string;
  messageBrief: string;
}

export async function submitContactForm(data: ContactSubmission) {
  try {
    const { fullName, email, inquiryType, messageBrief } = data;

    if (!fullName || !email || !messageBrief) {
      throw new Error("Missing required fields");
    }

    // 1. Send notification email to admin (hello@strongerbuilt.xyz)
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; margin-top: 0;">New General Contact Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 140px; border-bottom: 1px solid #f1f5f9;">Full Name:</td>
            <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Email Address:</td>
            <td style="padding: 8px 0; color: #3b82f6; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Inquiry Type:</td>
            <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><span style="background-color: #eff6ff; color: #1e40af; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: bold;">${inquiryType}</span></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Message Brief:</td>
            <td style="padding: 8px 0; color: #334155; white-space: pre-wrap; line-height: 1.5;">${messageBrief}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px;">
          Submitted via Stronger Built General Contact Desk on ${new Date().toLocaleString()}.
        </div>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `[Contact Desk] ${inquiryType} from ${fullName}`,
      html: adminHtml,
      text: `New general contact desk submission:\n\nName: ${fullName}\nEmail: ${email}\nType: ${inquiryType}\n\nMessage:\n${messageBrief}`,
      replyTo: email,
    });

    // 2. Send auto-reply confirmation email to user
    const autoReplyHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="margin-bottom: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
          <h1 style="color: #0F2042; font-size: 22px; margin: 0; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">STRONGER BUILT</h1>
          <p style="color: #64748b; font-size: 11px; margin: 4px 0 0 0; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">Procurement & Proposal Advisory</p>
        </div>
        
        <p style="color: #334155; font-size: 15px; line-height: 1.6; font-weight: 500;">Dear ${fullName},</p>
        
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">Thank you for reaching out to the Stronger Built Procurement Desk. We have successfully received your inquiry regarding <strong>${inquiryType}</strong>.</p>
        
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">Our proposal advisory and project management team is reviewing your message brief. We guarantee an initial acknowledgement or follow-up response within <strong>24 business hours</strong>.</p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px 20px; margin: 25px 0;">
          <h3 style="color: #0F2042; font-size: 12px; font-weight: 800; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.05em;">Your Submission Brief</h3>
          <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 0; white-space: pre-wrap;">${messageBrief.slice(0, 300)}${messageBrief.length > 300 ? '...' : ''}</p>
        </div>

        <p style="color: #334155; font-size: 14px; line-height: 1.6;">If you have a time-sensitive RFP deadline or need immediate assistance, please call us directly at <strong>(831) 760-0806</strong>.</p>

        <p style="color: #334155; font-size: 14px; line-height: 1.6; margin-top: 30px;">Best regards,</p>
        
        <div style="margin-top: 10px;">
          <p style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0;">Procurement Operations</p>
          <p style="color: #64748b; font-size: 12px; margin: 2px 0 0 0;">Stronger Built LLC</p>
          <p style="color: #64748b; font-size: 11px; margin: 2px 0 0 0;"><a href="https://www.strongerbuilt.us" style="color: #1e3a8a; text-decoration: none;">www.strongerbuilt.us</a> · (831) 760-0806</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Stronger Built — Inquiry Acknowledged: ${inquiryType}`,
      html: autoReplyHtml,
      text: `Dear ${fullName},\n\nThank you for contacting the Stronger Built Procurement Desk. We have received your inquiry regarding "${inquiryType}".\n\nOur team is reviewing your message brief, and we will follow up with you within 24 business hours.\n\nBest regards,\nProcurement Operations\nStronger Built LLC\nwww.strongerbuilt.us\n(831) 760-0806`,
    });

    return { success: true };
  } catch (error: any) {
    console.error("submitContactForm Error:", error);
    throw new Error(error.message || "Failed to process contact inquiry");
  }
}
