import { createStore } from 'vuex'
import myFirstVariable from "@/store/modules/my-first-variable";

export default createStore({
  strict: true,
  modules: {
    myFirstVariable
  }
})
