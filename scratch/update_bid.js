const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateBid() {
  const { data, error } = await supabase
    .from('bids')
    .update({
      contact_phone: '559/782-2674',
      prebid_date: '04/28/2026',
      prebid_time: '10:00AM',
      prebid_location: '26501 Avenue 140, Porterville, California, 93257',
      prebid_comments: 'Porterville Developmental Center, PO Modular Bldg, see attached map',
      mandatory_prebid: true
    })
    .ilike('event_id', '%PR269201A%');
    
  if (error) {
    console.error('Error updating bid:', error);
  } else {
    console.log('Successfully backfilled bid PR269201A');
  }
}

updateBid();
