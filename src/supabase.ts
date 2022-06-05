import { createClient } from '@supabase/supabase-js';

if (
  !process.env.REACT_APP_SUPABASE_URL ||
  !process.env.REACT_APP_SUPABASE_PUBLIC_KEY
) {
  throw new Error('Environment variable does not exist');
}

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

export { supabase };
