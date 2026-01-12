# ViralChoice Shopify Theme

A premium, conversion-focused Shopify theme for viral products, built with Red/Black/White brand colors and modern, interactive UI elements.

## 🎨 Brand Colors

- **Primary Black**: `#0B0B0B`
- **Primary Red**: `#E10600`
- **White**: `#FFFFFF`
- **Grey Borders**: `rgba(0, 0, 0, 0.10)`

## 📁 Theme Structure

```
Shopify Website/
├── assets/
│   ├── viralchoice.css      # Main brand styles with CSS variables
│   ├── viralchoice.js       # Interactive features (FAQ, sticky CTA, animations)
│   └── global.js            # Basic global JS
├── config/
│   └── settings_schema.json  # Theme settings
├── layout/
│   └── theme.liquid         # Main theme layout
├── locales/
│   └── en.default.json      # English translations
├── sections/
│   ├── header.liquid        # Header navigation
│   ├── footer.liquid        # Footer
│   ├── vc-hero.liquid       # Homepage hero section
│   ├── vc-trust-strip.liquid # Trust badges strip
│   ├── vc-featured-product.liquid # Featured product section
│   ├── vc-why-section.liquid # Why choose ViralChoice section
│   └── main-product.liquid  # Enhanced product page
├── snippets/
│   ├── vc-trust-badges.liquid # Reusable trust badges component
│   └── meta-tags.liquid     # Meta tags snippet
└── templates/
    ├── index.json           # Homepage template
    └── product.json         # Product page template
```

## 🚀 How to Upload to Shopify

### Option 1: Using GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial ViralChoice theme"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Shopify:**
   - Go to your Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Connect from GitHub"
   - Authorize Shopify to access your GitHub account
   - Select your repository and branch
   - Click "Connect theme"

3. **Deploy:**
   - Once connected, changes pushed to GitHub will automatically sync to Shopify
   - You can preview and publish from the Shopify admin

### Option 2: Manual Upload (ZIP)

1. **Create a ZIP file:**
   - Select all theme files and folders
   - Compress into a ZIP file (not RAR)

2. **Upload to Shopify:**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Upload theme"
   - Select your ZIP file
   - Click "Upload"

3. **Activate:**
   - Once uploaded, click "Actions" → "Publish" to make it live

## 🚀 Automated Deployment (GitHub Actions)

This repository includes GitHub Actions for automatic deployment to Shopify on every push to the `main` branch.

### Setup GitHub Secrets

Before the workflow can deploy, you need to configure three GitHub Secrets:

1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"** and add the following secrets:

#### Required Secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SHOPIFY_FLAG_STORE` | Your Shopify store domain | `yourstore.myshopify.com` |
| `SHOPIFY_FLAG_THEME_ID` | Your Shopify theme ID | `123456789012` |
| `SHOPIFY_CLI_THEME_TOKEN` | Shopify Admin API token | See instructions below |

### How to Obtain Shopify Admin API Token

1. **Go to Shopify Admin:**
   - Log into your Shopify store admin panel
   - Navigate to: **Settings** → **Apps and sales channels** → **Develop apps**

2. **Create a New App:**
   - Click **"Create an app"**
   - Name it (e.g., "GitHub Actions Deploy")
   - Click **"Create app"**

3. **Configure API Scopes:**
   - Click **"Configure Admin API scopes"**
   - Under **"Themes"**, check:
     - ✅ `read_themes`
     - ✅ `write_themes`
   - Click **"Save"**

4. **Install the App:**
   - Click **"Install app"** at the top
   - Confirm installation

5. **Get the Access Token:**
   - After installation, you'll see **"API credentials"**
   - Copy the **"Admin API access token"** (starts with `shpat_...`)
   - This is your `SHOPIFY_CLI_THEME_TOKEN` value

6. **Add to GitHub Secrets:**
   - Paste this token as the value for `SHOPIFY_CLI_THEME_TOKEN` secret

### How to Find Your Shopify Theme ID

**Method 1: From Shopify Admin**
1. Go to **Online Store** → **Themes**
2. Click on the theme you want to deploy to
3. Look at the URL in your browser: `admin.shopify.com/store/YOURSTORE/themes/THEME_ID`
4. The `THEME_ID` is the number at the end (e.g., `193424818518`)

