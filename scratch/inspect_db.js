
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectTable(tableName) {
  console.log(`\n--- Inspecting ${tableName} ---`);
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(1);

  if (error) {
    console.error(`Error fetching ${tableName}:`, error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log('Columns:', Object.keys(data[0]).join(', '));
    console.log('Sample data:', JSON.stringify(data[0], null, 2));
  } else {
    console.log('No data found in table.');
  }
}

async function run() {
  await inspectTable('bids');
  await inspectTable('prospects');
}

run();
