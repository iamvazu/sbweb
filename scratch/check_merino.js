const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data } = await supabase.from('prospects').select('*').ilike('legal_name', '%Merino Landscape%').single();
  console.log(JSON.stringify(data, null, 2));
}

check();
