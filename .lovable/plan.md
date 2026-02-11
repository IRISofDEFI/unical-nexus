

## Remove Backend Files

Delete the following files/folders that contain Supabase-related configuration:

### Files to Delete
1. **`.env`** — Contains Supabase environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`)
2. **`supabase/` folder** — Contains `config.toml` and any remaining migration files

### Additional Cleanup
3. **`src/integrations/supabase/`** — This folder still contains `client.ts` and `types.ts` which import from `@supabase/supabase-js` and reference the `.env` variables. These should also be deleted to avoid build errors.
4. **Remove `@supabase/supabase-js`** from `package.json` dependencies since nothing will use it after cleanup.
5. **Verify** that no other files import from `@/integrations/supabase/` — if any do, those imports will be removed.

### What Stays Unchanged
- All frontend components, layouts, routing, and styling
- Mock authentication in `AuthContext.tsx`
- Admin dashboard, student, and staff UIs

