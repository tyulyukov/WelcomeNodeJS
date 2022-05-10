<template>
  <span v-if="songLyricsError">{{songLyricsError}}</span><br/>

  <input v-model="songLyricsQuery"/>
  <button @click="getSongLyricsHits">search</button><br/>

  <div v-if="isSongLyricsLoading" class="spinner-border" role="status"></div>

  <ul>
    <li v-for="song in songLyricsHits" :key="song.index">
      <span>{{song.result.full_title}}</span>
    </li>
  </ul>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from "vue";

export default {
  name: "SongLyrics",
  setup() {
    const store = useStore()

    return {
      songLyricsHits: computed(() => store.getters.getSongLyricsHits),
      isSongLyricsLoading: computed(() => store.getters.getIsSongLyricsLoading),
      songLyricsError: computed(() => store.getters.getSongLyricsError),
      songLyricsQuery: computed({
        get () {
          return store.getters.getSongLyricsQuery
        },
        set (data) {
          store.commit('setSongLyricsQuery', data)
        }
      }),
      getSongLyricsHits: () => { store.dispatch("apiGetSongLyrics") }
    }
  }
}
</script>

<style scoped>

</style>