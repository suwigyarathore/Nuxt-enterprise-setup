import tokenService from '@/services/tokenService'; 

const AuthorizationHeader = 'Authorization';

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.headers.common[AuthorizationHeader] = tokenService.getAuthorizationToken();
  });
}
