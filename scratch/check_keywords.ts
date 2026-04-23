import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function checkNames() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { data } = await supabase.from('bids').select('event_name, department_name, comments').limit(500)
  
  const keywords = ['SB', 'DVBE', 'Small Business', 'Disabled Veteran', 'Set-Aside', 'SBE']
  const found = data?.filter(b => {
    const text = (b.event_name + ' ' + b.department_name + ' ' + (b.comments || '')).toUpperCase()
    return keywords.some(k => text.includes(k.toUpperCase()))
  })
  
  console.log(`Found ${found?.length} bids with SB/DVBE keywords in text out of ${data?.length}`)
  if (found && found.length > 0) {
    console.log('Sample found:', found[0])
  }
}

checkNames()
