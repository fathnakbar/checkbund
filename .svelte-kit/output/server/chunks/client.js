import { createClient } from "@supabase/supabase-js";
import "@capacitor/preferences";
const supabaseUrl = "https://oqqhpyblhwtewhcloioy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcWhweWJsaHd0ZXdoY2xvaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0NDUwMzMsImV4cCI6MjAwMjAyMTAzM30.uf8EYFjn68hCfxvuUMJSCO3eLWDPIgHAPnIixLG1bgI";
createClient(supabaseUrl, supabaseKey);
