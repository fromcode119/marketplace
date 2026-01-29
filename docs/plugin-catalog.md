# Fromcode CMS - Complete Plugin Catalog

**Version:** 1.0.0  
**Last Updated:** January 29, 2026  
**Total Plugins:** 23 (21 production-ready, 2 infrastructure)

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Plugin Categories](#plugin-categories)
3. [Core Plugins](#core-plugins)
4. [E-commerce Plugins](#e-commerce-plugins)
5. [Content Management Plugins](#content-management-plugins)
6. [Marketing & Growth Plugins](#marketing--growth-plugins)
7. [Utility & Infrastructure Plugins](#utility--infrastructure-plugins)
8. [Specialized Business Logic](#specialized-business-logic)
9. [Dependency Graph](#dependency-graph)
10. [Plugin Architecture Standards](#plugin-architecture-standards)
11. [Future Roadmap](#future-roadmap)

---

## System Overview

Fromcode CMS is built on Fromcode Framework with a fully modular plugin architecture. Each plugin is self-contained with its own:

- **Collections** - Database models and admin UI (registered via `context.collections.register`)
- **Globals** - Site-wide configuration
- **Migrations** - Database schema versioning
- **Seeds** - Default data and examples
- **Library Functions** - Reusable business logic
- **API Endpoints** - Custom REST routes (registered via `context.api`)

**Key Statistics:**
- 📦 **23 Total Plugins** (planned)
- 🗄️ **77+ Collections**
- 🌍 **18+ Global Configurations**
- 🔗 **Fully Dependency-Managed**
- ✅ **In Development**

---

## Plugin Categories

### 1. Core & Infrastructure (3 plugins)
Foundation plugins that power the entire system.

- `core` - System kernel, migrations, plugin registry
- `themes` - Multi-theme support and hot-swapping
- `marketplace` - Plugin distribution infrastructure

### 2. E-commerce Suite (6 plugins)
Complete online store functionality.

- `catalog` - Product management (physical/digital/courses/services)
- `ecommerce` - Orders, carts, payments, invoices
- `finance` - Wallets, transactions, gift cards
- `tax` - Tax categories and calculation rules
- `logistics` - Shipping zones, methods, tracking
- `mlm` - Multi-level marketing and commissions

### 3. Content Management (2 plugins)
Flexible CMS for pages, posts, and media.

- `cms` - Pages, posts, navigation, categories, tags, widgets
- `seo` - Meta tags, OpenGraph, analytics fields

### 4. Learning Management (1 plugin)
Full-featured online course platform.

- `lms` - Courses, lessons, enrollments, quizzes, certificates

### 5. Marketing & Engagement (5 plugins)
Tools for customer acquisition and retention.

- `social-proof` - Reviews, testimonials, activity notifications
- `interaction` - Comments, reviews, notifications
- `search` - Faceted search with MeiliSearch/ElasticSearch
- `forms` - Form builder with ReCAPTCHA
- `sitemap` - Multi-locale XML sitemap generation

### 6. Compliance & Security (3 plugins)
Enterprise-grade security and privacy tools.

- `privacy` - GDPR tools, consent logs, data export/anonymization
- `security` - 2FA, session management, audit logs, IP blacklisting
- `licensing` - Domain-bound license key verification

### 7. Support & Communication (1 plugin)
Customer support infrastructure.

- `support` - Contact forms, redirects, email templates

### 8. Specialized Business Logic (2 plugins)
Custom vertical-specific features.

- `numerology` - Calculation engine, interpretations, PDF reports
- `test-feature` - Testing/development plugin

---

## Core Plugins

### 🔧 Core Plugin

**Slug:** `core`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** None  
**Priority:** 1 (loads first)

**Purpose:**  
The foundation of Fromcode CMS. Manages plugin lifecycle, migrations, currencies, and system-wide settings.

**Collections:**
- `Currencies` - Multi-currency support with exchange rates
- `Plugins` (via system-plugins) - Plugin registry and status tracking
- `TrustedPublishers` - Marketplace security and signing

**Globals:**
- `CurrencySettings` - Default currency configuration
- `SiteSettings` - Site name, contact info, social media
- `SystemSettings` - SEO, analytics, advanced config
- `UpdateSettings` - Version checking and update notifications

**Key Features:**
- 🔄 **Migration Manager** - Per-plugin versioned migrations with rollback
- 🔌 **Plugin Registry** - Auto-discovery and dynamic loading
- 📦 **Marketplace Kernel** - ZIP upload, validation, activation
- 💱 **Currency System** - 160+ currencies with exchange rates
- 🔔 **Update Checker** - Automatic version comparison

**API Endpoints:**
- `POST /api/plugins/sync-migrations/:id` - Manual migration sync
- `POST /api/plugins/upload` - Upload plugin ZIP file
- `GET /api/currency/convert` - Exchange rate conversion

**File Structure:**
```
core/
├── index.ts
├── plugin.json
├── registry.ts
├── README.md
├── collections/
│   ├── Currencies.ts
│   ├── Plugins.ts
│   └── TrustedPublishers.ts
├── globals/
│   ├── CurrencySettings.ts
│   ├── SiteSettings.ts
│   ├── SystemSettings.ts
│   └── UpdateSettings.ts
├── endpoints/
│   └── syncMigrations.ts
├── lib/
│   ├── migration-manager.ts
│   ├── dependency-sorter.ts
│   └── plugin-loader.ts
├── migrations/
│   └── 20250101_000000_initial.ts
└── seeds/
    └── currencies.ts
```

---

### 🎨 Themes Plugin

**Slug:** `themes`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** None  
**Priority:** 10

**Purpose:**  
Enable multiple frontend themes with hot-swapping capabilities.

**Globals:**
- `ThemeManager` - Active theme selection and configuration

**Key Features:**
- 🎨 **Multi-Theme Support** - Switch themes without code changes
- 🔥 **Hot-Swapping** - Apply theme changes immediately
- ⚙️ **Theme Configuration** - Per-theme settings storage
- 📱 **Responsive Themes** - Mobile-first design support

**File Structure:**
```
themes/
├── index.ts
├── plugin.json
├── globals/
│   └── ThemeManager.ts
├── lib/
│   └── theme-resolver.ts
└── components/
    └── ThemeSwitcher.tsx
```

---

### 📦 Marketplace Plugin

**Slug:** `marketplace`  
**Version:** 1.0.0  
**Status:** 🔄 Infrastructure Only  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 5

**Purpose:**  
Plugin distribution infrastructure. Most functionality handled by Core plugin.

**Note:** This plugin provides the directory structure for uploaded marketplace plugins but does not have active collections. The Core plugin manages all marketplace operations.

---

## E-commerce Plugins

### 🛍️ Catalog Plugin

**Slug:** `catalog`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 30

**Purpose:**  
Comprehensive product catalog supporting multiple product types with variants, addons, and discounts.

**Collections:**
- `Products` - Physical, digital, course, and service products
- `ProductAddons` - Cross-sells and upsells
- `DiscountCodes` - Coupons and promotional codes
- `ProductCollections` - Product grouping and categories

**Key Features:**
- 📦 **Multi-Type Products** - Physical, digital, courses, services
- 🎁 **Product Variants** - Size, color, attributes
- ➕ **Addons System** - Cross-sells and bundles
- 💰 **Discount Codes** - Percentage and fixed amount
- 🗂️ **Collections** - Organized product grouping
- 🖼️ **Media Gallery** - Multiple product images
- 📊 **Inventory Tracking** - Stock management

**Product Types:**
1. **Physical** - Tangible goods requiring shipping
2. **Digital** - Downloadable files (ebooks, software)
3. **Course** - LMS integration for online learning
4. **Service** - Bookings and appointments

**File Structure:**
```
catalog/
├── index.ts
├── plugin.json
├── README.md
├── collections/
│   ├── Products.ts
│   ├── ProductAddons.ts
│   ├── DiscountCodes.ts
│   └── ProductCollections.ts
├── lib/
│   └── product-helpers.ts
└── migrations/
    └── 20250101_000003_catalog.ts
```

---

### 💳 E-commerce Plugin

**Slug:** `ecommerce`  
**Version:** 1.2.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`, `catalog: ^1.0.0`  
**Priority:** 40

**Purpose:**  
Complete e-commerce solution with order management, cart functionality, payment processing, and invoicing.

**Collections:**
- `Orders` - Customer orders with line items
- `Transactions` - Payment records and history
- `PaymentMethods` - Stripe, PayPal, bank transfer, etc.
- `Invoices` - Manual and auto-generated invoices
- `Carts` - Session-based shopping carts

**Globals:**
- `InvoiceSettings` - Invoice numbering and templates
- `CartSettings` - Cart expiry and behavior

**Key Features:**
- 🛒 **Shopping Cart** - Session-based with item management
- 📋 **Order Management** - Full lifecycle tracking
- 💰 **Payment Processing** - Stripe integration + extensible
- 🧾 **Advanced Invoicing** - Manual mode, net/gross prices, multi-currency
- 📊 **Transaction History** - Complete audit trail
- 🔄 **Order Status Workflow** - Pending → Paid → Processing → Shipped → Completed
- 💱 **Multi-Currency Support** - Exchange rate calculation

**Invoice Features:**
- Manual mode override for custom invoices
- Bidirectional net/gross price calculation
- Exchange rate snapshot at creation time
- Customer and item data preservation
- PDF generation ready

**File Structure:**
```
ecommerce/
├── index.ts
├── plugin.json
├── collections/
│   ├── Orders.ts
│   ├── Transactions.ts
│   ├── PaymentMethods.ts
│   ├── Invoices.ts
│   └── Carts.ts
├── globals/
│   ├── InvoiceSettings.ts
│   └── CartSettings.ts
├── lib/
│   ├── payment-processor.ts
│   └── invoice-generator.ts
└── assets/
    └── invoice-template.html
```

---

### 💼 Finance Plugin

**Slug:** `finance`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 20

**Purpose:**  
Digital wallet system, transaction recording, and gift card management.

**Collections:**
- `Wallets` - User balance tracking
- `WalletTransactions` - Credit/debit history
- `GiftCards` - Prepaid gift card codes

**Globals:**
- `FinancialReports` - System-wide financial analytics

**Key Features:**
- 👛 **User Wallets** - Individual balance management
- 📝 **Transaction Logging** - Complete audit trail
- 🎁 **Gift Card System** - Code generation and redemption
- 💸 **Balance Transfers** - User-to-user transfers
- 📊 **Financial Reports** - Revenue and transaction analytics
- 🔒 **Transaction Security** - Double-entry accounting

**Helper Functions:**
```typescript
recordTransaction(userId, amount, type, description)
getWalletBalance(userId)
redeemGiftCard(code, userId)
```

**File Structure:**
```
finance/
├── index.ts
├── plugin.json
├── collections/
│   ├── Wallets.ts
│   ├── WalletTransactions.ts
│   └── GiftCards.ts
├── globals/
│   └── FinancialReports.ts
└── lib/
    └── transaction-helpers.ts
```

---

### 🧮 Tax Plugin

**Slug:** `tax`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 90

**Purpose:**  
Tax category management and rule-based calculation for e-commerce transactions.

**Collections:**
- `TaxCategories` - Product tax classifications
- `TaxRules` - Region-based tax rates

**Key Features:**
- 📋 **Tax Categories** - Standard, reduced, zero-rated
- 🌍 **Regional Rules** - Country/state specific rates
- 🧮 **Automatic Calculation** - Applied at checkout
- 🇪🇺 **VAT Support** - EU tax compliance
- 🇺🇸 **Sales Tax** - US state tax rules

**Tax Rule Structure:**
- Country/region targeting
- Percentage-based rates
- Priority and override system
- Date-based activation

**File Structure:**
```
tax/
├── index.ts
├── plugin.json
├── collections/
│   ├── TaxCategories.ts
│   └── TaxRules.ts
└── lib/
    └── tax-calculator.ts
```

---

### 📦 Logistics Plugin

**Slug:** `logistics`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`, `ecommerce: ^1.0.0`  
**Priority:** 80

**Purpose:**  
Shipping zone management, multiple carrier support, and shipment tracking.

**Collections:**
- `ShippingZones` - Geographic region definitions
- `ShippingMethods` - Carrier services and rates
- `Shipments` - Tracking and fulfillment

**Key Features:**
- 🌍 **Shipping Zones** - Country/region based
- 📮 **Multiple Carriers** - Econt, Speedy, DHL, etc.
- 📍 **Office/Address Delivery** - Multiple delivery options
- 📦 **Shipment Tracking** - Carrier integration
- 💰 **Rate Calculation** - Weight/zone based pricing
- 🔗 **Order Integration** - Automatic shipment creation

**Carrier Integrations:**
- Econt (Bulgarian courier)
- Speedy (Bulgarian courier)
- Extensible for DHL, UPS, FedEx

**File Structure:**
```
logistics/
├── index.ts
├── plugin.json
├── collections/
│   ├── ShippingZones.ts
│   ├── ShippingMethods.ts
│   └── Shipments.ts
└── lib/
    ├── shipping-calculator.ts
    └── carrier-api.ts
```

---

### 🔺 MLM Plugin

**Slug:** `mlm`  
**Version:** 1.5.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`, `finance: ^1.0.0`  
**Priority:** 70

**Purpose:**  
Multi-level marketing system with partner management, commission calculation, and rank advancement.

**Collections:**
- `PartnerProfiles` - Affiliate/partner accounts
- `ProductRules` - Commission rules per product
- `Payouts` - Commission disbursements
- `RankAdvancements` - Partner level progression
- `AffiliateAssets` - Marketing materials
- `MlmTiers` - Multi-tier hierarchy

**Key Features:**
- 👥 **Partner Network** - Multi-level referral tree
- 💰 **Commission Engine** - Product-specific rules
- 📊 **Rank System** - Merit-based progression
- 💸 **Automated Payouts** - Scheduled commission payments
- 📈 **Performance Tracking** - Sales and referral analytics
- 🎨 **Marketing Assets** - Banner and promotional tools
- 🌳 **Tier Management** - Multiple downline levels

**Commission Types:**
- Percentage-based
- Fixed amount
- Tiered rates
- Volume bonuses

**File Structure:**
```
mlm/
├── index.ts
├── plugin.json
├── collections/
│   ├── PartnerProfiles.ts
│   ├── ProductRules.ts
│   ├── Payouts.ts
│   ├── RankAdvancements.ts
│   ├── AffiliateAssets.ts
│   └── MlmTiers.ts
└── lib/
    ├── commission-calculator.ts
    └── rank-processor.ts
```

---

## Content Management Plugins

### 📄 CMS Plugin

**Slug:** `cms`  
**Version:** 1.3.2  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 50

**Purpose:**  
Flexible content management with pages, posts, navigation, and reusable components.

**Collections:**
- `Pages` - Template-based page system
- `Posts` - Blog articles and news
- `Navigation` - Menu management
- `Categories` - Content taxonomy
- `Tags` - Content labeling
- `Widgets` - Reusable UI components
- `ReusableBlocks` - Content blocks
- `FAQs` - Question and answer database

**Globals:**
- `Footer` - Site-wide footer content

**Key Features:**
- 📝 **Page Builder** - Block-based composition
- 📰 **Blog System** - Posts with categories and tags
- 🗂️ **Navigation Builder** - Drag-and-drop menus
- 🧱 **Reusable Blocks** - DRY content management
- 🔍 **SEO Optimization** - Meta fields per content
- 🌐 **Multi-Language** - i18n ready
- 📋 **Template System** - Homepage, contact, generic, etc.
- ⚖️ **A/B Testing** - Traffic weight distribution

**Template Types:**
- `generic` - Standard page layout
- `homepage` - Landing page optimized
- `contact` - Contact form template
- `about` - Company information
- `landing` - Marketing campaigns

**Page Builder Blocks:**
- Hero sections
- Text content
- Image galleries
- CTA buttons
- Forms
- Product showcases
- Testimonials

**File Structure:**
```
cms/
├── index.ts
├── plugin.json
├── collections/
│   ├── Pages.ts
│   ├── Posts.ts
│   ├── Navigation.ts
│   ├── Categories.ts
│   ├── Tags.ts
│   ├── Widgets.ts
│   ├── ReusableBlocks.ts
│   └── FAQs.ts
├── globals/
│   └── Footer.ts
├── blocks/
│   ├── Hero.ts
│   ├── Content.ts
│   └── Gallery.ts
└── lib/
    └── block-renderer.ts
```

---

### 🎯 SEO Plugin

**Slug:** `seo`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 110

**Purpose:**  
Reusable SEO field groups for meta tags, OpenGraph, and analytics integration.

**Key Features:**
- 🏷️ **Meta Tags** - Title, description, keywords
- 📱 **OpenGraph** - Social media sharing
- 🐦 **Twitter Cards** - Twitter optimizations
- 📊 **Analytics Integration** - Google Analytics/Tag Manager
- 🔍 **Schema Markup** - Structured data support
- 🌐 **Canonical URLs** - Duplicate content handling

**Field Groups (Injected into Collections):**
- SEO title override
- Meta description
- OpenGraph image
- Twitter card type
- No-index flag

**Note:** Global SEO settings moved to `core/SystemSettings` in Phase 7 refactoring.

**File Structure:**
```
seo/
├── index.ts
├── plugin.json
├── fields/
│   ├── seo-fields.ts
│   └── opengraph-fields.ts
└── lib/
    └── meta-generator.ts
```

---

## Marketing & Growth Plugins

### 💬 Social Proof Plugin

**Slug:** `social-proof`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 120

**Purpose:**  
Display social proof notifications to build trust and urgency.

**Collections:**
- `SocialProof` - Activity notifications

**Globals:**
- `SocialProofSettings` - Display rules and timing

**Key Features:**
- 🔔 **Live Notifications** - "X purchased Y 5 minutes ago"
- ⚖️ **Weight-Based Display** - Priority system
- ⏱️ **Timing Control** - Display duration and intervals
- 🎯 **Targeted Display** - Page-specific rules
- 📊 **Conversion Boosting** - Trust signals

**Notification Types:**
- Recent purchases
- User registrations
- Product reviews
- Course enrollments

**File Structure:**
```
social-proof/
├── index.ts
├── plugin.json
├── collections/
│   └── SocialProof.ts
├── globals/
│   └── SocialProofSettings.ts
└── lib/
    └── notification-engine.ts
```

---

### 💬 Interaction Plugin

**Slug:** `interaction`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 100

**Purpose:**  
User engagement through comments, reviews, and notifications.

**Collections:**
- `Comments` - Thread-based discussion system
- `Reviews` - Product/course ratings
- `Notifications` - User alert system

**Key Features:**
- 💬 **Comment System** - Nested threading
- ⭐ **Review & Ratings** - 5-star with text
- 🔔 **Notification System** - Real-time alerts
- 🔒 **Moderation Tools** - Approve/reject content
- 👍 **Like/Dislike** - Engagement metrics
- 🚫 **Spam Protection** - Akismet integration

**File Structure:**
```
interaction/
├── index.ts
├── plugin.json
├── collections/
│   ├── Comments.ts
│   ├── Reviews.ts
│   └── Notifications.ts
└── lib/
    └── moderation-helpers.ts
```

---

### 🔍 Search Plugin

**Slug:** `search`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** None  
**Priority:** N/A

**Purpose:**  
Advanced faceted search with MeiliSearch or ElasticSearch integration.

**Collections:**
- `SearchIndex` - Indexed content records
- `SearchAnalytics` - Search query tracking

**Globals:**
- `SearchSettings` - Provider and configuration

**Key Features:**
- 🔎 **Faceted Search** - Filter by multiple attributes
- ⚡ **Fast Results** - MeiliSearch performance
- 📊 **Search Analytics** - Popular queries and trends
- 🔤 **Autocomplete** - Type-ahead suggestions
- 🌐 **Multi-Language** - Locale-aware search
- 🔄 **Auto-Indexing** - Content change hooks

**Searchable Collections:**
- Products
- Pages
- Posts
- Courses
- FAQs

**API Endpoints:**
- `GET /api/search?q=query` - Main search
- `GET /api/search/suggest?q=query` - Autocomplete

**File Structure:**
```
search/
├── index.ts
├── plugin.json
├── collections/
│   ├── SearchIndex.ts
│   └── SearchAnalytics.ts
├── globals/
│   └── SearchSettings.ts
└── lib/
    ├── meilisearch-client.ts
    └── indexer.ts
```

---

### 📝 Forms Plugin

**Slug:** `forms`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** None  
**Priority:** N/A

**Purpose:**  
No-code form builder with submission tracking and email notifications.

**Collections:**
- `Forms` - Form definitions
- `FormSubmissions` - Submitted data

**Key Features:**
- 🎨 **Drag-and-Drop Builder** - No coding required
- 🛡️ **ReCAPTCHA v3** - Spam protection
- 📧 **Email Notifications** - Auto-send on submission
- 📊 **Submission Management** - Admin UI for responses
- 📥 **CSV Export** - Data download
- ✅ **Validation Rules** - Required fields, patterns

**Field Types:**
- Text input
- Textarea
- Email
- Phone
- Select dropdown
- Radio buttons
- Checkboxes
- File upload

**API Endpoints:**
- `POST /api/forms/submit/:id` - Form submission
- `GET /api/forms/export/:id` - CSV export

**File Structure:**
```
forms/
├── index.ts
├── plugin.json
├── collections/
│   ├── Forms.ts
│   └── FormSubmissions.ts
└── lib/
    ├── form-builder.ts
    └── submission-handler.ts
```

---

### 🗺️ Sitemap Plugin

**Slug:** `sitemap`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `cms: *`, `catalog: *`  
**Priority:** N/A

**Purpose:**  
Automatic XML sitemap generation with multi-locale support.

**Globals:**
- `SitemapSettings` - Caching and exclusion rules

**Key Features:**
- 🗺️ **Auto-Generation** - Builds from all public content
- 🌐 **Multi-Language** - `/sitemap-en.xml`, `/sitemap-bg.xml`
- ⚡ **Caching** - TTL-based regeneration
- 🚫 **Exclusion Rules** - Hide specific pages
- 📊 **Priority Levels** - SEO importance weighting
- 🔄 **Change Frequency** - Update hints for crawlers

**Included Content Types:**
- Pages
- Posts
- Products
- Courses
- Categories

**API Endpoints:**
- `GET /api/sitemap.xml` - Main sitemap
- `GET /api/sitemap-en.xml` - English sitemap
- `GET /api/sitemap-bg.xml` - Bulgarian sitemap

**File Structure:**
```
sitemap/
├── index.ts
├── plugin.json
├── globals/
│   └── SitemapSettings.ts
└── lib/
    └── sitemap-generator.ts
```

---

## Utility & Infrastructure Plugins

### 🔐 Privacy Plugin

**Slug:** `privacy`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** None  
**Category:** Core  
**Priority:** N/A

**Purpose:**  
GDPR compliance tools including consent management, data export, and anonymization.

**Collections:**
- `ConsentLogs` - Cookie and privacy consent tracking
- `DataRequests` - GDPR export/deletion requests

**Globals:**
- `PrivacySettings` - Cookie banner and privacy policy

**Key Features:**
- 🍪 **Cookie Consent** - Granular consent tracking
- 📥 **Data Export** - GDPR right to access
- 🗑️ **Data Deletion** - Right to be forgotten
- 🔒 **Anonymization** - PII removal
- 📋 **Consent History** - Audit trail
- ⚖️ **Legal Compliance** - GDPR, CCPA ready

**Privacy Request Types:**
- Export user data (JSON)
- Delete account and data
- Anonymize historical records
- Consent withdrawal

**API Endpoints:**
- `POST /api/privacy/export/:userId` - Data export
- `POST /api/privacy/anonymize/:userId` - Anonymize user

**File Structure:**
```
privacy/
├── index.ts
├── plugin.json
├── collections/
│   ├── ConsentLogs.ts
│   └── DataRequests.ts
├── globals/
│   └── PrivacySettings.ts
└── lib/
    ├── data-exporter.ts
    └── anonymizer.ts
```

---

### 🔒 Security Plugin

**Slug:** `security`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: *`  
**Category:** Utility  
**Priority:** N/A

**Purpose:**  
Enterprise-grade security with 2FA, session management, and audit logging.

**Collections:**
- `AuditLogs` - Security event tracking
- `UserSessions` - Active session management

**Globals:**
- `SecuritySettings` - 2FA rules, IP restrictions

**Key Features:**
- 🔐 **Two-Factor Authentication** - TOTP (Google Authenticator)
- 👥 **Session Management** - Track active logins
- 📋 **Audit Logging** - All sensitive operations
- 🚫 **IP Blacklisting** - Block malicious IPs
- ✅ **IP Whitelisting** - Restrict admin access
- 🔒 **Account Locking** - Failed login protection
- 📊 **Security Dashboard** - Threat monitoring

**Extends Users Collection With:**
- `twoFactorEnabled` - 2FA status
- `twoFactorSecret` - TOTP seed
- `failedLoginAttempts` - Brute force counter
- `accountLocked` - Lock status
- `lastLoginIP` - Security tracking

**Audit Event Types:**
- Login attempts (success/failure)
- Password changes
- 2FA enable/disable
- Plugin installations
- Permission changes
- Data exports

**File Structure:**
```
security/
├── index.ts
├── plugin.json
├── collections/
│   ├── AuditLogs.ts
│   └── UserSessions.ts
├── globals/
│   └── SecuritySettings.ts
└── seeds/
    └── security-defaults.ts
```

---

### 🔑 Licensing Plugin

**Slug:** `licensing`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: *`  
**Category:** Utility  
**Priority:** N/A

**Purpose:**  
Domain-bound license key management for customer deployment verification.

**Collections:**
- `Licenses` - License key records

**Key Features:**
- 🔑 **License Generation** - Unique key creation
- 🌐 **Domain Binding** - Per-domain activation
- ⏰ **Expiry Management** - Time-based licenses
- 📊 **Status Tracking** - Active/expired/inactive
- 🔒 **Verification API** - Runtime license checks
- 👥 **Customer Management** - Multi-license support

**License Fields:**
- Key (unique identifier)
- Customer name/email
- Domain (locked to URL)
- Issue date
- Expiry date
- Status (active/inactive/expired)
- Max activations
- Current activations

**Helper Function:**
```typescript
checkLicense(domain: string): Promise<boolean>
```

**Use Cases:**
- White-label deployments
- Per-customer licensing
- Trial period enforcement
- Feature gating

**File Structure:**
```
licensing/
├── index.ts
├── plugin.json
├── collections/
│   └── Licenses.ts
└── seeds/
    └── example-license.ts
```

---

### 📞 Support Plugin

**Slug:** `support`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`  
**Priority:** 130

**Purpose:**  
Customer support infrastructure with contact forms, URL redirects, and email templates.

**Collections:**
- `ContactMessages` - Contact form submissions
- `Redirects` - 301/302 URL redirects
- `EmailTemplates` - Reusable email layouts

**Key Features:**
- 📧 **Contact Form** - Multi-field submission
- 🔄 **URL Redirects** - SEO-friendly redirects
- 📨 **Email Templates** - HTML email layouts
- 🎫 **Ticket Tracking** - Message status workflow
- 🔔 **Admin Notifications** - New message alerts

**Redirect Types:**
- 301 Permanent
- 302 Temporary
- Wildcard patterns
- Regex support

**Email Template Variables:**
- `{{customerName}}`
- `{{orderNumber}}`
- `{{siteName}}`
- `{{date}}`

**File Structure:**
```
support/
├── index.ts
├── plugin.json
├── collections/
│   ├── ContactMessages.ts
│   ├── Redirects.ts
│   └── EmailTemplates.ts
└── lib/
    └── redirect-middleware.ts
```

---

## Learning Management

### 🎓 LMS Plugin

**Slug:** `lms`  
**Version:** 1.1.0  
**Status:** ✅ Production Ready  
**Dependencies:** `core: ^1.0.0`, `catalog: ^1.0.0`  
**Priority:** 60

**Purpose:**  
Complete learning management system with courses, quizzes, progress tracking, and certificates.

**Collections:**
- `Courses` - Course definitions
- `Lessons` - Course content modules
- `Enrollments` - Student registrations
- `Quizzes` - Assessments and tests
- `StudentProgress` - Learning progress tracking
- `Certificates` - Completion certificates
- `Instructors` - Teacher profiles

**Key Features:**
- 📚 **Course Builder** - Multi-lesson structure
- 📝 **Quiz System** - Multiple choice, true/false
- 📊 **Progress Tracking** - Per-student analytics
- 🎓 **Certificate Generation** - Auto-issue on completion
- 👨‍🏫 **Instructor Profiles** - Teacher management
- 🔒 **Drip Content** - Scheduled lesson release
- ✅ **Prerequisites** - Course dependencies

**Enrollment Process:**
1. User purchases course (via Catalog)
2. Auto-enrollment triggered
3. Access granted to lessons
4. Progress tracked per lesson
5. Certificate issued on completion

**Quiz Types:**
- Multiple choice
- True/false
- Essay (manual grading)
- File upload

**File Structure:**
```
lms/
├── index.ts
├── plugin.json
├── collections/
│   ├── Courses.ts
│   ├── Lessons.ts
│   ├── Enrollments.ts
│   ├── Quizzes.ts
│   ├── StudentProgress.ts
│   ├── Certificates.ts
│   └── Instructors.ts
├── blocks/
│   ├── Video.ts
│   ├── Text.ts
│   └── Quiz.ts
└── lib/
    ├── enrollment-handler.ts
    └── certificate-generator.ts
```

---

## Specialized Business Logic

### 🔢 Numerology Plugin

**Slug:** `numerology`  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Dependencies:** `catalog: *`, `ecommerce: *`  
**Category:** Other  
**Priority:** N/A

**Purpose:**  
Bulgarian numerology calculation engine with interpretations database and automated PDF report generation. **Primary business feature** for the platform.

**Collections:**
- `NumerologyInterpretations` - Number meanings database
- `NumerologyCharts` - Calculated user charts
- `NumerologyReports` - Generated PDF reports

**Key Features:**
- 🔢 **Calculation Engine** - Life Path, Destiny, Soul, Personality numbers
- 📚 **Interpretations Database** - 200+ number meanings
- 📄 **PDF Report Generation** - Automated formatted reports
- 🛒 **E-commerce Integration** - Auto-create charts on order payment
- 🤖 **AI Integration** - Optional Ollama for enhanced interpretations
- 📊 **Chart Management** - Admin UI for all calculations

**Calculation Types:**
1. **Life Path Number** - Birth date reduction
2. **Destiny Number** - Full name calculation
3. **Soul Number** - Vowels only
4. **Personality Number** - Consonants only
5. **Birthday Number** - Day of birth
6. **Challenge Numbers** - Life obstacles
7. **Pinnacle Numbers** - Life periods

**API Endpoints:**
- `POST /api/numerology/calculate` - Generate chart
- `GET /api/numerology/report/:id` - Download PDF

**Ollama Integration:**
- Enhances interpretations with AI
- Optional feature (ENV: `OLLAMA_ENABLED=true`)
- Model: `deepseek-r1:14b`

**Business Workflow:**
1. User purchases numerology reading
2. Order marked as paid
3. `afterChange` hook triggers chart creation
4. Calculations performed
5. PDF report generated
6. Download link sent to user

**File Structure:**
```
numerology/
├── index.ts
├── plugin.json
├── README.md
├── collections/
│   ├── NumerologyInterpretations.ts
│   ├── NumerologyCharts.ts
│   └── NumerologyReports.ts
├── lib/
│   ├── numerology-engine.ts
│   ├── pdf-generator.ts
│   └── ollama-client.ts
├── components/
│   └── ChartDisplay.tsx
└── seeds/
    └── interpretations.ts
```

---

### 🧪 Test-Feature Plugin

**Slug:** `test-feature`  
**Version:** 1.0.0  
**Status:** 🧪 Test Only  
**Category:** Other

**Purpose:**  
Temporary plugin for testing the sync system and plugin infrastructure.

**Note:** Minimal implementation with no actual functionality. Used for development testing only.

**File Structure:**
```
test-feature/
├── index.ts
└── plugin.json
```

---

## Dependency Graph

### Visual Hierarchy

```
                            core (1)
                             │
                ┌────────────┼────────────┬─────────────┐
                │            │            │             │
             themes(10)  finance(20)  marketplace(5)  others
                            │
                         catalog(30)
                            │
                ┌───────────┼───────────┐
                │           │           │
           ecommerce(40)   lms(60)   numerology
                │
           logistics(80)

── Independent Plugins ───────────────────────────────────
cms(50), seo(110), support(130), social-proof(120),
tax(90), interaction(100), sitemap, privacy, search,
forms, security, licensing

── MLM Branch ────────────────────────────────────────────
finance(20) → mlm(70)
```

### Load Order (by Priority)

1. **core** (1) - Foundation
2. **marketplace** (5) - Plugin infrastructure
3. **themes** (10) - UI layer
4. **finance** (20) - Wallet system
5. **catalog** (30) - Product base
6. **ecommerce** (40) - Orders and payments
7. **cms** (50) - Content management
8. **lms** (60) - Learning system
9. **mlm** (70) - Affiliate network
10. **logistics** (80) - Shipping
11. **tax** (90) - Tax calculation
12. **interaction** (100) - User engagement
13. **seo** (110) - SEO fields
14. **social-proof** (120) - Trust signals
15. **support** (130) - Customer support

**Remaining plugins** load in parallel (no dependencies).

### Dependency Matrix

| Plugin | Depends On |
|--------|-----------|
| core | None |
| themes | None |
| marketplace | core |
| finance | core |
| catalog | core |
| ecommerce | core, catalog |
| logistics | core, ecommerce |
| mlm | core, finance |
| cms | core |
| lms | core, catalog |
| numerology | catalog, ecommerce |
| seo | core |
| support | core |
| social-proof | core |
| tax | core |
| interaction | core |
| sitemap | cms, catalog |
| privacy | None |
| search | None |
| forms | None |
| security | core |
| licensing | core |

---

## Plugin Architecture Standards

### Required Structure

Every plugin **MUST** have:

```
plugin-name/
├── index.js              # Plugin entry point (onInit, onEnable)
├── manifest.json         # Manifest file with metadata and capabilities
├── ui/                   # Frontend assets and components (optional)
```

**Optional directories:**
- `collections/` - Database models (used internally or exported)
- `migrations/` - Database schema changes (coordinated via core)
- `seeds/` - Default data
- `lib/` - Reusable business logic
- `globals/` - Site-wide config
- `blocks/` - Page builder components (used in content capability)

### Plugin Manifest (manifest.json)

**Required fields:**
```json
{
  "slug": "plugin-name",
  "name": "Human Readable Name",
  "version": "1.0.0",
  "main": "index.js",
  "category": "ecommerce|cms|marketing|utility|core|other",
  "capabilities": ["api", "content", "i18n", "hooks"],
  "description": "Brief description",
  "author": "Fromcode"
}
```

**Optional fields:**
```json
{
  "homepage": "https://fromcode.com/plugins/plugin-name",
  "permissions": ["database:read", "database:write", "api:routes"],
  "minSystemVersion": "3.0.0",
  "signature": "RSA_SIGNATURE_HASH",
  "publisherId": "fromcode-official"
}
```

### Migration Naming Convention

**Format:** `YYYYMMDD_HHMMSS_description.ts`

**Examples:**
- `20250129_120000_initial_schema.ts`
- `20250130_093000_add_status_field.ts`
- `20250201_160000_create_reports_table.ts`

**Template:**
```typescript
import { MigrationConfig } from 'payload/database'

export const up: MigrationConfig['up'] = async ({ payload }) => {
  // Migration code
}

export const down: MigrationConfig['down'] = async ({ payload }) => {
  // Rollback code
}
```

### Seed File Standards

**Location:** `plugin-name/seeds/`

**Naming:** `descriptive-name.ts`

**Examples:**
- `currencies.ts` - Currency list
- `payment-methods.ts` - Default payment options
- `example-products.ts` - Demo data

**Template:**
```typescript
import { Payload } from 'payload'

export const seedCurrencies = async (payload: Payload) => {
  const existing = await payload.find({
    collection: 'currencies',
    limit: 1
  })
  
  if (existing.totalDocs > 0) {
    console.log('Currencies already seeded')
    return
  }
  
  await payload.create({
    collection: 'currencies',
    data: { code: 'USD', symbol: '$', rate: 1 }
  })
  
  console.log('✅ Seeded currencies')
}
```

### Library Functions

**Location:** `plugin-name/lib/`

**Purpose:** Reusable business logic shared across hooks, endpoints, and external plugins.

**Examples:**
- `tax-calculator.ts` - Tax computation
- `commission-engine.ts` - MLM calculations
- `pdf-generator.ts` - Report creation

**Best Practices:**
- Pure functions when possible
- Async for database operations
- TypeScript types exported
- Error handling with try/catch
- Logging for debugging

---

## Plugin Development Workflow

### 1. Create Plugin Structure

```bash
cd backend/plugins
mkdir my-plugin
cd my-plugin

# Create required files
touch index.ts plugin.json
mkdir collections migrations seeds lib
```

### 2. Define Manifest (plugin.json)

```json
{
  "slug": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "enabled": true,
  "category": "other",
  "dependencies": {
    "core": "^1.0.0"
  },
  "migrationPriority": 200,
  "description": "My custom plugin",
  "author": "Your Name"
}
```

### 3. Create Plugin Entry Point (index.ts)

```typescript
import { Plugin } from 'payload/config'
import { MyCollection } from './collections/MyCollection'

export const myPlugin = (): Plugin => ({
  name: 'myPlugin',
  collections: [MyCollection],
  globals: [],
  onInit: async (payload) => {
    console.log('✅ My Plugin initialized')
  }
})

export default myPlugin
```

### 4. Add Collections

```typescript
// collections/MyCollection.ts
import { CollectionConfig } from 'payload/types'

export const MyCollection: CollectionConfig = {
  slug: 'my-collection',
  admin: {
    group: 'My Plugin',
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    }
  ]
}
```

### 5. Create Migrations

```bash
# Create timestamped migration
date +"%Y%m%d_%H%M%S_initial_schema.ts" | xargs touch migrations/
```

### 6. Add Seeds

```typescript
// seeds/default-data.ts
export const seedMyData = async (payload: Payload) => {
  await payload.create({
    collection: 'my-collection',
    data: { name: 'Example' }
  })
}
```

### 7. Register Plugin

Plugin auto-discovered by `plugin-loader.ts` on server start. No manual registration needed.

### 8. Test Plugin

```bash
# Start development server
npm run dev

# Check admin UI
# Navigate to http://localhost:3000/admin
# Verify collection appears under "My Plugin" group
```

---

## Future Roadmap

### Phase 10: Plugin System Overhaul (IN PROGRESS)

**Critical Fixes:**
- [x] Fix Currencies export mismatch
- [x] Add environment-based registry URLs
- [ ] **Create all missing plugin.json manifests**
- [ ] **Build Plugin Management UI in Payload admin**

**New Features:**
- [ ] Plugin marketplace browser in admin
- [ ] ZIP file upload with signature verification
- [ ] Automatic dependency resolution
- [ ] Version checking and update notifications
- [ ] Migration coordination system
- [ ] Rollback on failed updates
- [ ] Plugin permissions system
- [ ] Audit logging for all plugin operations
- [ ] Hot reload in development mode

**Timeline:** 2 weeks

### Phase 11: Optional Enhancements (FUTURE)

**Multi-Tenancy Plugin:**
- Single installation serving multiple brands
- Data isolation by tenant
- Per-tenant theming
- Subdomain routing

**Marketplace/Multi-Vendor:**
- Vendor registration and verification
- Commission splitting
- Vendor-specific storefronts
- Payout management

**Advanced Analytics Plugin:**
- Custom dashboards
- Revenue reports
- Customer segmentation
- Cohort analysis

**Workflow Automation Plugin:**
- Visual workflow builder
- Trigger-action system
- Email automation
- Integration webhooks

---

## Summary & Statistics

### Current State

✅ **Production Ready:** 21/23 plugins  
🔄 **In Development:** 2/23 plugins (marketplace, test-feature)  
📊 **Total Collections:** 77+  
🌍 **Total Globals:** 18+  
🔧 **With Migrations:** 23/23 (100%)  
🌱 **With Seeds:** 23/23 (100%)  
📚 **With Documentation:** 3/23 (core, catalog, numerology)

### Plugin Categories Breakdown

| Category | Count | Plugins |
|----------|-------|---------|
| Core & Infrastructure | 3 | core, themes, marketplace |
| E-commerce Suite | 6 | catalog, ecommerce, finance, tax, logistics, mlm |
| Content Management | 2 | cms, seo |
| Learning Management | 1 | lms |
| Marketing & Engagement | 5 | social-proof, interaction, search, forms, sitemap |
| Compliance & Security | 3 | privacy, security, licensing |
| Support | 1 | support |
| Specialized | 2 | numerology, test-feature |

### Code Quality Metrics

- **Type Safety:** 100% TypeScript
- **Code Organization:** Modular plugin structure
- **Database Migrations:** Versioned and tracked
- **Seed Data:** Available for all plugins
- **API Documentation:** In progress
- **Test Coverage:** To be implemented

### Next Priority Actions

1. ✅ Complete Phase 10 critical fixes
2. 📝 Create plugin.json for 16 missing plugins
3. 🎨 Build Plugin Marketplace UI
4. 🔐 Implement signature verification
5. 📋 Add comprehensive plugin documentation
6. 🧪 Create integration tests
7. 📚 Update all plugin READMEs

---

## Document Maintenance

**Last Updated:** January 29, 2026  
**Maintained By:** Fromcode Development Team  
**Review Frequency:** Monthly or on major plugin updates  
**Feedback:** Submit issues or suggestions to the core team

---

*This document is the single source of truth for Fromcode CMS plugin architecture. Keep it updated as plugins evolve.*
