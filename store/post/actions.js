export default {
  async get({ commit }) {
    const res = await this.app.$postRepository.index();
    commit("addAllPosts", res);
  }
};
