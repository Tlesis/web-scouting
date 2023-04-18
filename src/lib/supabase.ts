import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { SUPABASE_SERVICE_ROLE } from "$env/static/private";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../DatabaseDefinitions";

export default createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE);
