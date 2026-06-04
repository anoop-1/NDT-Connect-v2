# >>> READ THIS FIRST, EVERY SESSION <<<
# The single living context file for the NDT-Connect SEO/growth project is:
#     NDT-CONNECT-CONTEXT.md
# Read it in full at the start of every session, then continue with the next
# task the user names (or the top unchecked item in its Task Queue).
# UPDATE NDT-CONNECT-CONTEXT.md as work completes (Current State, Task Queue,
# Change Log). Do NOT create new plan/strategy .md files — fold updates there.

GSC & GA4 – access for both Atlantisndt.com and NDT-connect.com
atlantismarketing@x-jigsaw-293515.iam.gserviceaccount.com


SEO should be done in a proffesional manner to grab as much traffic as possible, constant audit and improvement is needed for SEO until we rank in the top 3 pages in all the cities that we have pages in. parimary market is US market. 

ensure consistency of theme, UI /UX all over the pages. 

---

# >>> CREDENTIALS — SINGLE SOURCE OF TRUTH (SSOT) <<<
# ALL secrets (tokens, passwords, keys) live in:  Tokens.docx  (repo root, git-ignored, local only)
# Do NOT paste secret values into any committed file. This section lists only the
# non-secret identifiers + WHERE to find each secret, so the location never needs
# to be re-explained. To read secrets: parse Tokens.docx (python-docx).

## Infrastructure map (non-secret)
- **Host**: Vercel (Next.js 14 App Router). Deployed from git, NOT from the nested `NDTConnect/` subdir (that is stale — ignore it).
- **Vercel team id**: `team_RvIKW6PFuuliC77dktstAJmQ`
- **Production project**: `ndt-connect-v2-x8ra` / id `prj_GB8CvnLDNFOkLVXrnnRzyTtnKZHR`
  - Domains: `ndt-connect.com`, `www.ndt-connect.com`
  - (`ndt-connect-v2` / `prj_HE3KwrGy2jtQ3w87EKvt5s7Kx5p0` is the OLD project — `*.vercel.app` only, not live)
- **Database**: MongoDB Atlas — cluster `ndtconnect.qpbvncb.mongodb.net`, db `NDTConnect2`,
  region AWS me-south-1 (Bahrain), Network Access = `0.0.0.0/0` (open). User/password → Tokens.docx.
- **VPS** (Odoo/email/old sites): Hostinger `148.230.122.172`. root pw + SSH key (`C:\Users\anuan\.ssh\atlantis_vps`) → Tokens.docx.

## Secret → location (all in Tokens.docx)
| Secret | Used for |
|--------|----------|
| GitHub token (`ghp_...`) | repo automation |
| Vercel token (`vcp_...`) | deploy + env management via api.vercel.com |
| MongoDB Atlas `mongodb+srv://...` | app `MONGODB_URI` env var |
| GSC/GA4 service accounts (atlantis-gsc-2..10) | Search Console + Indexing API |
| Zep API key, Zerodha key/secret | other projects |

## Required Vercel env vars (set on the prod project, values from Tokens.docx)
`MONGODB_URI` (Atlas srv string — NOT a plain `mongodb://` host, srv forces TLS),
`JWT_SECRET` (>=32 char random; app fails closed if unset — see `lib/jwt.ts`),
plus SMTP_*, GEMINI_API_KEY, NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_GA_MEASUREMENT_ID.

> Login-500 / "Mongoose is connecting with SSL enabled, but the server is not accepting
> SSL connections" == prod `MONGODB_URI` is wrong (points at a non-TLS host). Fix = set it
> to the Atlas srv string from Tokens.docx, then REDEPLOY (env changes need a redeploy).
> Helper: `node scripts/fix-prod-env.mjs` with `VERCEL_TOKEN` set (reads URI from local `.env`).