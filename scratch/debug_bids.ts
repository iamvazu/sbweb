import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local explicitly
dotenv.config({ path: '.env.local' })

async function debug() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('Connecting to:', url)
  if (!url || !key) {
    console.error('Missing env vars')
    return
  }

  const supabase = createClient(url, key)

  const now = new Date().toISOString()
  console.log('Current time:', now)

  const { data, error, count } = await supabase
    .from('bids')
    .select('id, event_name, sbe_only, dvbe_goal, end_date', { count: 'exact' })
    .eq('status', 'Posted')
    .gte('end_date', now)
    .limit(100)

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('Total active bids found:', count)
  
  const withSbe = data?.filter(b => b.sbe_only === true)
  const withDvbe = data?.filter(b => b.dvbe_goal && b.dvbe_goal !== '0%' && b.dvbe_goal !== 'None')

  console.log('Bids with SBE:', withSbe?.length)
  console.log('Bids with DVBE:', withDvbe?.length)

  if (withSbe && withSbe.length > 0) {
    console.log('Sample SBE:', withSbe[0])
  }
  if (withDvbe && withDvbe.length > 0) {
    console.log('Sample DVBE:', withDvbe[0])
  }
}

debug()
