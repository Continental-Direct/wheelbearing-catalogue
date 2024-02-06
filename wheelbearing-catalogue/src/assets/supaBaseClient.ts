import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dsucoxafocjydztfhxum.supabase.co";
const supabasekey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdWNveGFmb2NqeWR6dGZoeHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxNzk3NzEsImV4cCI6MjAyMTc1NTc3MX0.JWA1cqqDFxDbIqwnEd22H2LErAlCPzdXLiAu4Siq5jQ";

const supabase = createClient(supabaseUrl, supabasekey);

export default supabase;
