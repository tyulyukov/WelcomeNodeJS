import { createStore } from 'vuex'
import myFirstVariable from "@/store/modules/my-first-variable";
import toasts from "@/store/toasts";
import logs from "@/store/logs";
import ajax from "@/store/ajax";
import songLyrics from "@/store/modules/songLyrics";

export default createStore({
  strict: true,
  modules: {
    myFirstVariable,
    toasts,
    logs,
    ajax,
    songLyrics
  }
})
