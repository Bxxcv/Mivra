/**
 * File ini akan digantikan otomatis oleh:
 *   npm run supabase:gen-types
 * setelah project Supabase dibuat & migration 0001_init.sql dijalankan.
 * Jangan edit manual — hasil generate akan menimpa isi file ini.
 */
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
