import createTokenService from "@/services/tokenService";

export default async (ctx, inject) => {
  inject("tokenService", await createTokenService(ctx.$axios, ctx.app.$cookies));
};
