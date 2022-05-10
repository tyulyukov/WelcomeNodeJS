import { createStore } from 'vuex'
import myFirstVariable from "@/store/modules/my-first-variable";
import toasts from "@/store/toasts";

export default createStore({
  strict: true,
  modules: {
    myFirstVariable,
    toasts
  }
})
