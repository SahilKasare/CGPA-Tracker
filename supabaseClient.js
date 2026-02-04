import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vewotcnnzjydwwpcznzk.supabase.co';
const supabaseKey = 'sb_publishable_UXavzK6Ey0O0C3ZxHW6Hlw_RwrjSmBt';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

