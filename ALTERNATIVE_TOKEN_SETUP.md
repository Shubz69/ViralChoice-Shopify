# 🔑 Alternative Ways to Get Shopify API Token

Since Shopify has moved to the new Dev Dashboard, here are alternative methods:

## Method 1: Use Shopify CLI (Easiest)

The Shopify CLI can authenticate and deploy directly without needing to manually create an app.

### Steps:

1. **Authenticate with Shopify CLI:**
   ```bash
   shopify auth login
   ```
   This will open your browser and ask you to authorize.

2. **Deploy directly:**
   ```bash
   shopify theme push --store viralproducts-9921.myshopify.com --development
   ```
   This will create a development theme and deploy to it.

3. **For GitHub Actions, you still need a token:**
   - After authenticating with CLI, the token is stored locally
   - But for GitHub Actions, you'll need to create an app in Dev Dashboard

## Method 2: Use Dev Dashboard (New Method)

1. **Go to Shopify Partners:**
   - Visit: https://partners.shopify.com
   - Sign in with your Shopify account

2. **Create an App:**
   - Click "Apps" in the left menu
   - Click "Create app"
   - Choose "Custom app" or "Public app"
   - Name it: "GitHub Actions Deploy"

3. **Configure API Scopes:**
   - Go to "API credentials"
   - Under "Admin API", configure scopes:
     - ✅ `read_themes`
     - ✅ `write_themes`
   - Click "Save"

4. **Install to Your Store:**
   - Go to "Overview" tab
   - Click "Install app" or "Add store"
   - Select your store: `viralproducts-9921`
   - Install the app

5. **Get the Token:**
   - Go to "API credentials" tab
   - Copy the "Admin API access token" (starts with `shpat_...`)

## Method 3: Use Shopify CLI with Store-Specific Auth

If you want to use CLI for deployment but need a token for GitHub Actions:

1. **Authenticate:**
   ```bash
   shopify auth login --store viralproducts-9921.myshopify.com
   ```

2. **List themes to get Theme ID:**
   ```bash
   shopify theme list --store viralproducts-9921.myshopify.com
   ```

3. **Deploy to development theme:**
   ```bash
   shopify theme push --store viralproducts-9921.myshopify.com --development
   ```

## Method 4: Manual ZIP Upload (No API Token Needed)

If you just want to see the website without automated deployment:

1. **Create ZIP file** of all theme files
2. **Upload to Shopify:**
   - Go to: Online Store → Themes
   - Click "Add theme" → "Upload theme"
   - Select your ZIP file
   - Click "Preview" to see it

This doesn't require any API tokens, but you'll need to manually upload each time you make changes.

---

## Recommended Approach

**For now (to see the website quickly):**
- Use Method 4 (ZIP upload) to get the theme on your store immediately

**For automated deployment later:**
- Use Method 2 (Dev Dashboard) to create an app and get the API token
- Then add it to GitHub Secrets
