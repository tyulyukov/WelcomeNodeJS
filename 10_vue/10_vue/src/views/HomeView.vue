<template>
  <div class="home">
    <SongLyrics/>
<!--    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
/*import HelloWorld from '@/components/HelloWorld.vue'*/
import SongLyrics from "@/components/axios/SongLyrics";

export default {
  name: 'HomeView',
  components: {
    SongLyrics,
    /*HelloWorld*/
  }
}
</script>
