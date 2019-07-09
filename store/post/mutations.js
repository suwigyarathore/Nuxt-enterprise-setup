export default {
  addPost(state, { text }) {
    state.list = [text, ...state.list];
  },

  addAllPosts(state, list) {
    state.list = [...list];
  }
};
