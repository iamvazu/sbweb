const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.from('bids').select('id, event_name, portal_link, comments, extracted_text').eq('id', '00650fbe-2f06-4038-afe4-d5c33f41cc53').single();
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

check();
