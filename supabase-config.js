// GitHub Pages向けの公開クライアント設定。
// Supabaseプロジェクト作成後、下の2つのプレースホルダーだけを公開用の値へ置き換える。
(() => {
  const SUPABASE_URL = "SUPABASE_URL";
  const SUPABASE_ANON_KEY = "SUPABASE_ANON_KEY";

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
