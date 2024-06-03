import {createClient} from "@supabase/supabase-js";


const supabaseUrl = 'https://nxirgdewqzxyqbulvwly.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aXJnZGV3cXp4eXFidWx2d2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxMDM0MDYsImV4cCI6MjAzMjY3OTQwNn0.cm0fKhmcMpcLQaAcibMLQ1pR4Jryl2dcgxGogUNMQiA'
export const supabase = createClient(supabaseUrl, supabaseKey)