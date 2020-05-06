export const environment = {
  production: true,
  api: {
    baseUrl: 'https://taipla.com/api'
  },
  auth: {
    redirects: {
      intent: '/backoffice',
      login: '/login',
      logout: '/logout'
    }
  },
  localStorage: {
    root: 'taipla'
  },
  copyright: {
    text: '© 2020 TAIPLA.com All Rights Reserved | Design by Dev.awesome.th',
    author: 'Dev.awesome.th'
  }
};
