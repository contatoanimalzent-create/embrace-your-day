import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pthfgufytkdvdgksqots.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aGZndWZ5dGtkdmRna3Nxb3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDMwMjMsImV4cCI6MjA4OTI3OTAyM30.hjb38Q7Hrx8w7XPGUQnMyMR4DZq4uc5dOxCHm8jSBf4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);