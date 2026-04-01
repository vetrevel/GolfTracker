const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uhcparbbscismqjrrwmf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY3BhcmJic2Npc21xanJyd21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzQ0NjcsImV4cCI6MjA5MDU1MDQ2N30.UNWgVJZIJ0H77a5jqMapmK_S9X-rqxfmShKn4aX2A7k"
);

module.exports = supabase;