**Method 2: Using Shopify CLI**
```bash
shopify theme list --store yourstore.myshopify.com
```
This will list all themes with their IDs.

### How It Works

Once configured, the workflow will:
- ✅ Automatically trigger on every push to `main` branch
- ✅ Deploy your theme files to Shopify
- ✅ Preserve theme editor customizations (ignores `config/settings_data.json`)
- ✅ Safely deploy to live themes (uses `--allow-live` flag)

### Manual Deployment (Local)

If you want to deploy manually from your local machine:

1. **Install Shopify CLI:**
   ```bash
   npm install -g @shopify/cli@latest
   ```

2. **Authenticate:**
   ```bash
   shopify auth login
   ```

3. **Deploy to a specific theme:**
   ```bash
   shopify theme push --store yourstore.myshopify.com --theme THEME_ID --allow-live
   ```

4. **Or deploy to a development theme:**
   ```bash
   shopify theme push --store yourstore.myshopify.com --development
   ```

### Workflow File

The deployment workflow is located at:
```
.github/workflows/shopify-theme-deploy.yml
```

It uses:
- Node.js 20
- Shopify CLI (latest)
- Safe deployment flags (`--allow-live`, `--ignore config/settings_data.json`)

## ✨ Features

### Homepage
- **Hero Section**: Eye-catching headline with CTA button
- **Trust Strip**: 4 trust badges (Trending & Tested, Secure Checkout, Fast Shipping, 30-Day Guarantee)
- **Featured Product**: Showcase your main product
- **Why Section**: 3 key selling points

### Product Page
- **Enhanced Layout**: Clean, conversion-focused design
- **Trust Badges**: Integrated trust signals
- **FAQ Accordion**: Expandable shipping, returns, and guarantee info
- **Sticky Mobile CTA**: Add-to-cart button that appears on scroll (mobile only)
- **Image Gallery**: Product images with hover zoom effect

### Interactive Elements
- **Smooth Animations**: Scroll reveal animations for sections
- **Hover Effects**: Button lift, image zoom
- **Sticky Header**: Navigation stays visible on scroll
- **Mobile Optimized**: Responsive design with mobile-first approach

## 🎯 Customization

### Edit Brand Colors
All colors are defined in `assets/viralchoice.css` as CSS variables:
```css
:root {
  --vc-black: #0B0B0B;
  --vc-red: #E10600;
  --vc-white: #FFFFFF;
}
```

### Edit Homepage Content
1. Go to Shopify Admin → Online Store → Themes
2. Click "Customize" on your theme
3. Edit sections in the theme editor:
   - Hero section: Update headline, subheadline, and CTA
   - Featured Product: Select which product to feature
   - Why Section: Customize the 3 selling points

### Edit Product Page
The product page uses the `main-product` section. You can customize:
- FAQ questions and answers (edit directly in `sections/main-product.liquid`)
- Trust badges (edit `snippets/vc-trust-badges.liquid`)

## 📱 Mobile Features

- Sticky add-to-cart bar appears when user scrolls past main button
- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized typography scaling

## ⚠️ Important Notes

- **Checkout**: This theme does NOT modify Shopify checkout or payment flow
- **No Third-Party Apps**: All functionality is built-in
- **Vanilla JS Only**: No external libraries, keeping it lightweight
- **Shopify 2.0 Compatible**: Uses Online Store 2.0 section architecture

## 🔧 Technical Details

- **CSS Variables**: Single source of truth for brand styles
- **Section-Based**: All homepage sections are customizable via Shopify theme editor
- **Accessible**: Includes focus states and proper semantic HTML
- **Fast**: Lightweight CSS/JS, no heavy frameworks

## 📝 Next Steps

1. Upload the theme to Shopify
2. Customize content in the theme editor
3. Add your products
4. Configure navigation menu (Settings → Navigation)
5. Test on mobile devices
6. Publish when ready!

## 🆘 Support

If you need to make changes:
- **Content**: Use Shopify theme editor (no code needed)
- **Styling**: Edit `assets/viralchoice.css`
- **Functionality**: Edit `assets/viralchoice.js`
- **Sections**: Edit files in `sections/` folder

---

**Built for ViralChoice** 🚀
