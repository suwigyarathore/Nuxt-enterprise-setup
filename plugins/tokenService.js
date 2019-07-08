import createTokenService from "@/services/tokenService";

export default (ctx, inject) => {
  inject("tokenService", createTokenService(ctx.$axios, ctx.app.$cookies));
};
