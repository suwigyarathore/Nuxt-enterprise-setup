const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

export default function(axios$, cookies) {
  // Initialization
  const existingAccessToken = cookies.get(ACCESS_TOKEN_KEY);
  if (existingAccessToken) {
    axios$.setToken(existingAccessToken);
  }

  return {
    getAccessToken() {
      return cookies.get(ACCESS_TOKEN_KEY) || '';
    },
    setAccessToken(token) {
      cookies.set(ACCESS_TOKEN_KEY, token);
      axios$.setToken(token);
    },
    clearAccessToken() {
      cookies.remove(ACCESS_TOKEN_KEY);
      axios$.setToken(false);
    }
  }
}
