import { SUPABASE_SERVICE_ROLE } from "$env/static/private";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../DatabaseDefinitions";

const SUPABASE_URL = "https://pyweakmveumkhahfgpxv.supabase.co"

export default createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
