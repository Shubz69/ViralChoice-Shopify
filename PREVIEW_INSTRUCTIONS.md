# 🚀 How to Preview Your Theme

## Option 1: Upload ZIP to Shopify (Easiest)

1. **Go to Shopify Admin:**
   - https://admin.shopify.com/store/viralproducts-9921/themes

2. **Upload Theme:**
   - Click "Add theme" → "Upload theme"
   - Select: `viralchoice-theme.zip` from your project folder
   - Click "Upload"

3. **Preview:**
   - After upload, click "Actions" → "Preview"
   - Or click "Actions" → "Publish" to make it live

## Option 2: Shopify CLI Local Preview (Recommended for Development)

### Step 1: Open Terminal
- Open PowerShell or Command Prompt
- Navigate to your project folder

### Step 2: Run Preview Command
```bash
cd "C:\Users\1230s\OneDrive\Documents\Shubz\Shopify Website"
shopify theme dev --store viralproducts-9921.myshopify.com
```

### What Happens:
- Browser opens for authentication
- Creates a development theme automatically
- Starts local preview server
- Shows you a preview URL (usually `http://127.0.0.1:9292`)
- Auto-syncs changes as you edit files

### Benefits:
- ✅ See changes instantly
- ✅ No need to upload ZIP each time
- ✅ Test before publishing
- ✅ Development theme (doesn't affect live store)

## Option 3: GitHub Actions Auto-Deploy

If you've set up GitHub Secrets (see `GITHUB_SECRETS_SETUP.md`):
- Every push to `main` automatically deploys to Shopify
- Then preview in Shopify Admin → Themes

---

**Quick Start:** Use Option 1 to see it immediately, then Option 2 for ongoing development.
