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
import { mapGetters, mapMutations } from "vuex";
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

  // Use like this when you need data directly in component not in store
  // async asyncData({ app }) {
  //   return {
  //     posts: await app.$postRepository.index()
  //   };
  // }

  async fetch({ store }) {
    await store.dispatch("post/get");
  },

  computed: mapGetters({
    posts: "post/list"
  }),

  methods: {
    ...mapMutations({
      addPost: "post/addPost"
    })
  }
};
</script>
