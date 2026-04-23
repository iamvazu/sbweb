import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function checkRaw() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  
  // Just get 50 bids and see what sbe_only and dvbe_goal look like
  const { data } = await supabase.from('bids').select('event_name, sbe_only, dvbe_goal').limit(100)
  
  let sbeFound = 0;
  let dvbeFound = 0;
  
  data?.forEach(b => {
    if (b.sbe_only) sbeFound++;
    if (b.dvbe_goal && b.dvbe_goal !== '0%') dvbeFound++;
  })
  
  console.log(`Checked 100 bids. SBE: ${sbeFound}, DVBE: ${dvbeFound}`)
  
  // Find ONE that has it if any
  const { data: sbeBids } = await supabase.from('bids').select('*').eq('sbe_only', true).limit(1)
  console.log('One SBE bid:', sbeBids)
  
  const { data: dvbeBids } = await supabase.from('bids').select('*').not('dvbe_goal', 'is', null).neq('dvbe_goal', '0%').limit(1)
  console.log('One DVBE bid:', dvbeBids)
}

checkRaw()
