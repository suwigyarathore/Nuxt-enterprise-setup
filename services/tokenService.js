const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

function normalize(token) {
  return token || '';
}

export default function(axios$, cookies) {
  // Initialization
  axios$.setToken(normalize(cookies.get(ACCESS_TOKEN_KEY)));

  return {
    getAccessToken() {
      return normalize(cookies.get(ACCESS_TOKEN_KEY));
    },
    setAccessToken(token) {
      const normalizedToken = normalize(token);
      cookies.set(ACCESS_TOKEN_KEY, normalizedToken);
      axios$.setToken(normalizedToken);
    },
    clearAccessToken() {
      this.setAccessToken('');
    }
  }
}
