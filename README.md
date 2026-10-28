# ZIMSEC Genie

Question generator, exam builder and scheme-of-work tool for ZIMSEC Maths 4004, Accounts 4053 and Business 4048 teachers. Plain HTML/CSS/JS, no build step.

## 1. Create the Supabase project
1. Go to https://supabase.com and sign in. Click **New project**, name it `zimsec-genie`, set a database password, pick the nearest region, click **Create**. Wait about 2 minutes.

## 2. Run the SQL
1. In Supabase open **SQL Editor** > **New query**.
2. Open `supabase.sql` from this repo, copy everything, paste it, click **Run**.
3. Open **Table Editor**: you should see `syllabi` (65 rows), `teachers`, `questions_log`, `schemes`.

## 3. Set URL and KEY
1. In Supabase go to **Project Settings** > **API**.
2. Copy **Project URL** and the **anon public** key.
3. Open `js/supabase.js` and replace `'SUPABASE_URL'` and `'SUPABASE_KEY'` on line 2 with them (keep the quotes).

## 4. Push to GitHub Pages
1. On https://github.com click **New repository** (name e.g. `zimsec-genie`, Public), click **Create**.
2. Upload all files keeping the folders `css/` and `js/` (or: `git init && git add . && git commit -m "ZIMSEC Genie" && git branch -M main && git remote add origin https://github.com/YOURNAME/zimsec-genie.git && git push -u origin main`).
3. Repo **Settings** > **Pages** > Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`, click **Save**.
4. After 1-2 minutes open `https://YOURNAME.github.io/zimsec-genie/`.

## 5. Use on a phone
Open the link in Chrome, log in with a phone number, then menu > **Add to Home screen**. After one online visit the app works offline; saves made offline sync when the phone reconnects.

## Notes
- Phone login is a convenience label, not secure authentication. The SQL policies are open so any visitor with your anon key can read/write; do not store sensitive data. Add Supabase Auth before wider use.
- Syllabus codes and objectives in `supabase.sql` are working placeholders: check them against the official ZIMSEC syllabus documents and edit rows in the Table Editor.
- PDF export shows maths as plain text (e.g. `(3)/(4)`). Use **Print** > Save as PDF for typeset KaTeX output.
