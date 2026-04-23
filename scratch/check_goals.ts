import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

async function check() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { count: total } = await supabase.from('bids').select('*', { count: 'exact', head: true })
  console.log('Total:', total)

  const { count: sbe } = await supabase.from('bids').select('*', { count: 'exact', head: true }).eq('sbe_only', true)
  console.log('SBE Only:', sbe)

  const { data: dvbeData } = await supabase.from('bids').select('dvbe_goal').not('dvbe_goal', 'is', null)
  const dvbeCount = dvbeData?.filter(b => b.dvbe_goal && b.dvbe_goal !== '0%').length
  console.log('DVBE Goal (>0%):', dvbeCount)
}

check()
