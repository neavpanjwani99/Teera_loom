---
name: KalaLink
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#57423b'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#8a726a'
  outline-variant: '#dec0b7'
  surface-tint: '#a23e18'
  primary: '#9f3c16'
  on-primary: '#ffffff'
  primary-container: '#bf542c'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59c'
  secondary: '#485f84'
  on-secondary: '#ffffff'
  secondary-container: '#bbd3fd'
  on-secondary-container: '#445a7f'
  tertiary: '#805200'
  on-tertiary: '#ffffff'
  tertiary-container: '#a06901'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#822801'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#b0c7f1'
  on-secondary-fixed: '#001b3c'
  on-secondary-fixed-variant: '#30476a'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#feb956'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
  label-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies a warm, tactile, and dignity-first visual language tailored for Indian artisans, self-help groups (SHGs), and craftspeople navigating formal welfare schemes and digital commerce. Supported by Government of India welfare initiatives, it merges civic trustworthiness with the warmth of Indian vernacular craft traditions—terracotta kilns, natural indigo vats, brasswork, and handloom textures.

The interface prioritizes accessibility for first-time digital and low-literacy users through:
- **Icon-First Visual Communication:** Critical actions pair universal iconography and color-coding with concise bilingual text (Hindi and English).
- **Physical Affordance & Tactility:** Cards and interactive elements evoke tactile paperboard, handwoven swatches, and pressed clay seals rather than cold digital glass.
- **Empowering Dignity:** Moving away from bureaucratic or clinical government portals toward an inviting, celebratory, and culturally resonant space that treats artisans as master creators.

## Colors

The palette draws directly from native artisan materials and Indian mineral dyes, balanced with high-contrast functional roles that exceed WCAG 2.1 AAA standards for text and interactive controls.

