import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;
const supabaseConn = createClient(supabaseURL, supabaseKey);

export interface SupabaseAnalyticsTableRow {
  date: string,
  event_type: string,
  additional_data?: string 
}

export async function insertIntoSupabase(table: String, jsonData: SupabaseAnalyticsTableRow) {
    const { error } = await supabaseConn.from(String(table)).insert(
        [jsonData]
      )
}