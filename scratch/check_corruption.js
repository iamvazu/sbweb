const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.from('bids').select('id, event_name, comments').not('comments', 'is', null);
  if (error) console.error(error);
  else {
    const commentCounts = {};
    for (const bid of data) {
      if (!bid.comments) continue;
      // take first 50 chars as signature
      const sig = bid.comments.substring(0, 50);
      if (!commentCounts[sig]) commentCounts[sig] = [];
      commentCounts[sig].push(bid.event_name);
    }
    
    for (const [sig, bids] of Object.entries(commentCounts)) {
      if (bids.length > 5) {
        console.log(`\nSignature: "${sig}" appears in ${bids.length} bids!`);
        console.log(`Sample bids:`, bids.slice(0, 3));
      }
    }
  }
}

check();
