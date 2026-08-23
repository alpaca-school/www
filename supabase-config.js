// GitHub Pages向けの公開クライアント設定。
// 公開用のProject URLとanon keyのみを設定する（service_role keyは置かない）。
(() => {
  const SUPABASE_URL = "https://vgigauynebqlqrgdzpkz.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaWdhdXluZWJxbHFyZ2R6cGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MzQwMDAsImV4cCI6MjEwMzAxMDAwMH0.ikWQTIWBzofFt5n0xJ48H1gXBkhEROkU8vGFfRPmb3Q";

  const isConfigured =
    SUPABASE_URL !== "SUPABASE_URL" &&
    SUPABASE_ANON_KEY !== "SUPABASE_ANON_KEY" &&
    SUPABASE_URL.length > 0 &&
    SUPABASE_ANON_KEY.length > 0;

  window.AlpacaSupabase = Object.freeze({
    isConfigured,
    createClient() {
      if (!isConfigured || !window.supabase?.createClient) return null;
      try {
        return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      } catch (_error) {
        return null;
      }
    },
  });
})();
