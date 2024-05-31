import {createClient} from "@supabase/supabase-js";

const supabaseUrl = 'https://lhtvlrkajvvcecyyuzik.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxodHZscmthanZ2Y2VjeXl1emlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0OTUzNjYsImV4cCI6MjAzMjA3MTM2Nn0.XgHaErlZWsIK-Km4eLEnPqrvG8KjskJEY2JyX__Vbwc'

export const supabase = createClient(supabaseUrl, supabaseKey)