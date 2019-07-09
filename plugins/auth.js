export default async function ({ app }) {
  if (!app.$auth.loggedIn) {
    return;
  }
  const auth = app.$auth;
  const authStrategy = auth.strategy.name;

  if (authStrategy === 'facebook' || authStrategy === 'google') {
    const token = auth.getToken(authStrategy).replace(/^Bearer /, '');
    const url = `/users/me/logins/signin/${authStrategy}`;

    let anonymousToken = app.$tokenService.getAccessToken();

    let response = await app.$axios.post(url, {
      accessToken: token
    }, {
        headers: {
          Authorization: anonymousToken
        }
      }).catch(async err => {
        if (err.response.data.type === 'SessionNotFound') {
          const updatedAnonymousToken = await app.$tokenService.updateAnonymousToken();
          if (!updatedAnonymousToken) {
            console.error(err);
            return;
          }
          return await app.$axios.post(url, {
            accessToken: token
          }, {
            headers: {
              Authorization: updatedAnonymousToken
            }
          }).catch(console.error);
        }
      });

    if (response) {
      const user = response.data;
      const accessToken = response.headers.authorization;
      await auth.setToken('local', accessToken);
      await auth.setStrategy('local');
      await auth.setUser(user);
    }
  }
}