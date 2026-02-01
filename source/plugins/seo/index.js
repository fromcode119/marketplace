"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const onInit = async (context) => {
  console.log('SEO Plugin Initialized');

  // Extend CMS collections using hooks
  context.hooks.on('collection:register', (collection) => {
    if (collection.shortSlug === 'pages' || collection.shortSlug === 'posts') {
      console.log(`[SEO] Extending collection: ${collection.shortSlug}`);
      
      collection.fields.push({
        name: 'seo',
        type: 'json',
        label: 'SEO Metadata',
        admin: {
          group: 'SEO',
          position: 'sidebar'
        },
        fields: [
          { name: 'title', type: 'text', label: 'Meta Title' },
          { name: 'description', type: 'textarea', label: 'Meta Description' },
          { name: 'keywords', type: 'text', label: 'Keywords' },
          { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG Image' }
        ]
      });
    }
  });
};

exports.onInit = onInit;

const plugin = {
  onInit: exports.onInit
};

exports.default = plugin;
