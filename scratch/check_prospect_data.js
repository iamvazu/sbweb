
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

async function checkProspects() {
  console.log("Checking prospects count and data...");
  const { data, count, error } = await supabase
    .from('prospects')
    .select('*', { count: 'exact' })
    .ilike('legal_name', '%121designbuild%')
    .limit(1);

  if (error) {
    console.error("Query Error:", error.message);
    return;
  }

  console.log("Total Count (exact):", count);
  console.log("Returned Data Length:", data.length);
  
  if (data.length > 0) {
    console.log("First 5 items:");
    data.slice(0, 5).forEach((p, i) => {
      console.log(`${i+1}. ${p.legal_name} (${p.city})`);
    });
  }
}

checkProspects();
