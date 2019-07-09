<template>
  <div class="container">
    <div>
      <h1 class="title">{{ $t('home.title') }}</h1>
    </div>
    <div>
      <h1 v-if="$auth.user">{{ $auth.user.fullName }}</h1>
      <h1 v-else>Guest</h1>
    </div>
    <div v-if="!$auth.loggedIn" class="signin-container">
      <hr>
      <h1 class="mb-4">Sign In</h1>
      <button v-on:click="signInViaGoogle" class="btn btn-primary btn-sm" disabled>via Google</button>
      <button v-on:click="signInViaFacebook" class="btn btn-primary btn-sm">via Facebook</button>
      <button v-on:click="signInViaTwitter" class="btn btn-primary btn-sm" disabled>via Twitter</button>
    </div>
    <div v-else class="signin-container">
      <hr>
      <h1>Sign Out</h1>
      <button v-on:click="signOut" class="btn btn-danger btn-sm">Sign Out</button>
    </div>
    <div>
      <hr>
      <button v-on:click="getSecureData" class="btn btn-primary btn-sm">Get Secure Data</button>
    </div>
    <!-- <Post v-for="post in posts" :key="post.id" :title="post.title" :id="post.id"/> -->
  </div>
</template>
<script>
import Post from "../../components/Post";
import { setInterval } from 'timers';
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
  methods: {
    async signInViaFacebook() {
      await this.$auth.loginWith('facebook').catch(console.error);
    },
    async signInViaGoogle() {
      return this.$auth.loginWith('google').catch(console.error);
    },
    async signInViaTwitter() {
      await this.$auth.loginWith('twitter').catch(console.error);
    },
    async signOut() {
      await this.$auth.logout();
    },
    async getSecureData() {
      await this.$axios.$get('/users/secure').catch(console.error);
    }
  }
  // async asyncData({ app }) {
  //   return {
  //     posts: await app.$postRepository.index()
  //   };
  // }
};
</script>
