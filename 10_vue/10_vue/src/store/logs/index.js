import {useToast} from "vue-toast-notification";
const toast = useToast()

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    log({state, commit, dispatch}, message) {
      console.log(message)
      toast.info(message)
    },
    // eslint-disable-next-line no-unused-vars
    logWarning({state, commit, dispatch}, message) {
      console.warn(message)
      toast.warning(message)
    },
    // eslint-disable-next-line no-unused-vars
    logError({state, commit, dispatch}, error) {
      console.error(error)
      toast.error(error)
    }
  },
}
