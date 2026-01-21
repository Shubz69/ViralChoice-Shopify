# 🔐 GitHub Secrets Setup Guide

Follow these steps to set up automated deployment from GitHub to Shopify.

## Step 1: Get Your Shopify Admin API Token

1. **Log into Shopify Admin:**
   - Go to your Shopify store admin panel
   - Navigate to: **Settings** → **Apps and sales channels**

2. **Develop Apps:**
   - Click **"Develop apps"** (at the bottom of the Apps section)
   - Click **"Create an app"**

3. **Name Your App:**
   - Name it: `GitHub Actions Deploy` (or any name you prefer)
   - Click **"Create app"**

4. **Configure API Scopes:**
   - Click **"Configure Admin API scopes"**
   - Scroll down to **"Themes"** section
   - Check these permissions:
     - ✅ `read_themes`
     - ✅ `write_themes`
   - Click **"Save"**

5. **Install the App:**
   - Click **"Install app"** button at the top
   - Confirm installation by clicking **"Install"**

6. **Get the Access Token:**
   - After installation, you'll see **"API credentials"** section
   - Copy the **"Admin API access token"** (it starts with `shpat_...`)
   - ⚠️ **IMPORTANT:** Save this token securely - you won't be able to see it again!

## Step 2: Find Your Shopify Store Domain

Your store domain is in one of these formats:
- `yourstore.myshopify.com` (development store)
- `yourstore.com` (if you have a custom domain)

**To find it:**
- Look at your Shopify admin URL: `https://admin.shopify.com/store/YOURSTORE`
- Or go to **Settings** → **Domains** in Shopify admin

## Step 3: Find Your Shopify Theme ID

**Method 1: From Shopify Admin (Easiest)**
1. Go to **Online Store** → **Themes**
2. Click on the theme you want to deploy to (or create a new development theme)
3. Look at the URL in your browser: `admin.shopify.com/store/YOURSTORE/themes/THEME_ID`
4. The `THEME_ID` is the number at the end (e.g., `193424818518`)

**Method 2: Using Shopify CLI**
```bash
shopify theme list --store yourstore.myshopify.com
```
This will list all themes with their IDs.

**Note:** If you want to deploy to a development theme first (recommended):
- Create a new development theme in Shopify Admin
- Use that theme's ID for testing
- Once everything works, you can switch to your live theme ID

## Step 4: Add Secrets to GitHub

1. **Go to Your GitHub Repository:**
   - Navigate to: `https://github.com/Shubz69/ViralChoice-Shopify`
   - Click **"Settings"** tab (top navigation)

2. **Go to Secrets:**
   - In the left sidebar, click **"Secrets and variables"** → **"Actions"**
   - Click **"New repository secret"**

3. **Add Each Secret:**

   **Secret 1: `SHOPIFY_CLI_THEME_TOKEN`**
   - Name: `SHOPIFY_CLI_THEME_TOKEN`
   - Value: Paste your Admin API access token (the `shpat_...` token from Step 1)
   - Click **"Add secret"**

   **Secret 2: `SHOPIFY_FLAG_STORE`**
   - Name: `SHOPIFY_FLAG_STORE`
   - Value: Your store domain (e.g., `yourstore.myshopify.com`)
   - Click **"Add secret"**

   **Secret 3: `SHOPIFY_FLAG_THEME_ID`**
   - Name: `SHOPIFY_FLAG_THEME_ID`
   - Value: Your theme ID (the number from Step 3)
   - Click **"Add secret"**

## Step 5: Verify Setup

Once all three secrets are added:

1. **Check GitHub Actions:**
   - Go to your repository → **"Actions"** tab
   - You should see the workflow file listed
   - The next time you push to `main`, it will automatically deploy

2. **Test Deployment:**
   - Make a small change to any file
   - Commit and push to `main`:
     ```bash
     git add .
     git commit -m "Test deployment"
     git push origin main
     ```
   - Go to **Actions** tab to see the deployment progress
   - Once complete, check your Shopify store to see the changes

## Troubleshooting

**If deployment fails:**
- Check that all three secrets are correctly named (case-sensitive!)
- Verify the token has the correct permissions (`read_themes` and `write_themes`)
- Make sure the store domain doesn't include `https://` (just `yourstore.myshopify.com`)
- Verify the theme ID is correct (should be a number)

**If you need to update a secret:**
- Go to **Settings** → **Secrets and variables** → **Actions**
- Click on the secret name
- Click **"Update"** to change the value

---

**Ready to deploy!** 🚀

Once secrets are configured, every push to `main` will automatically update your Shopify theme.
