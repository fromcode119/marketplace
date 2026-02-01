export const PREDEFINED_TEMPLATES = [
  {
    id: 'tpl-bento-grid',
    name: 'Modern Bento Grid',
    category: 'layout',
    block: {
      type: 'grid-block',
      layout: 'bento',
      data: {
        title: 'Our Core Features',
        subtitle: 'Everything you need to scale',
        items: [
          { title: 'Performance', description: 'Lightning fast load times out of the box.', icon: 'Zap' },
          { title: 'Security', description: 'Enterprise grade protection for your data.', icon: 'Shield' },
          { title: 'Scalability', description: 'Grow from 1 to 1M users without friction.', icon: 'TrendingUp' },
          { title: 'Cloud Native', description: 'Deploys anywhere, runs everywhere.', icon: 'Cloud' }
        ]
      }
    }
  },
  {
    id: 'tpl-hero-split',
    name: 'Hero Split Screen',
    category: 'hero',
    block: {
      type: 'hero',
      layout: 'split',
      data: {
        title: 'Design the future of the web',
        subtitle: 'The only framework built for high-performance marketing sites.',
        primaryCTA: 'Get Started',
        secondaryCTA: 'Learn More'
      }
    }
  },
  {
    id: 'tpl-stats-cards',
    name: 'Impact Stats',
    category: 'content',
    block: {
      type: 'stats',
      layout: 'cards',
      data: {
        items: [
          { value: '99.9%', label: 'Uptime Guarantee', icon: 'Server' },
          { value: '250M+', label: 'Requests/Day', icon: 'Activity' },
          { value: '15k', label: 'Happy Clients', icon: 'Users' }
        ]
      }
    }
  }
];
