# 📖 How to Add & Manage Designs in SreeStar

This guide outlines how to add new blouse, frock, kurti, churidar, and 90s collection designs to the SreeStar website without modifying code.

---

## 3 Easy Ways to Add Designs

### Method 1: Via Sanity Studio UI (Recommended for daily additions)

1. **Access the CMS Studio**:
   - Go to `http://localhost:3000/studio` (or your deployed Vercel domain `/studio`).
   - Log in with your authorized Google or Sanity credentials.

2. **Create a New Design**:
   - Click **Tailoring Design** in the left sidebar.
   - Click the **+ Create** button in the top right.

3. **Fill in Design Information**:
   - **Design Code**: Unique identifier like `D-0501` (customers reference this when booking on WhatsApp).
   - **Design Title**: E.g., *Royal Peacock Zardosi Bridal Maggam Blouse*.
   - **Category**: Select category (Bridal Blouses, Grand Blouses, Frocks, Kurtis, Churidars, or 90s Collection).
   - **Image**: Upload a clear vertical portrait photo. Click the image to set the **Hotspot** (ensures embroidery focus on mobile screens).
   - **Tags**: Add search keywords like `bridal`, `maggam`, `zardosi`, `velvet`.
   - **Fabric Options**: Check suitable fabrics (Pure Raw Silk, Velvet, Organza, etc.).
   - **Checkboxes**:
     - *Mark as New Arrival*: Adds "New" badge in collection grid.
     - *Mark as Trending*: Displays in "Trending Now" filter.
     - *Feature on Homepage*: Displays on the Hero staggered wall.

4. **Click Publish**:
   - The website updates instantly via Next.js ISR (Incremental Static Regeneration).

---

### Method 2: Bulk Upload 50+ Images at Once

If you have taken photographs of 50 to 500 finished blouses and garments:

1. **Name Your Photos using the Design Code**:
   - Example:
     - `D-0104-bridal-peacock-maggam.webp`
     - `D-0105-lotus-kundan-velvet.webp`
     - `D-0412-grand-party-frock.webp`

2. **Run the Automated Catalog Importer**:
   ```bash
   node scripts/bulk-upload-designs.mjs
   ```

3. **Import Directly into Sanity Dataset**:
   ```bash
   npx sanity dataset import data/catalog-500-designs.ndjson production --replace
   ```

---

### Method 3: Local JSON Mode (Zero API Keys Needed)

If you are running the website locally or offline:
- Open [`data/catalog-500-designs.json`](file:///Users/subarshan/SreeStar/data/catalog-500-designs.json).
- Add or modify any design entry. The website automatically reads this fallback catalog when Sanity credentials are not set in `.env.local`.

---

## 📐 Image Quality & Aspect Ratio Guidelines

- **Orientation**: Vertical portrait (aspect ratio ~3:4 or 4:5, e.g. 1200x1600px).
- **Format**: WebP or JPG (under 800KB).
- **Styling Rule**: **Women's wear only.** Do not showcase sarees as the product — sarees should only appear as styling drape around the blouse.
- **Lighting**: Soft studio lighting focusing on embroidery craftsmanship, back-neck cuts, and sleeve borders.
