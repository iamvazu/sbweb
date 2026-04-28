const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.from('bids').select('contact_phone').limit(1);
  if (error) {
    console.error("Column likely missing:", error.message);
  } else {
    console.log("Column exists:", data);
  }
}

check();
