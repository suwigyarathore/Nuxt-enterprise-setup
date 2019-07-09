export default async function ({ app }) {
  if (!app.$auth.loggedIn) {
    return;
  }
  const auth = app.$auth;
  const authStrategy = auth.strategy.name;
  if (authStrategy === 'facebook' || authStrategy === 'google') {
    const token = auth.getToken(authStrategy).replace(/^Bearer /, '');
    const url = `/users/signin/${authStrategy}`;

    const response = await app.$axios.post(url, {
      accessToken: token
    }, {
      headers: {
        Authorization: anonymousToken
      },
    }).catch(console.error);

    if (response) {
      const user = response.data;
      const accessToken = response.headers.authorization;
      auth.setToken('local', accessToken);
      // TODO(max): Set refresh token
      await auth.setStrategy('local');
      await auth.setUser(user);
    }
  }
}