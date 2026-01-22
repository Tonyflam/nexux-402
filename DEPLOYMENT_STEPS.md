# 🚀 Complete Vercel Deployment Guide for NEXUS-402

## Current Status
✅ All code changes committed locally (7 commits ahead)  
✅ Vercel configuration files created  
✅ Backend axios dependency added  
❌ Need to push to GitHub (permission issue to resolve)

---

## Step 1: Push Code to GitHub

### Option A: Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not installed
# For Ubuntu/Debian:
sudo apt install gh

# Authenticate
gh auth login

# Push commits
cd /workspaces/hk
git push origin main
```

### Option B: Using Personal Access Token
```bash
# Create a Personal Access Token at: https://github.com/settings/tokens
# Select scopes: repo (all), workflow

# Push with token
cd /workspaces/hk
git push https://YOUR_GITHUB_TOKEN@github.com/Tonyflam/nexux-402.git main
```

### Option C: Using SSH (if configured)
```bash
cd /workspaces/hk
git remote set-url origin git@github.com:Tonyflam/nexux-402.git
git push origin main
```

---

## Step 2: Deploy Backend to Vercel

### 2.1 Create Backend Project on Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select **`Tonyflam/nexux-402`**
4. Click **"Import"**

### 2.2 Configure Backend Settings

**Project Name:** `nexux-402-backend`

**Framework Preset:** `Other` (or `Express` if available)

**Root Directory:** `apps/backend`

**Build Command:**
```bash
pnpm install && pnpm build
```

**Output Directory:** `dist`

**Install Command:**
```bash
pnpm install
```

### 2.3 Add Backend Environment Variables

Click **"Environment Variables"** and add these:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `FRONTEND_URL` | `https://your-frontend-url.vercel.app` *(update after frontend deploy)* |
| `CRONOS_RPC_URL` | `https://evm-t3.cronos.org` |
| `CRONOS_CHAIN_ID` | `338` |
| `CRONOS_EXPLORER_URL` | `https://explorer.cronos.org/testnet` |
| `NEXUS_REGISTRY_ADDRESS` | `0xABA74d14F489F572ed6520950c7D2059F70F2444` |
| `WORKFLOW_ENGINE_ADDRESS` | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` |
| `PAYMENT_ROUTER_ADDRESS` | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` |
| `AGENT_MARKETPLACE_ADDRESS` | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` |
| `USDC_ADDRESS` | `0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a` |
| `FACILITATOR_URL` | `https://x402-facilitator.crypto.com` |
| `PAYMENT_RECIPIENT` | `0x54c06cC2623aAA2Dcc38B17fA07aD2e99b363C90` |
| `DEFAULT_PAYMENT_AMOUNT` | `100000` |

### 2.4 Deploy Backend

Click **"Deploy"** and wait ~2-3 minutes

**Backend URL:** `https://nexux-402-backend.vercel.app`

Copy this URL for the frontend configuration!

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Frontend Project on Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select **`Tonyflam/nexux-402`** again
4. Click **"Import"**

### 3.2 Configure Frontend Settings

**Project Name:** `nexux-402-frontend` (or `nexux-402` for main domain)

**Framework Preset:** `Next.js`

**Root Directory:** `apps/frontend`

**Build Command:**
```bash
pnpm install && pnpm build
```

**Output Directory:** `.next`

**Install Command:**
```bash
pnpm install
```

### 3.3 Add Frontend Environment Variables

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://nexux-402-backend.vercel.app` |
| `NEXT_PUBLIC_RPC_URL` | `https://evm-t3.cronos.org` |
| `NEXT_PUBLIC_CHAIN_ID` | `338` |
| `NEXT_PUBLIC_REGISTRY_ADDRESS` | `0xABA74d14F489F572ed6520950c7D2059F70F2444` |
| `NEXT_PUBLIC_WORKFLOW_ADDRESS` | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` |
| `NEXT_PUBLIC_PAYMENT_ADDRESS` | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` |
| `NEXT_PUBLIC_MARKETPLACE_ADDRESS` | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` |
| `NEXT_PUBLIC_USDC_ADDRESS` | `0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a` |

### 3.4 Deploy Frontend

Click **"Deploy"** and wait ~2-3 minutes

**Frontend URL:** `https://nexux-402.vercel.app`

---

## Step 4: Update CORS Configuration

After both deployments are live, update the backend CORS settings:

### Option A: Update Environment Variable on Vercel

