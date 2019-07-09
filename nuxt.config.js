export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/i18n.js",
    "~/plugins/repository.js",
    "~/plugins/tokenService.js",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    '@nuxtjs/auth',
    ['cookie-universal-nuxt', { alias: 'cookies' }],
  ],
  styleResources: {
    scss: ["./assets/scss/globals.scss"]
  },
  router: {
    // customize nuxt.js router (vue-router).
    middleware: 'i18n' // middleware all pages of the application
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  generate: {
    routes: ["/", "/fr"]
  },
  axios: {
    baseURL: "http://jsonplaceholder.typicode.com"
  },
  auth: {
    plugins: [ '~/plugins/auth.js' ],
    strategies: {
      local: {
        endpoints: {
          logout: {
            url: '/users/me/logins/signout',
            method: 'put',
            responseTransform: function(data) {
              console.log(data);
              return data
            },
            tokenType: false
          },
          user: {
            url: '/users/me',
            method: 'get',
            propertyName: false,
            tokenType: false
          },
        },
        tokenRequired: true,
        tokenType: false
      },
      facebook: {
        // TODO: Use real one
        client_id: 'INSERT_YOUR_VALUE',
        userinfo_endpoint: false,
        scope: ['public_profile', 'email'],
        // Client url
        redirect_uri: 'http://localhost:3000/'
      },
      google: {
        // TODO: Use real one
        client_id: 'INSERT_YOUR_VALUE',
        user: false,
        // Client url
        redirect_uri: 'http://localhost:3000/'
      },
      twitter: {
        // TODO: Use real one
        client_id: 'INSERT_YOUR_VALUE',
        user: false,
        // client url
        redirect_uri: 'http://localhost:3000/'
      },
    },
    redirect: false
  },
};
