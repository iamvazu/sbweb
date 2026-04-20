
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMatches() {
  console.log("Checking prospect_bid_matches join...");
  const { data, error } = await supabase
    .from('prospect_bid_matches')
    .select(`
      *,
      prospect:prospects(legal_name, email, cert_types, city),
      bid:bids(event_name, department_name, end_date)
    `)
    .limit(3);

  if (error) {
    console.error("Query Error:", error.message);
    return;
  }

  console.log("Found matches:", data.length);
  data.forEach((m, i) => {
    console.log(`\nMatch ${i+1}:`);
    console.log(`- Score: ${m.score}`);
    console.log(`- Prospect ID: ${m.prospect_id}`);
    console.log(`- Joined Prospect:`, m.prospect);
    console.log(`- Joined Bid:`, m.bid);
  });
}

checkMatches();
