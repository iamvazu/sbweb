export function generateOutreachEmail(prospect: any, bid: any) {
  const { legal_name, cert_types, city } = prospect;
  const { event_name, department_name, end_date, estimated_value_max, portal_link, dvbe_goal, sbe_only, comments } = bid;

  const firstName = legal_name ? legal_name.split(' ')[0] : 'Team';
  const daysLeft = Math.ceil((new Date(end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // Determine template based on bid and cert types
  let template = 3; // Default to general

  if ((dvbe_goal && dvbe_goal !== "0") || event_name?.toLowerCase().includes('dvbe') || comments?.toLowerCase().includes('dvbe')) {
    if (cert_types?.includes('DVBE')) {
      template = 1;
    }
  } else if (sbe_only || event_name?.toLowerCase().includes('small business') || comments?.toLowerCase().includes('sbe')) {
    if (cert_types?.some((c: string) => c.includes('SB'))) {
      template = 2;
    }
  }

  let subject = '';
  let text = '';

  const formatValue = (val: number) => val ? `$${val.toLocaleString()}` : 'TBD';
  const estValue = formatValue(estimated_value_max);
  const successFee = formatValue(estimated_value_max ? estimated_value_max * 0.01 : 0);
  const formattedEndDate = new Date(end_date).toLocaleDateString();

  const getOutreachFlatFee = (estimatedValue: number | null | undefined): { price: number; formatted: string } => {
    if (!estimatedValue) return { price: 450, formatted: "$450" };
    if (estimatedValue <= 1000000) return { price: 450, formatted: "$450" };
    if (estimatedValue <= 3500000) return { price: 850, formatted: "$850" };
    if (estimatedValue <= 6500000) return { price: 1500, formatted: "$1,500" };
    return { price: 1500, formatted: "$1,500" };
  };
  const flatFeeObj = getOutreachFlatFee(estimated_value_max);
  const flatFee = flatFeeObj.formatted;

  if (template === 1) {
    subject = `${firstName}, a DVBE-set-aside bid in ${city || 'your area'} closes ${daysLeft} days — we can submit it for you`;
    text = `Hi ${firstName},

I found a bid that matches ${legal_name} and wanted to reach out directly.

${department_name} is accepting proposals for ${event_name} in ${city || 'your'} County. It closes ${formattedEndDate}. The bid is designated DVBE-eligible — which means your certification gives you a real competitive advantage over larger contractors who cannot even submit.

Most vendors on CaleProcure never bid on contracts like this, not because they can't win, but because the paperwork is overwhelming. The RFP alone is usually 40–80 pages. Add prevailing wage calculations, DIR compliance, and the mandatory pre-bid requirements and most small businesses walk away.

We handle all of it.

I'm Roy Krautstrunk, founder of BidIQ and a licensed SDVOSB/DVBE general contractor in San Diego (CSLB #1057434). For ${flatFee} we will read the full RFP, prepare your complete submission package, handle the compliance checklist, and file it on the portal on your behalf — with your name on it.

If you win, we take 1.00% of the contract value. If you don't, you paid ${flatFee} and learned the process with a professional team behind you.

For context, ${event_name} has an estimated value of ${estValue}. At 1.00%, a win would cost you ${successFee} total — on a contract worth ${estValue}.

Want us to take a look at the bid and tell you whether it's worth pursuing? Reply to this email or call me directly at 831-760-0806. I'll give you an honest assessment at no charge.

— Roy Krautstrunk
Founder, BidIQ · StrongerBuilt LLC · San Diego, CA
CLSB #1057434 · SDVOSB · DVBE
www.strongerbuilt.us · 831-760-0806

P.S. You're receiving this because ${legal_name} is registered in the CaleProcure state supplier database. We looked you up there — not from a purchased list.`;
  } else if (template === 2) {
    subject = `${firstName}, ${department_name} has a Small Business-only bid in ${city || 'your'} County — closes in ${daysLeft} days`;
    text = `Hi ${firstName},

I came across a bid that looks like a strong fit for ${legal_name} and wanted to send it your way.

${department_name} posted ${event_name} — a public contract in ${city || 'your'} County restricted to certified Small Businesses only. That means the big contractors are locked out. Closes ${formattedEndDate}.

Your SB certification makes you eligible. The question is whether the submission is worth the effort to put together.

Here's what's typically in one of these RFPs: scope of work narrative, pricing schedule, references, insurance certificates, DIR registration confirmation, and sometimes a prevailing wage compliance section. It takes most small business owners 15–20 hours to do it right the first time — and one missed requirement means automatic disqualification.

We do this every week.

For ${flatFee} flat, BidIQ will prepare your full submission package for ${event_name}, handle all compliance requirements, and file it on the CaleProcure portal under your company name. If you win, we charge 1.00% of the contract value — nothing if you don't.

No subscription. No retainer. One bid at a time.

I'm Roy Krautstrunk, founder of BidIQ and a licensed contractor in San Diego. Reply here or call 831-760-0806 and I'll walk you through the bid in 10 minutes.

— Roy Krautstrunk
Founder, BidIQ · StrongerBuilt LLC
CLSB #1057434 · SDVOSB · DVBE · San Diego, CA
831-760-0806 · www.strongerbuilt.us

You're receiving this because ${legal_name} is listed in the CaleProcure supplier database.`;
  } else {
    subject = `${event_name} — ${department_name}, ${city || 'your'} County — closes ${formattedEndDate}`;
    text = `Hi ${firstName},

Quick note — I found a bid that matches what ${legal_name} does and wanted to make sure you saw it.

${department_name} is accepting proposals for ${event_name}. Location: ${city || 'your'} County. Deadline: ${formattedEndDate}. Estimated contract value: ${estValue}.

Based on your CaleProcure registration — specifically your service areas and industry type — this looks like a strong fit. Whether it's actually worth pursuing depends on the full RFP details, which I'm happy to pull and review with you.

I'm Roy Krautstrunk. I run BidIQ, a California government procurement platform built specifically for small businesses like ${legal_name}. I'm also a licensed SDVOSB and DVBE contractor in San Diego, so I've been on your side of this process.

If you want, here's what we can do: for ${flatFee} we'll prepare your complete bid submission for ${event_name} — scope response, pricing schedule, compliance docs, everything — and file it on the portal under your name. If you win, 1.00% of the contract. If you don't, ${flatFee} is all you spent.

Or if you just want to see the bid first, go to: ${portal_link || 'CaleProcure'}

Either way, feel free to reply with any questions. I respond personally.

— Roy Krautstrunk
Founder, BidIQ · StrongerBuilt LLC · San Diego, CA
CLSB #1057434 · SDVOSB · DVBE
831-760-0806 · www.strongerbuilt.us

You're receiving this because ${legal_name} is registered in the CaleProcure supplier database — we did not purchase this list.`;
  }

  const html = text.replace(/\n/g, '<br/>');

  return { subject, text, html };
}
