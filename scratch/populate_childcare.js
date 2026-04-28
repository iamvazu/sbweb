const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const filesToUpload = [
  { name: 'RFI_25-3061_Childcare_Connect.pdf', type: 'application/pdf', label: 'Official RFI Document' },
  { name: 'RFI_25-3061_Childcare_Connect_Addendum1.pdf', type: 'application/pdf', label: 'Addendum 1' },
  { name: 'RFI_25-3061_Childcare_Connect_Q___A_Final.pdf', type: 'application/pdf', label: 'Q&A Document' },
  { name: 'childcare_connect_rfi_analysis.md', type: 'text/markdown', label: 'BidIQ Strategic Analysis' },
  { name: 'cost_breakdown_childcare.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Draft Cost Breakdown (Paid)' },
  { name: 'rfi_response.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Draft RFI Response (Paid)' }
];

const BUCKET = 'bid-documents';
const BID_ID = 'cpe_5180_38355'; // Childcare Connect

const bidPlan = {
  "title": "Childcare Connect RFI #25-3061",
  "strategy": [
    "Position as the 'De-Risk' Partner with phased MVP implementation.",
    "Propose a platform-based (low-code/no-code) solution with state-retained IP.",
    "Address the 'Quality Ratings' gap proactively by importing external QRIS data.",
    "Demonstrate Federal Compliance Expertise (CCDBG Act, AB 2960)."
  ],
  "fit_indicators": [
    "Open to phased implementation and AI tooling",
    "Open to COTS vs MOTS vs Platform",
    "Subcontracting allowed with clear references"
  ],
  "risks": [
    "Federal compliance deadlines have already passed",
    "Data migration complexity from existing legacy systems",
    "Integration with 69 active R&R agencies required"
  ],
  "scope_summary": "CDSS requires a centralized Childcare Connect portal combining consumer education, provider registry, and administrative workflow management."
};

async function run() {
  const docLinks = [];
  
  // Ensure bucket exists
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets.find(b => b.name === BUCKET)) {
      await supabase.storage.createBucket(BUCKET, { public: true });
    }
  } catch (e) {
    console.error("Bucket check error:", e);
  }

  for (const file of filesToUpload) {
    const filePath = path.join(__dirname, '..', 'bids', file.name);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file.name}, not found.`);
      continue;
    }
    
    const fileData = fs.readFileSync(filePath);
    const storagePath = `${BID_ID}/${file.name}`;
    
    console.log(`Uploading ${file.name}...`);
    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, fileData, {
      contentType: file.type,
      upsert: true
    });
    
    if (error) {
      console.error(`Failed to upload ${file.name}:`, error);
    } else {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
      docLinks.push({
        name: file.label,
        url: data.publicUrl,
        type: 'solicitation_doc',
        status: 'processed'
      });
      console.log(`Uploaded to ${data.publicUrl}`);
    }
  }

  // Update bid
  console.log("Updating bid in DB...");
  const { error } = await supabase.from('bids').update({
    doc_links: docLinks,
    bid_plan: bidPlan
  }).eq('event_id', BID_ID);
  
  if (error) {
    console.error("Failed to update bid:", error);
  } else {
    console.log("Success! Bid updated with AI plan and document links.");
  }
}

run();
