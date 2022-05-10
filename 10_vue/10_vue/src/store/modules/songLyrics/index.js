// import ajax from "@/store/ajax"

export default {
  state: {
    songLyricsQuery: '',
    songLyricsError: null,
    songLyricsHits: [],
    isSongLyricsLoading: false,
  },
  getters: {
    getSongLyricsQuery(state) {
      return state.songLyricsQuery
    },
    getSongLyricsError(state) {
      return state.songLyricsError
    },
    getIsSongLyricsLoading(state) {
      return state.isSongLyricsLoading
    },
    getSongLyricsHits(state) {
      return state.songLyricsHits
    }
  },
  mutations: {
    setSongLyricsQuery(state, data) {
      state.songLyricsQuery = data;
    },
    setSongLyricsHits(state, data) {
      state.songLyricsHits = data
    },
    setIsSongLyricsLoading(state, data) {
      if (data == false)
        state.isSongLyricsLoading = false;
      else if (data == true)
        state.isSongLyricsLoading = true;
      else {
        state.isSongLyricsLoading = false;
        state.songLyricsError = 'Error. Loading mutation data is incorrect'
      }
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    apiGetSongLyrics({state, commit, dispatch}) {
      if (state.songLyricsQuery == null || state.songLyricsQuery.match(/^ *$/) !== null) {
        state.songLyricsError = 'Error. Search query is empty'
      }
      else {
        state.songLyricsError = null

        dispatch('toastInfo', 'start')
        commit('setIsSongLyricsLoading', true)

        dispatch('apiGetSongsFromServer')
      }
    },

    // eslint-disable-next-line no-unused-vars
    apiGetSongsFromServer({state, commit, dispatch}) {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
          'X-RapidAPI-Key': '5807e7cbbamsh7a3863ef7020f5dp174a6bjsn0c027f2337f4'
        }
      };

      fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=' +
          state.songLyricsQuery + '&per_page=10&page=1', options)
          .then(response => response.json())
          .then(songs => {
            commit('setSongLyricsHits', songs.response.hits)
            dispatch('toastInfo', 'finish')
            commit('setIsSongLyricsLoading', false)
          })
          .catch(err => console.error(err))
    }
  },
}