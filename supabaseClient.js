import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nktttdmpodskbjvaobox.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rdHR0ZG1wb2Rza2JqdmFvYm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNTc4OTIsImV4cCI6MjA1MTgzMzg5Mn0.iH-Z6h6k747u07-xGfulvVpuOAv0KrWV1frMTrfaIDY';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

