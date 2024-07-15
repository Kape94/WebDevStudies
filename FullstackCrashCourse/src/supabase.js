import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://anojwsyhsnoqhwzsnydz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub2p3c3loc25vcWh3enNueWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMDcxNTQsImV4cCI6MjAzMzc4MzE1NH0.ymlM7a7pF-YX3TI70SjK_F-5aYZBrU7Jav7RNh4r1n4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
