import Banner from './Banner';

export const slots = {
  'frontend.home.hero': {
    component: Banner,
    priority: 10
  }
};

export const init = () => {
  console.log('[test-feature] Frontend Initialized');
};
