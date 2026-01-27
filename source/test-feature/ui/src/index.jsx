import React from 'react';
import { MarketingDashboard } from './components/MarketingDashboard';
import { SecurityDashboard } from './components/SecurityDashboard';
import { GoogleAds } from './components/GoogleAds';
import { SocialCampaigns } from './components/SocialCampaigns';
import { Analytics } from './components/Analytics';
import { TestWidget } from './components/TestWidget';
import { PromoBanner } from './components/PromoBanner';

// Register the components to slots
if (window.Fromcode) {
  // Content for the plugin's internal management page
  window.Fromcode.registerSlotComponent('admin.plugin.test-feature.content', {
    component: MarketingDashboard,
    priority: 1,
    pluginSlug: 'test-feature'
  });

  // Specifically for the Marketing path
  window.Fromcode.registerSlotComponent('admin.plugin.test-feature.page.marketing.ads', {
    component: MarketingDashboard,
    priority: 1,
    pluginSlug: 'test-feature'
  });

  window.Fromcode.registerSlotComponent('admin.plugin.test-feature.page.marketing.google', {
    component: GoogleAds,
    priority: 1,
    pluginSlug: 'test-feature'
  });

  window.Fromcode.registerSlotComponent('admin.plugin.test-feature.page.marketing.campaigns', {
    component: SocialCampaigns,
    priority: 1,
    pluginSlug: 'test-feature'
  });

  // Specifically for the Audit path
  window.Fromcode.registerSlotComponent('admin.plugin.test-feature.page.security.audit', {
    component: SecurityDashboard,
    priority: 1,
    pluginSlug: 'test-feature'
  });

  window.Fromcode.registerSlotComponent('admin.plugin.test-feature.page.other.analytics', {
    component: Analytics,
    priority: 1,
    pluginSlug: 'test-feature'
  });

  // Frontend Slots
  window.Fromcode.registerSlotComponent('frontend.home.hero', {
    component: PromoBanner,
    priority: 5,
    pluginSlug: 'test-feature'
  });

  window.Fromcode.registerSlotComponent('frontend.home.hero', {
    component: TestWidget,
    priority: 10,
    pluginSlug: 'test-feature'
  });
  
  console.log('[test-feature] JSX Bundle initialized successfully.');
}
