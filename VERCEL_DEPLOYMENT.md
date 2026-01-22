# 🚀 Vercel Deployment Guide for NEXUS-402

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub account with your repository pushed
- Your repository should be at: `https://github.com/tonyflam/nexus-402`

---

## Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

```bash
# Initialize git (if not already done)
cd /workspaces/hk
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NEXUS-402 Hackathon Project"

# Add remote (replace with your actual repo)
git remote add origin https://github.com/tonyflam/nexus-402.git

# Push to GitHub
git push -u origin main
```

---

### Step 2: Deploy Frontend to Vercel

#### 2.1 Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select **"GitHub"** and authorize Vercel
5. Find and select your repository: `tonyflam/nexus-402`

#### 2.2 Configure Project Settings

**Framework Preset:** `Next.js`

**Root Directory:** `apps/frontend`

**Build Command:**
```bash
cd ../.. && pnpm install && cd apps/frontend && pnpm build
```

**Output Directory:** `.next`

**Install Command:**
```bash
pnpm install
```

#### 2.3 Environment Variables

Click **"Environment Variables"** and add these:

| Key | Value | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_RPC_URL` | `https://evm-t3.cronos.org` | Cronos Testnet RPC |
| `NEXT_PUBLIC_CHAIN_ID` | `338` | Cronos Testnet Chain ID |
| `NEXT_PUBLIC_REGISTRY_ADDRESS` | `0xABA74d14F489F572ed6520950c7D2059F70F2444` | NexusRegistry |
| `NEXT_PUBLIC_WORKFLOW_ADDRESS` | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` | WorkflowEngine |
| `NEXT_PUBLIC_PAYMENT_ADDRESS` | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` | PaymentRouter |
| `NEXT_PUBLIC_MARKETPLACE_ADDRESS` | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` | AgentMarketplace |
| `NEXT_PUBLIC_USDC_ADDRESS` | `0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a` | USDC.e on Cronos |

#### 2.4 Deploy

Click **"Deploy"** and wait ~2-3 minutes

Your frontend will be live at: `https://nexus-402-xxx.vercel.app`

---

### Step 3: Deploy Backend to Vercel

#### 3.1 Create New Project

1. Go to Vercel Dashboard
2. Click **"Add New..."** → **"Project"**
3. Import the **same repository**: `tonyflam/nexus-402`

#### 3.2 Configure Backend Settings

**Framework Preset:** `Other`

**Root Directory:** `apps/backend`

**Build Command:**
```bash
cd ../.. && pnpm install && cd apps/backend && pnpm build
```

**Output Directory:** `dist`

**Install Command:**
```bash
pnpm install
```

#### 3.3 Add vercel.json to Backend

Create `/workspaces/hk/apps/backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

#### 3.4 Environment Variables for Backend

| Key | Value |
|-----|-------|
| `PORT` | `3001` |
| `FRONTEND_URL` | `https://nexus-402-xxx.vercel.app` (your frontend URL) |
| `RPC_URL` | `https://evm-t3.cronos.org` |
| `PRIVATE_KEY` | `your_private_key_here` |
| `REGISTRY_ADDRESS` | `0xABA74d14F489F572ed6520950c7D2059F70F2444` |
| `WORKFLOW_ADDRESS` | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` |
| `PAYMENT_ADDRESS` | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` |
| `MARKETPLACE_ADDRESS` | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` |

#### 3.5 Deploy Backend

Click **"Deploy"**

Your backend will be live at: `https://nexus-402-api-xxx.vercel.app`

---

### Step 4: Connect Frontend to Backend

1. Go to your **Frontend** project on Vercel
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://nexus-402-api-xxx.vercel.app` (your backend URL) |

4. Go to **Deployments** tab
5. Click **"..."** on the latest deployment → **"Redeploy"**

---

### Step 5: Update CORS Settings

Since your backend is now on a different domain, update your backend CORS:

Edit `/workspaces/hk/apps/backend/src/index.ts`:

```typescript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://nexus-402-xxx.vercel.app', // Your actual frontend URL
    'https://*.vercel.app' // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Vercel will auto-deploy the changes.

---

## ✅ Verification Checklist

After deployment, verify these work:

- [ ] Frontend loads: `https://nexus-402-xxx.vercel.app`
- [ ] Backend health check: `https://nexus-402-api-xxx.vercel.app/health`
- [ ] Connect wallet works
- [ ] Agents page loads data from blockchain
- [ ] x402 demo page shows registered agents
- [ ] Dashboard shows live stats

---

## 🔧 Troubleshooting

### Build Fails - "pnpm not found"

Add this to your `vercel.json` in root:
```json
{
  "installCommand": "npm install -g pnpm && pnpm install"
}
```

### Backend 404 Errors

Make sure `vercel.json` exists in `apps/backend/`

### CORS Errors

1. Check backend CORS settings include your frontend URL
2. Make sure `FRONTEND_URL` env var is set correctly
3. Redeploy backend after changing

### Environment Variables Not Working

1. Make sure they're set in **both** Production and Preview
2. Redeploy after adding new variables

---

## 📝 Update Your Submission

After deployment, update your hackathon submission with:

**Project Website:**
```
https://nexus-402-xxx.vercel.app
```

Update these files with your live URL:
- `README.md`
- `HACKATHON.md`
- `SUBMISSION.md`

---

## 🎯 Production URLs

Once deployed, you'll have:

| Service | URL |
|---------|-----|
| **Frontend** | `https://nexus-402.vercel.app` |
| **Backend API** | `https://nexus-402-api.vercel.app` |
| **Health Check** | `https://nexus-402-api.vercel.app/health` |
| **API Docs** | `https://nexus-402-api.vercel.app/api` |

---

## 🚀 Custom Domain (Optional)

If you have a custom domain:

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `nexus402.com`)
4. Follow DNS instructions
5. Update environment variables with new domain

---

**You're done! Your NEXUS-402 project is now live on Vercel! 🎉**
