const AUTHORIZATION_TOKEN_KEY = 'AUTHORIZATION_TOKEN';

function getAuthorizationToken() {
  if (process.client) {
    return localStorage.getItem(AUTHORIZATION_TOKEN_KEY) || '';
  }
  return '';
}

function setAuthorizationToken(token) {
  // NOTE: We can set 'Authorization' header here via following expression:
  // axios$.defaults.headers.common['Authorization'] = `${authorization_token}`
  if (process.client) {
    localStorage.setItem(AUTHORIZATION_TOKEN_KEY, token);
  }
}

export default {
  getAuthorizationToken,
  setAuthorizationToken
}