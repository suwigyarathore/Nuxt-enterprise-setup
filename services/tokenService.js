const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

export default async function ($axios, cookies) {
  // Initialization of access token
  if (!cookies.get(ACCESS_TOKEN_KEY)) {
    const anonymousToken = await $axios.get('/users/me/logins/token')
      .then(r => r.headers.authorization)
      .catch(console.error);
    if (anonymousToken) {
      cookies.set(ACCESS_TOKEN_KEY, anonymousToken);
    }
  }
  if (cookies.get(ACCESS_TOKEN_KEY)) {
    $axios.setToken(cookies.get(ACCESS_TOKEN_KEY));
  }

  return {
    getAccessToken() {
      return cookies.get(ACCESS_TOKEN_KEY) || '';
    },
    setAccessToken(token) {
      cookies.set(ACCESS_TOKEN_KEY, token);
      $axios.setToken(token);
    },
    clearAccessToken() {
      cookies.remove(ACCESS_TOKEN_KEY);
      $axios.setToken(false);
    },
    async updateAnonymousToken() {
      $axios.setToken(false); // to not use any token when retrieving anonymous token
      const anonymousToken = await $axios.get('/users/me/logins/token')
        .then(r => r.headers.authorization)
        .catch(console.error);
      if (anonymousToken) {
        cookies.set(ACCESS_TOKEN_KEY, anonymousToken);
      }
      return anonymousToken;
    }
  }
}