1. Go to your backend project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Edit `FRONTEND_URL` to your actual frontend URL:
   - `https://nexux-402.vercel.app`
4. Click **"Save"**
5. Go to **Deployments** tab
6. Click **"Redeploy"** on the latest deployment

### Option B: Add Multiple Origins (Recommended)

Update [apps/backend/src/index.ts](apps/backend/src/index.ts) CORS config:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://nexux-402.vercel.app',
    'https://nexux-402-frontend.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
```

Then commit and push to trigger automatic redeployment.

---

## Step 5: Verify Deployment

### Backend Health Check
```bash
curl https://nexux-402-backend.vercel.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-22T...",
  "version": "1.0.0",
  "name": "NEXUS-402 API"
}
```

### Test API Endpoint
```bash
curl https://nexux-402-backend.vercel.app/api/market/cro
```

### Frontend Check
Open in browser: `https://nexux-402.vercel.app`

**Verify:**
- ✅ Page loads without errors
- ✅ Wallet connection works
- ✅ Dashboard shows real data
- ✅ Agent cards display correctly
- ✅ No CORS errors in browser console

---

## Step 6: Update Documentation

Update these files with your live URLs:

1. **README.md** - Add "🌐 Live Demo" section:
   ```markdown
   ## 🌐 Live Demo
   
   - **Frontend:** https://nexux-402.vercel.app
   - **Backend API:** https://nexux-402-backend.vercel.app
   - **API Health:** https://nexux-402-backend.vercel.app/health
   ```

2. **SUBMISSION.md** - Update deployment section

3. **HACKATHON.md** - Add live URLs

Then commit and push:
```bash
git add README.md SUBMISSION.md HACKATHON.md
git commit -m "docs: add live Vercel deployment URLs"
git push origin main
```

---

## Troubleshooting

### Build Failures

**Problem:** `Cannot find module 'axios'`  
**Solution:** ✅ Already fixed - axios added to package.json

**Problem:** `Build exceeded maximum time`  
**Solution:** Use Vercel Pro plan or optimize build

**Problem:** TypeScript errors during build  
**Solution:** Check [apps/backend/tsconfig.json](apps/backend/tsconfig.json) and [apps/frontend/tsconfig.json](apps/frontend/tsconfig.json)

### CORS Errors

**Problem:** Frontend can't reach backend  
**Solution:** Update `FRONTEND_URL` in backend environment variables

**Problem:** Multiple origins needed  
**Solution:** Update CORS config in [apps/backend/src/index.ts](apps/backend/src/index.ts)

### Environment Variables Not Working

**Problem:** Variables not loading  
**Solution:** Redeploy after adding env vars - go to Deployments tab and click "Redeploy"

---

## 📋 Quick Checklist

**Pre-Deployment:**
- [x] All code committed locally
- [ ] Code pushed to GitHub (https://github.com/Tonyflam/nexux-402)
- [x] Vercel account created
- [x] vercel.json configuration added

**Backend Deployment:**
- [ ] Backend project created on Vercel
- [ ] Root directory set to `apps/backend`
- [ ] All environment variables added
- [ ] Build successful
- [ ] Health endpoint returns 200

**Frontend Deployment:**
- [ ] Frontend project created on Vercel
- [ ] Root directory set to `apps/frontend`
- [ ] Backend URL added to env vars
- [ ] Build successful
- [ ] Site loads without errors

**Post-Deployment:**
- [ ] CORS configured with frontend URL
- [ ] All API endpoints tested
- [ ] Wallet connection working
- [ ] Documentation updated with live URLs
- [ ] Hackathon submission updated

---

## 🎯 Final URLs for Hackathon Submission

**GitHub Repository:**  
`https://github.com/Tonyflam/nexux-402`

**Live Demo:**  
`https://nexux-402.vercel.app`

**API Documentation:**  
`https://nexux-402-backend.vercel.app/api`

**Demo Video:**  
`https://youtu.be/K8bI92NpbHc`

**Cronos Testnet Explorer:**  
`https://explorer.cronos.org/testnet`

---

## Need Help?

**Vercel Documentation:** https://vercel.com/docs  
**Vercel Support:** https://vercel.com/support  
**Turborepo + Vercel:** https://vercel.com/docs/monorepos/turborepo

---

**Estimated Total Deployment Time:** 15-20 minutes  
**Required Tools:** GitHub account, Vercel account, git authentication  
**Cost:** Free (Hobby tier sufficient for hackathon)
