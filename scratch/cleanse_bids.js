const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function cleanse() {
  const { data, error } = await supabase.from('bids').select('id, event_name, comments').not('comments', 'is', null);
  if (error) {
    console.error(error);
    return;
  }
  
  const commentCounts = {};
  for (const bid of data) {
    const sig = bid.comments.substring(0, 100);
    if (!commentCounts[sig]) commentCounts[sig] = [];
    commentCounts[sig].push(bid);
  }
  
  let corruptedIds = [];
  for (const [sig, bids] of Object.entries(commentCounts)) {
    // If a comment signature of 100 chars is shared by more than 2 bids, it's highly likely corrupted
    // Actually, to be safe, let's just say > 1 bid! Why would two bids have the EXACT SAME 100 char description?
    if (bids.length > 1) {
      for (const b of bids) {
        corruptedIds.push(b.id);
      }
    }
  }
  
  // Also explicitly add the Ironwood State Prison bid just in case
  const ironwood = data.find(b => b.id === '00650fbe-2f06-4038-afe4-d5c33f41cc53');
  if (ironwood && !corruptedIds.includes(ironwood.id)) {
    corruptedIds.push(ironwood.id);
  }

  console.log(`Found ${corruptedIds.length} potentially corrupted bids out of ${data.length} total bids with comments.`);
  
  // Wipe them in batches
  const batchSize = 50;
  for (let i = 0; i < corruptedIds.length; i += batchSize) {
    const batch = corruptedIds.slice(i, i + batchSize);
    const { error: updateErr } = await supabase
      .from('bids')
      .update({ comments: null, extracted_text: null })
      .in('id', batch);
      
    if (updateErr) {
      console.error('Error updating batch:', updateErr);
    } else {
      console.log(`Wiped ${batch.length} corrupted bids...`);
    }
  }
  
  console.log("Database cleansing complete!");
}

cleanse();