- **Primary (Terracotta / #C85A32):** Used for primary call-to-action buttons, key progress anchors, active navigation indicators, and vital status badges.
- **Secondary (Deep Indigo / #1D3557):** Provides institutional authority, deep structural framing, high-contrast headings, and navigational bars.
- **Tertiary (Golden Ochre / #E09F3E):** Highlights scheme grants, verification seals, festive incentives, and actionable notifications.
- **Semantic Accents:**
  - *Forest Green (#2A9D8F):* Success states, payment approvals, verified artisan credentials, and welfare disbursement confirmations.
  - *Sienna Alert (#B02A37):* Errors, required missing documentation, and warnings.
- **Backgrounds & Surfaces:**
  - *Base Canvas (#FAF7F2):* Warm unbleached linen tone reducing glare in bright outdoor environments.
  - *Surface Raised (#FFFFFF):* Crisp white for cards and modal sheets, providing stark contrast against the cream background.
  - *Surface Subdued (#F5EFEB):* Container borders, input backings, and inactive segments.

## Typography

Typography relies uniformly on **Noto Sans** across all scripts to guarantee flawless rendering across both Devanagari and Latin character sets. 

- **Optical Balance:** Noto Sans provides tall x-heights, open counters, and unambiguous letterforms critical for users with lower digital literacy or those using affordable low-resolution Android smartphones.
- **Bilingual Stacking:** Where bilingual labels are rendered (e.g., "पंजीकरण करें / Register"), Devanagari is positioned primarily with `font-weight: 600` or `700`, followed by English in `font-weight: 500` at a slight optical scale ratio (0.875x) to maintain equal visual presence.
- **Avoidance of Light Weights:** Weights under 400 are strictly omitted across the design system to ensure total legibility against tinted and textured backgrounds in outdoor conditions.

## Layout & Spacing

The layout is built around a dynamic fluid grid designed first for 360dp–412dp Android devices, scaling systematically to tablets and kiosk desktops.

- **Mobile (Base):** Single-column presentation, 16px (`margin`) outer screen margins, with an 8px vertical rhythm. Content-heavy cards span full width to eliminate lateral visual noise.
- **Tablet & Kiosk (600px - 1023px):** 6-column grid with 24px gutters, enabling side-by-side artisan photo documentation and form verification checklists.
- **Desktop & Administration (1024px+):** 12-column fixed-max layout (1200px container) with 32px gutters and generous outer margins (`margin-desktop`).
- **Touch Target Enclosure:** Interactive items enforce a non-negotiable minimum bounding area of 56px vertically on mobile devices, ensuring effortless thumb taps even in rugged conditions.

## Elevation & Depth

Visual hierarchy does not use sterile neutral gray shadows; instead, it relies on warm, tinted ambient drop-shadows inspired by earthen objects resting on woven fabric.

- **Surface Level 0 (Canvas):** Flat `#FAF7F2` linen background.
- **Surface Level 1 (Static Cards & Containers):** `#FFFFFF` surface with a delicate 1px perimeter border in `#E8DEC8` and an ambient shadow: `box-shadow: 0 2px 8px -2px rgba(108, 60, 32, 0.08)`.
- **Surface Level 2 (Interactive Cards & Floating Trays):** `#FFFFFF` surface elevated with dual ambient warmth: `box-shadow: 0 4px 16px -4px rgba(70, 35, 15, 0.12), 0 2px 4px -1px rgba(70, 35, 15, 0.04)`.
- **Surface Level 3 (Modals, Voice Overlays, Bottom Sheets):** Elevated with a supportive backdrop tint (`rgba(29, 53, 87, 0.45)`) and a deep grounding shadow: `box-shadow: 0 12px 32px -6px rgba(38, 70, 83, 0.20)`.
- **Tactile Stamp Depth:** Verified certificates, GI (Geographical Indication) tags, and government welfare seals use a 1px inset ring with a subtle terracotta drop shadow to simulate a physical brass seal.

## Shapes

The shape system employs rounded corners (corresponding to 16px / `rounded-2xl` on cards and key elements) that channel hand-formed clay tablets, pottery contours, and river-smoothed stones.

- **Containers & Cards:** Styled with `rounded-2xl` (16px) to maintain a soft, friendly, and non-threatening aesthetic.
- **Primary Buttons & Action Triggers:** Standardized at 12px to 16px border-radius, avoiding razor-sharp edges without using slippery hyper-pill silhouettes.
- **Badges & Stamps:** Feature soft 8px radii, occasionally paired with traditional Indian scalloped or stitched border treatments for GI-tagged artisan authenticity certificates.

## Components

### Buttons
- **Primary Action (Scheme Apply / Submit / Call):** Height 56px minimum. Solid Terracotta (`#C85A32`) fill with crisp `#FFFFFF` bold text. Accompanied by a leading 24px icon. Active state depresses slightly by 1px with deepened shade (`#A84522`).
- **Secondary Action:** Indigo outline (`#1D3557`, 2px width) over white surface with Indigo text.
- **Audio Assistance Trigger:** Floating or inline circular/pill button in Golden Ochre (`#E09F3E`) featuring a high-contrast speaker icon that reads any card or instruction aloud in the selected regional dialect.

### Input Fields & Selectors
- Minimum touch height of 56px with 16px horizontal internal padding.
- 2px border in `#D4C7B5`, moving to a prominent 2.5px Terracotta `#C85A32` focus ring.
- Persistent visual icons alongside labels (e.g., Aadhaar card icon, phone icon, rupee symbol) to assist low-literacy identification.

### Artisan Scheme & Craft Cards
- `rounded-2xl` white surfaces featuring a warm 1px border (`#E8DEC8`).
- Header displays a distinct craft iconography badge alongside scheme eligibility flags (e.g., "PM Vishwakarma Approved").
- Prominent status indicator banner on the top edge (Green `#2A9D8F` for Sanctioned, Ochre `#E09F3E` for Under Review).

### Chips & Badges
- **Status Chips:** Height 36px, `rounded-lg` (8px), padding 6px 12px. Bold text paired with status dots (e.g., Handloom Mark, Zari Work, Woodcarving).
- **Filter Chips:** Off-white background with a 1.5px border, switching to solid Deep Indigo `#1D3557` with white text when selected.

### Bilingual Audio Assist List Items
- Stacked item cells (min height 64px) with high-contrast text, clear secondary status subtitles, and an immediate right-aligned "Play Audio" (`सुनें`) button to support pre-literate navigation.