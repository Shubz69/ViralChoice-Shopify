# 🚀 ViralChoice Theme - Upload Instructions

## Quick Start Guide

### Step 1: Prepare Your Files

All theme files are ready in this folder. The structure is:
```
Shopify Website/
├── assets/          (CSS & JS files)
├── config/          (Theme settings)
├── layout/          (Main theme layout)
├── locales/         (Translations)
├── sections/        (Page sections)
├── snippets/        (Reusable components)
└── templates/       (Page templates)
```

### Step 2: Upload to Shopify

#### **Method A: GitHub Integration (Recommended)**

1. **Create a GitHub Repository:**
   - Go to GitHub.com and create a new repository
   - Name it something like `viralchoice-shopify-theme`
   - Make it private or public (your choice)

2. **Push Your Code:**
   ```bash
   cd "C:\Users\1230s\OneDrive\Documents\Shubz\Shopify Website"
   git init
   git add .
   git commit -m "Initial ViralChoice theme"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Connect to Shopify:**
   - Log into your Shopify Admin
   - Go to: **Online Store → Themes**
   - Click **"Add theme"** → **"Connect from GitHub"**
   - Authorize Shopify to access your GitHub
   - Select your repository and branch (usually `main`)
   - Click **"Connect theme"**

4. **Deploy:**
   - Your theme will appear in the themes list
   - Click **"Actions"** → **"Preview"** to see it
   - Click **"Actions"** → **"Publish"** to make it live

#### **Method B: ZIP Upload (Alternative)**

1. **Create ZIP File:**
   - Select ALL files and folders in this directory
   - Right-click → **"Send to"** → **"Compressed (zipped) folder"**
   - Name it `viralchoice-theme.zip`

2. **Upload to Shopify:**
   - Log into your Shopify Admin
   - Go to: **Online Store → Themes**
   - Click **"Add theme"** → **"Upload theme"**
   - Select your `viralchoice-theme.zip` file
   - Click **"Upload"**

3. **Activate:**
   - Once uploaded, click **"Actions"** → **"Publish"** to make it live

### Step 3: Customize Your Theme

1. **Go to Theme Editor:**
   - In Shopify Admin: **Online Store → Themes**
   - Click **"Customize"** on your ViralChoice theme

2. **Edit Homepage Sections:**
   - **Hero Section**: Update headline, subheadline, and CTA button
   - **Featured Product**: Select which product to feature
   - **Why Section**: Customize the 3 selling points
   - **Trust Strip**: Already configured (no changes needed)

3. **Configure Navigation:**
   - Go to: **Online Store → Navigation**
   - Create a main menu with links to:
     - Home (/)
     - Products (/products)
     - About (if you have a page)
   - Assign it to the header section in theme editor

4. **Add Your Products:**
   - Go to: **Products → Add product**
   - Add your TurboScrub product (or any other products)
   - The product page will automatically use the new design

### Step 4: Test Everything

✅ **Check Homepage:**
- Hero section displays correctly
- Trust badges show up
- Featured product appears
- Why section is visible

✅ **Check Product Page:**
- Product images display
- Add to cart button works
- FAQ accordion expands/collapses
- Trust badges appear
- On mobile: sticky add-to-cart bar appears when scrolling

✅ **Test Mobile:**
- View on phone or use browser dev tools
- Check that sticky CTA appears on scroll
- Verify all sections are responsive

✅ **Test Add to Cart:**
- Add a product to cart
- Verify cart updates correctly
- Test checkout flow (should work normally)

## 📁 Files Created/Modified

### Core Files:
- ✅ `layout/theme.liquid` - Main theme layout
- ✅ `assets/viralchoice.css` - All brand styles & variables
- ✅ `assets/viralchoice.js` - Interactive features
- ✅ `assets/global.js` - Basic global JS

### Sections (Homepage):
- ✅ `sections/header.liquid` - Navigation header
- ✅ `sections/footer.liquid` - Footer
- ✅ `sections/vc-hero.liquid` - Hero section
- ✅ `sections/vc-trust-strip.liquid` - Trust badges strip
- ✅ `sections/vc-featured-product.liquid` - Featured product
- ✅ `sections/vc-why-section.liquid` - Why choose ViralChoice

### Sections (Product Page):
- ✅ `sections/main-product.liquid` - Enhanced product page

### Snippets:
- ✅ `snippets/vc-trust-badges.liquid` - Reusable trust badges
- ✅ `snippets/meta-tags.liquid` - SEO meta tags

### Templates:
- ✅ `templates/index.json` - Homepage template
- ✅ `templates/product.json` - Product page template

### Config:
- ✅ `config/settings_schema.json` - Theme settings
- ✅ `locales/en.default.json` - English translations

## 🎨 Brand Colors (Already Configured)

- **Black**: `#0B0B0B`
- **Red**: `#E10600`
- **White**: `#FFFFFF`

All colors are defined in `assets/viralchoice.css` as CSS variables.

## ⚠️ Important Notes

1. **Checkout is NOT modified** - Shopify checkout remains unchanged
2. **No third-party apps required** - Everything is built-in
3. **Mobile-first design** - Fully responsive
4. **Lightweight** - No heavy frameworks, fast loading

## 🐛 Troubleshooting

**Theme won't upload?**
- Make sure you're uploading the ZIP of the folder contents, not the folder itself
- Check that all required files are included

**Sections not showing?**
- Make sure sections are added in the template JSON files
- Check theme editor to see if sections are enabled

**Styles not working?**
- Verify `viralchoice.css` is loaded in `layout/theme.liquid`
- Check browser console for errors

**Add to cart not working?**
- Verify product has variants configured correctly
- Check that form uses Shopify's standard product form structure

## 📞 Next Steps

1. ✅ Upload theme to Shopify
2. ✅ Customize content in theme editor
3. ✅ Add your products
4. ✅ Configure navigation menu
5. ✅ Test on mobile
6. ✅ Publish when ready!

---

**Need help?** Check the main `README.md` for more detailed information.
