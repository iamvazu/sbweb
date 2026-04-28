const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const ids = ['cpe_2720_38880', 'cpe_5225_38105', 'cpe_2720_38529'];
  const { data } = await supabase.from('bids').select('id, event_id, status, end_date').in('event_id', ids);
  console.log(data);
}

check();
