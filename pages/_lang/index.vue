<template>
  <div class="container">
    <div>
      <h1 class="title">{{ $t('home.title') }}</h1>
    </div>
    <Post v-for="post in posts" :key="post.id" :title="post.title" :id="post.id"/>
  </div>
</template>
<script>
import Post from "../../components/Post";
export default {
  components: {
    Post
  },
  head() {
    return {
      title: "About the App",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Best place for corny dad jokes"
        }
      ]
    };
  },

  async asyncData({ app }) {
    return {
      posts: await app.$postRepository.index()
    };
  }
};
</script>
