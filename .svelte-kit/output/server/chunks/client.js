import { createClient } from "@supabase/supabase-js";
import "@capacitor/preferences";
import "./sdk.js";
const supabaseUrl = "https://oqqhpyblhwtewhcloioy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcWhweWJsaHd0ZXdoY2xvaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0NDUwMzMsImV4cCI6MjAwMjAyMTAzM30.uf8EYFjn68hCfxvuUMJSCO3eLWDPIgHAPnIixLG1bgI";
createClient(supabaseUrl, supabaseKey);
function calculateRemainingDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const millisecondsPerDay = 24 * 60 * 60 * 1e3;
  const timeDifference = end - start;
  const remainingDays = Math.ceil(timeDifference / millisecondsPerDay);
  return remainingDays;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return dateString ? formatter.format(date) : "Tidak tersedia";
}
function useProps(target, keys) {
  target.length;
  if (!Array.isArray(target)) {
    target = Object.entries(target);
  }
  return Object.fromEntries(
    target.filter(([key, value]) => keys.includes(key))
  );
}
export {
  calculateRemainingDays as c,
  formatDate as f,
  useProps as u
};
